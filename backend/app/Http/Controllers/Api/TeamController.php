<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use App\Models\Invitation;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();
        \Illuminate\Support\Facades\Log::info('Team Fetch - User:', ['id' => $user->id, 'active_company' => $companyId]);

        if (!$companyId) {
            return response()->json([
                'success' => true,
                'data' => []
            ]);
        }

        // 1. Get Actual Team Members
        $team = User::whereHas('companies', function($query) use ($companyId) {
            $query->where('companies.id', $companyId);
        })
        ->with(['companies' => function($q) use ($companyId) {
            $q->where('companies.id', $companyId);
        }])
        ->latest()
        ->get();

        \Illuminate\Support\Facades\Log::info('Team Found Count: ' . $team->count());

        // 2. Get Pending Invitations for this company
        $invitations = Invitation::where('company_id', $companyId)
            ->where('status', 'pending')
            ->where('expires_at', '>', now())
            ->get();

        // 3. Transform Invitations to look like User objects for frontend compatibility
        $pendingMembers = $invitations->map(function($inv) {
            return [
                'id' => 'pending_' . $inv->id,
                'name' => 'Invitation Sent',
                'email' => $inv->email,
                'is_pending' => true,
                'companies' => [
                    [
                        'pivot' => [
                            'role' => $inv->role,
                            'status' => 'pending',
                            'is_locked' => false
                        ]
                    ]
                ]
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $team->concat($pendingMembers)
        ]);
    }

    public function store(Request $request)
    {
        $currentUser = $request->user();
        $companyId = $currentUser->getActiveCompanyId();
        $company = Company::find($companyId);

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is not associated with any business.'
            ], 403);
        }

        $companyId = $company->id;

        // 1. License Check: Count active users in this company
        $activeSeats = $company->users()->wherePivot('status', 'active')->count();
        if ($activeSeats >= $company->max_seats) {
            return response()->json([
                'success' => false,
                'message' => "License limit reached ({$company->max_seats} seats). Please deactivate a member or upgrade your plan."
            ], 422);
        }

        $validated = $request->validate([
            'email' => 'required|email',
            'role' => ['required', Rule::in(['Team Manager', 'Team Member', 'Viewer'])],
        ]);

        $email = $validated['email'];
        $role = $validated['role'];

        // Check if already in the company
        $existingUser = User::where('email', $email)->first();
        if ($existingUser && $existingUser->companies()->where('company_id', $companyId)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'User is already a member of this team.'
            ], 422);
        }

        // Create Invitation Token
        $token = Str::random(40);
        $expiresAt = now()->addDays(7);

        $invitation = Invitation::create([
            'email' => $email,
            'company_id' => $companyId,
            'role' => $role,
            'token' => $token,
            'invited_by' => $currentUser->id,
            'expires_at' => $expiresAt,
            'status' => 'pending'
        ]);

        $inviteLink = config('app.frontend_url', 'http://localhost:3000') . "/join?token=" . $token;

        return response()->json([
            'success' => true,
            'message' => 'Invitation sent successfully.',
            'invite_link' => $inviteLink,
            'data' => $invitation
        ], 201);
    }

    /**
     * Verify Invitation Token and Check User Existence
     */
    public function verifyInvitation(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
        ]);

        $invitation = Invitation::where('token', $validated['token'])
            ->where('status', 'pending')
            ->where('expires_at', '>', now())
            ->first();

        if (!$invitation) {
            return response()->json([
                'success' => false,
                'message' => 'Invitation link is invalid or has expired.'
            ], 404);
        }

        $userExists = User::where('email', $invitation->email)->exists();

        return response()->json([
            'success' => true,
            'email' => $invitation->email,
            'user_exists' => $userExists,
            'company_name' => $invitation->company?->name
        ]);
    }

    /**
     * Accept Invitation (Public Endpoint)
     */
    public function acceptInvitation(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'password' => 'nullable|string|min:8|required_without:user_exists',
            'name' => 'nullable|string|max:255',
        ]);

        $invitation = Invitation::where('token', $validated['token'])
            ->where('status', 'pending')
            ->where('expires_at', '>', now())
            ->firstOrFail();

        $company = $invitation->company;
        $activeSeats = $company->users()->wherePivot('status', 'active')->count();

        if ($activeSeats >= $company->max_seats) {
             return response()->json(['message' => 'This company has reached its license seat limit.'], 422);
        }

        $user = User::where('email', $invitation->email)->first();

        DB::transaction(function () use ($invitation, $user, $validated, $company) {
            if (!$user) {
                $user = User::create([
                    'name' => $validated['name'] ?? explode('@', $invitation->email)[0],
                    'email' => $invitation->email,
                    'password' => Hash::make($validated['password']),
                    'company_id' => $invitation->company_id,
                    'status' => 'active',
                ]);
            }

            $user->companies()->syncWithoutDetaching([
                $invitation->company_id => [
                    'role' => $invitation->role,
                    'status' => 'active',
                    'is_locked' => false
                ]
            ]);

            $invitation->update(['status' => 'accepted']);
        });

        return response()->json([
            'success' => true,
            'message' => 'Invitation accepted. You are now part of the team.'
        ]);
    }

    /**
     * Update team member details/role
     */
    public function update(Request $request, $id)
    {
        $currentUser = $request->user();
        $companyId = $currentUser->company_id ?? $currentUser->companies()->first()?->id;

        if (!$companyId) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is not associated with any business.'
            ], 403);
        }

        $user = User::whereHas('companies', function($query) use ($companyId) {
            $query->where('companies.id', $companyId);
        })->findOrFail($id);

        $pivot = $user->companies()->where('companies.id', $companyId)->first()->pivot;

        // If user is permanently locked in this company, prevent any changes (especially enabling)
        if ($pivot->is_locked) {
            return response()->json([
                'success' => false,
                'message' => 'This member is permanently locked and cannot be re-enabled or modified.'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'role' => ['nullable', Rule::in(['Team Manager', 'Team Member', 'Viewer'])],
            'status' => 'nullable|in:active,inactive',
        ]);

        if (isset($validated['name'])) {
            $user->update(['name' => $validated['name']]);
        }

        $pivotData = [];
        if (isset($validated['role'])) {
            $pivotData['role'] = $validated['role'];
            // Also sync Spatie roles if needed
            $user->syncRoles([$validated['role']]);
        }

        if (isset($validated['status']) && $validated['status'] === 'active') {
            // Check License before re-enabling
            $company = \App\Models\Company::find($companyId);
            $activeSeats = $company->users()->wherePivot('status', 'active')->count();
            if ($activeSeats >= $company->max_seats) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot enable. Seat limit reached. Please disable another member first.'
                ], 422);
            }
            $pivotData['status'] = 'active';
        } elseif (isset($validated['status']) && $validated['status'] === 'inactive') {
            $pivotData['status'] = 'inactive';
        }

        if (!empty($pivotData)) {
            $user->companies()->updateExistingPivot($companyId, $pivotData);
        }

        return response()->json([
            'success' => true,
            'message' => 'Team member updated successfully',
            'data' => $user->load(['companies' => function($q) use ($companyId) {
                $q->where('companies.id', $companyId);
            }])
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $currentUser = $request->user();
        $companyId = $currentUser->getActiveCompanyId();

        if (!$companyId) {
            return response()->json(['message' => 'Unassociated account'], 403);
        }

        if ($currentUser->id == $id) {
            return response()->json(['message' => 'You cannot disable yourself.'], 403);
        }

        // Handle if ID is a pending invitation
        if (str_starts_with($id, 'pending_')) {
            $invId = str_replace('pending_', '', $id);
            Invitation::where('id', $invId)->where('company_id', $companyId)->delete();
            return response()->json(['success' => true, 'message' => 'Invitation cancelled.']);
        }

        $user = User::whereHas('companies', function($query) use ($companyId) {
            $query->where('companies.id', $companyId);
        })->findOrFail($id);

        // Security check: cannot remove someone with same role
        $currentUserPivot = $currentUser->companies()->where('companies.id', $companyId)->first()?->pivot;
        $targetUserPivot = $user->companies()->where('companies.id', $companyId)->first()?->pivot;

        if ($currentUserPivot && $targetUserPivot && $currentUserPivot->role === $targetUserPivot->role) {
             return response()->json(['success' => false, 'message' => 'Security Error: You cannot remove or modify another member with the same administrative role as you.'], 403);
        }

        // Logic: Deactivate AND permanently Lock this seat connection
        $user->companies()->updateExistingPivot($companyId, [
            'status' => 'inactive',
            'is_locked' => true // Permanent Lock
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Team member has been permanently disabled and license seat is now available for replacement.'
        ]);
    }

    /**
     * Admin: Force Email Change for a team member
     */
    public function forceEmailChange(Request $request, $id)
    {
        $request->validate(['email' => 'required|email|unique:users,email']);

        $user = User::whereHas('companies', function($q) use ($request) {
            $q->where('companies.id', $request->user()->company_id);
        })->findOrFail($id);

        $user->update(['email' => $request->email]);

        return response()->json([
            'success' => true,
            'message' => "Email for {$user->name} has been changed to {$request->email}."
        ]);
    }

    /**
     * Admin: Force Password Reset (Forget Request)
     */
    public function forcePasswordReset(Request $request, $id)
    {
        $user = User::whereHas('companies', function($q) use ($request) {
            $q->where('companies.id', $request->user()->company_id);
        })->findOrFail($id);

        // Generate a random temporary password or trigger reset mail
        $tempPass = Str::random(10);
        $user->update(['password' => Hash::make($tempPass)]);

        return response()->json([
            'success' => true,
            'message' => "Password for {$user->name} has been reset.",
            'temp_password' => $tempPass // In production, send this via email
        ]);
    }

    /**
     * Switch Active Company
     */
    public function switchCompany(Request $request)
    {
        $validated = $request->validate(['company_id' => 'required|exists:companies,id']);
        $user = $request->user();

        if (!$user->companies()->where('company_id', $validated['company_id'])->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user->update(['company_id' => $validated['company_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Switched business',
            'user' => $user->load('company')
        ]);
    }
}
