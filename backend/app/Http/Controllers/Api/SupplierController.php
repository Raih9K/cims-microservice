<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $suppliers = Supplier::where('company_id', $request->user()->getActiveCompanyId())->get();
        return response()->json(['success' => true, 'data' => $suppliers]);
    }

    public function store(Request $request)
    {
        $request->validate([
             'supplier_name' => 'required|string|max:255',
             'supplier_code' => 'required|string|unique:suppliers,supplier_code',
        ]);

        $supplier = Supplier::create([
            'supplier_name' => $request->supplier_name,
            'supplier_code' => $request->supplier_code,
            'contact_person_name' => $request->contact_person_name,
            'email_address' => $request->email_address,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'country' => $request->country,
            'state' => $request->state,
            'city' => $request->city,
            'zip_code' => $request->zip_code,
            'company_id' => $request->user()->getActiveCompanyId(),
            'created_by_id' => $request->user()->id,
        ]);

        return response()->json(['success' => true, 'data' => $supplier], 201);
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);
        $supplier->update($request->all());
        return response()->json(['success' => true, 'data' => $supplier]);
    }

    public function destroy(Request $request, $id)
    {
        $supplier = Supplier::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);
        $supplier->delete();
        return response()->json(['success' => true, 'message' => 'Supplier deleted']);
    }
}
