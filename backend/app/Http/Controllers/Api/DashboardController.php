<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        if (!$companyId) {
            return response()->json([
                'status' => 'success',
                'data' => [
                    'total_products' => 0,
                    'total_variants' => 0,
                    'active_products' => 0,
                    'low_stock_products' => 0,
                    'total_stock_value' => 0
                ]
            ]);
        }

        $totalProducts = \App\Models\Product::where('company_id', $companyId)->count();
        $totalVariants = \App\Models\ProductVariant::whereHas('product', function($q) use ($companyId) {
            $q->where('company_id', $companyId);
        })->count();

        $activeProducts = \App\Models\Product::where('company_id', $companyId)
            ->where('status', 'active')->count();

        $lowStockProducts = \App\Models\Product::where('company_id', $companyId)
            ->where('track_inventory', true)
            ->whereColumn('initial_quantity', '<=', 'reorder_level')
            ->count();

        // Calculate total stock value
        $stockValue = \App\Models\Product::where('company_id', $companyId)
            ->sum(\Illuminate\Support\Facades\DB::raw('initial_quantity * cost_price'));

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_products' => $totalProducts,
                'total_variants' => $totalVariants,
                'active_products' => $activeProducts,
                'low_stock_products' => $lowStockProducts,
                'total_stock_value' => (float)$stockValue
            ]
        ]);
    }
}
