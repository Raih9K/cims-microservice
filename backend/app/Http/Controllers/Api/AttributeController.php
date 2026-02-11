<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Attribute::where('company_id', request()->user()->getActiveCompanyId())->latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'is_variant' => 'boolean'
        ]);

        $attribute = Attribute::create([
            'name' => $validated['name'],
            'type' => $validated['type'] ?? 'text',
            'is_variant' => $validated['is_variant'] ?? true,
            'company_id' => $request->user()->getActiveCompanyId(),
            'created_by_id' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $attribute
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Attribute::where('company_id', request()->user()->getActiveCompanyId())->where('id', $id)->delete();
        return response()->json(['success' => true, 'message' => 'Attribute deleted successfully']);
    }
}
