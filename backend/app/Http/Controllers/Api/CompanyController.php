<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Get the active company details.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        if (!$companyId) {
            return response()->json([
                'success' => false,
                'message' => 'No active business found'
            ], 404);
        }

        $company = Company::with('package')->find($companyId);

        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    /**
     * Update the active company details.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        if (!$companyId) {
            return response()->json([
                'success' => false,
                'message' => 'No active business found'
            ], 404);
        }

        $company = Company::findOrFail($companyId);
        $oldValues = $company->toArray();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'business_type' => 'nullable|string|max:255',
            'management_type' => 'nullable|in:single,team',
            'settings' => 'nullable|array',
        ]);

        $company->update($validated);

        // Audit log
        AuditLog::logUpdate('company', (string)$company->id, $oldValues, $company->toArray());

        return response()->json([
            'success' => true,
            'message' => 'Business profile updated successfully',
            'data' => $company
        ]);
    }
}
