<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index(Request $request)
    {
        $warehouses = Warehouse::where('company_id', $request->user()->getActiveCompanyId())
            ->orderBy('is_default', 'desc')
            ->get();
        return response()->json(['success' => true, 'data' => $warehouses]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $warehouse = Warehouse::create([
            'name' => $request->name,
            'address' => $request->address,
            'country' => $request->country,
            'state' => $request->state,
            'city' => $request->city,
            'zip_code' => $request->zip_code,
            'is_default' => $request->is_default ?? false,
            'company_id' => $request->user()->getActiveCompanyId(),
            'created_by_id' => $request->user()->id,
        ]);

        if ($warehouse->is_default) {
            // Set others to not default
            Warehouse::where('company_id', $request->user()->getActiveCompanyId())
                ->where('id', '!=', $warehouse->id)
                ->update(['is_default' => false]);
        }

        return response()->json(['success' => true, 'data' => $warehouse], 201);
    }

    public function update(Request $request, $id)
    {
        $warehouse = Warehouse::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);

        $warehouse->update($request->all());

        if ($warehouse->is_default) {
            Warehouse::where('company_id', $request->user()->getActiveCompanyId())
                ->where('id', '!=', $warehouse->id)
                ->update(['is_default' => false]);
        }

        return response()->json(['success' => true, 'data' => $warehouse]);
    }

    public function destroy(Request $request, $id)
    {
        $warehouse = Warehouse::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);
        $warehouse->delete();
        return response()->json(['success' => true, 'message' => 'Warehouse deleted']);
    }
}
