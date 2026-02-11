<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Role;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'password' => bcrypt(str()->random(16)),
                ]
            );

            // Assign Default Role
            $role = Role::firstOrCreate(['name' => 'user']);
            $user->assignRole($role);

            // Ensure user has a company
            $companyId = $user->getActiveCompanyId();
            if (!$companyId) {
                \Illuminate\Support\Facades\DB::transaction(function () use ($user) {
                    $company = \App\Models\Company::create([
                        'name' => $user->name . "'s Workspace",
                        'business_type' => 'Retail',
                        'management_type' => 'single',
                        'subscription_status' => 'trial',
                    ]);

                    $user->update(['company_id' => $company->id]);
                    $user->companies()->syncWithoutDetaching([
                        $company->id => [
                            'role' => 'Business Admin',
                            'status' => 'active',
                            'is_locked' => false
                        ]
                    ]);
                });
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirect to frontend with token
            return redirect('http://localhost:3000/auth/callback?token=' . $token);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}

