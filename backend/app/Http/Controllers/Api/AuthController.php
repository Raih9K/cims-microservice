<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Signup Request:', $request->all());

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'company_name' => 'required|string|max:255',
            'business_type' => 'required|string',
            'management_type' => 'required|in:single,team',
        ]);

        $otp = 123456;

        try {
            $user = \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $otp) {
                // ... logic same as before ...
                $company = \App\Models\Company::create([
                    'name' => $validated['company_name'],
                    'business_type' => $validated['business_type'],
                    'management_type' => $validated['management_type'],
                    'subscription_status' => 'pending',
                ]);

                $user = User::create([
                    'name' => $validated['full_name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'company_id' => $company->id,
                    'status' => 'inactive',
                    'otp_code' => $otp,
                    'otp_expires_at' => now()->addMinutes(10),
                ]);

                $user->assignRole('Business Admin');

                $user->companies()->syncWithoutDetaching([
                    $company->id => [
                        'role' => 'Business Admin',
                        'status' => 'active',
                        'is_locked' => false
                    ]
                ]);

                return $user;
            });
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Signup failed: ' . $e->getMessage());
            \Illuminate\Support\Facades\Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Signup failed: ' . $e->getMessage()], 500);
        }

        // In production: Mail::to($user->email)->send(new OtpMail($otp));

        return response()->json([
            'message' => 'Signup successful. Please verify your email.',
            'email' => $user->email,
            // 'debug_otp' => $otp // REMOVE IN PRODUCTION
        ], 201);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
             throw ValidationException::withMessages(['otp' => 'User not found.']);
        }

        // Force Verify logic for testing
        if ($request->otp === '213456' || $request->otp === "123456") {
            // Bypass checking stored OTP and Expiration
        } else {
             if ($user->otp_code !== $request->otp) {
                throw ValidationException::withMessages(['otp' => 'Invalid OTP.']);
            }

            if (now()->greaterThan($user->otp_expires_at)) {
                 throw ValidationException::withMessages(['otp' => 'OTP expired.']);
            }
        }

        $user->update([
            'status' => 'active',
            'otp_code' => null,
            'otp_expires_at' => null,
            'email_verified_at' => now(),
        ]);

        // Don't issue token yet? Or issue restricted token?
        // Let's issue token so they can proceed to package selection
        $token = $user->createToken('auth_token')->plainTextToken;

        $user->load('company.package', 'roles.permissions', 'permissions');

        return response()->json([
            'message' => 'Email verified.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function resendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
             throw ValidationException::withMessages(['email' => 'User not found.']);
        }

        $otp = 123456; // Static for testing

        $user->update([
            'otp_code' => $otp,
            'otp_expires_at' => now()->addMinutes(10)
        ]);

        // Mail::to($user->email)->send(new OtpMail($otp));

        return response()->json(['message' => 'OTP sent successfully.']);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->status !== 'active') {
            throw ValidationException::withMessages([
                'email' => ['Your account is inactive.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $user->load('company.package', 'companies', 'roles.permissions', 'permissions');

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('company.package', 'companies', 'roles.permissions', 'permissions');
        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user->load('company.package', 'companies', 'roles.permissions', 'permissions')
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match your current password.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully'
        ]);
    }
}
