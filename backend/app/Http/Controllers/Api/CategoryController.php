<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::where('company_id', $request->user()->getActiveCompanyId())->get();
        return response()->json(['success' => true, 'data' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|string|max:100',
        ]);

        $category = Category::create([
            'category_name' => $request->category_name,
            'company_id' => $request->user()->getActiveCompanyId(),
            'created_by_id' => $request->user()->id,
        ]);

        return response()->json(['success' => true, 'data' => $category], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);
        $category->update($request->all());
        return response()->json(['success' => true, 'data' => $category]);
    }

    public function destroy(Request $request, $id)
    {
        $category = Category::where('company_id', $request->user()->getActiveCompanyId())->findOrFail($id);
        $category->delete();
        return response()->json(['success' => true, 'message' => 'Category deleted']);
    }
}
