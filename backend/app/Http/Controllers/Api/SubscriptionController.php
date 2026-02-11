<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SubscriptionController extends Controller
{
    /**
     * Get all available packages.
     */
    public function packages()
    {
        $packages = Package::all()->map(function($pkg) {
            $pkg->features = json_decode($pkg->features);
            return $pkg;
        });
        return response()->json($packages);
    }

    /**
     * Apply a coupon code.
     */
    public function applyCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $coupon = Coupon::where('code', $request->code)->first();

        if (!$coupon) {
            throw ValidationException::withMessages(['code' => 'Invalid coupon code.']);
        }

        if ($coupon->valid_until && now()->greaterThan($coupon->valid_until)) {
            throw ValidationException::withMessages(['code' => 'Coupon has expired.']);
        }

        return response()->json([
            'message' => 'Coupon applied successfully!',
            'discount_percent' => $coupon->discount_percent,
        ]);
    }

    /**
     * Subscribe to a package.
     */
    public function subscribe(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
            'coupon_code' => 'nullable|string',
        ]);

        $user = $request->user();
        $company = $user->company;

        if (!$company) {
            return response()->json(['message' => 'Company not found.'], 404);
        }

        $package = Package::find($request->package_id);

        // Here we would normally implement payment logic (PayPal, etc.)
        // For now, we just update the company's package directly.

        $company->update([
            'package_id' => $package->id,
            'subscription_status' => 'active',
            'trial_ends_at' => now()->addDays(30), // Example: 30 day trial or active from now
        ]);

        return response()->json([
            'message' => 'Subscription successful!',
            'company' => $company->load('package'),
        ]);
    }
}
