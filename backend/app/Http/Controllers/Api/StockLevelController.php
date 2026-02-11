<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StockLevel;
use Illuminate\Http\Request;

class StockLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return response()->json([
            'success' => true,
            'data' => StockLevel::with(['warehouse', 'product'])->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'product_id' => 'required', // uuid
            'warehouse_id' => 'required', // uuid
            'available_quantity' => 'required|integer',
            'minimum_level' => 'integer',
        ]);

        // Check if level exists
        $level = StockLevel::where('product_id', $validated['product_id'])
                           ->where('warehouse_id', $validated['warehouse_id'])
                           ->first();

        if ($level) {
            $level->update([
                'available_quantity' => $level->available_quantity + $validated['available_quantity'],
                 // Optionally update minimum level if provided
            ]);
        } else {
            $level = StockLevel::create($validated);
        }

        return response()->json([
            'success' => true,
            'data' => $level
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
         return response()->json(['success' => true, 'data' => StockLevel::findOrFail($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $level = StockLevel::findOrFail($id);
         $level->update($request->all());
         return response()->json(['success' => true, 'data' => $level]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        StockLevel::destroy($id);
        return response()->json(['success' => true, 'message' => 'Stock level record deleted']);
    }
}
