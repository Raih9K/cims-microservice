<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Brand::where('company_id', request()->user()->getActiveCompanyId())->where('is_active', true)->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_name' => 'required|string|max:200',
            'brand_code' => 'nullable|string|max:50|unique:brands,brand_code',
            'website' => 'nullable|url',
        ]);

        $brand = Brand::create(array_merge($validated, [
            'company_id' => $request->user()->getActiveCompanyId(),
            'created_by_id' => $request->user()->id
        ]));

        return response()->json([
            'success' => true,
            'data' => $brand
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::where('company_id', request()->user()->getActiveCompanyId())->findOrFail($id);
        return response()->json(['success' => true, 'data' => $brand]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);

        $validated = $request->validate([
            'brand_name' => 'sometimes|required|string|max:200',
            'brand_code' => 'nullable|string|max:50|unique:brands,brand_code,'.$id.',brand_id',
            'website' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        $brand->update($validated);

        return response()->json(['success' => true, 'data' => $brand]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::where('company_id', request()->user()->getActiveCompanyId())->findOrFail($id);
        $brand->delete();

        return response()->json(['success' => true, 'message' => 'Brand deleted successfully']);
    }
}
