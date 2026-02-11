<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $query = \App\Models\Product::with('variants')
            ->where('company_id', $companyId);

        // Filtering
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('tab')) {
            $tab = $request->tab;
            if ($tab === 'In Stock') {
                $query->where('initial_quantity', '>', 0);
            } elseif ($tab === 'Out Of Stock') {
                $query->where('initial_quantity', '<=', 0);
            } elseif ($tab === 'Draft Listings') {
                $query->where('status', 'Draft');
            }
        }

        $paginator = $query->latest()->paginate($request->get('limit', 15));

        $items = collect($paginator->items())->map(function ($product) {
            return [
                'stock_item_id' => (string)$product->id,
                'title' => $product->name,
                'sku' => $product->sku,
                'category' => $product->category,
                'brand' => $product->brand,
                'total_quantity' => (int)$product->initial_quantity,
                'selling_price' => (float)$product->selling_price,
                'status' => $product->status,
                'stock_type' => $product->stock_type,
                'thumbnail' => !empty($product->images) && is_array($product->images) ? $product->images[0] : $product->thumbnail,
                'warehouse' => $product->warehouse,
                'bin' => $product->bin,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
                'variants' => $product->variants->map(function($variant) {
                    return [
                        'id' => $variant->id,
                        'name' => $variant->name,
                        'sku' => $variant->sku,
                        'inventory_quantity' => (int)$variant->inventory_quantity,
                        'price' => (float)$variant->selling_price,
                        'image' => $variant->image,
                    ];
                }),
            ];
        });

        return response()->json([
            'success' => true,
            'status' => 'success',
            'data' => $items,
            'pagination' => [
                'total' => $paginator->total(),
                'page' => $paginator->currentPage(),
                'limit' => $paginator->perPage(),
                'totalPages' => $paginator->lastPage(),
                'hasNext' => $paginator->hasMorePages(),
                'hasPrev' => $paginator->currentPage() > 1,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'basicInfo.title' => 'required|string|max:255',
            'basicInfo.sku' => 'nullable|string|unique:products,sku',
            'basicInfo.category' => 'nullable|string',
            'basicInfo.brand' => 'nullable|string',
            'description.mainDescription' => 'nullable|string',
            'pricing.costPrice' => 'nullable',
            'pricing.sellingPrice' => 'nullable',
            'pricing.discountType' => 'nullable|string',
            'pricing.discountValue' => 'nullable',
            'pricing.taxClass' => 'nullable|string',
            'media.images' => 'nullable|array',
            'listingStatus.status' => 'nullable|string',
            'variants.hasVariation' => 'boolean',
            'variants.variantItems' => 'nullable|array',
        ]);

        try {
            $product = \Illuminate\Support\Facades\DB::transaction(function () use ($request) {
                $data = $request->all();

                // Robust price mapping (checks both possible locations in payload)
                $costPrice = !empty($data['basicInfo']['purchasePrice']) ? $data['basicInfo']['purchasePrice'] : ($data['pricing']['costPrice'] ?? 0);
                $sellingPrice = !empty($data['basicInfo']['retailPrice']) ? $data['basicInfo']['retailPrice'] : ($data['pricing']['sellingPrice'] ?? 0);

                // Ensure boolean value for variation flag
                $hasVariation = filter_var(data_get($data, 'variants.hasVariation', false), FILTER_VALIDATE_BOOLEAN);

                // Map media images (objects to URLs)
                $images = [];
                if (isset($data['media']['images']) && is_array($data['media']['images'])) {
                    foreach ($data['media']['images'] as $img) {
                        if (is_string($img)) {
                            $images[] = $img;
                        } elseif (is_array($img) && isset($img['url'])) {
                            $images[] = $img['url'];
                        }
                    }
                }

                // Auto-Status Logic: 80% Completeness (6/7 fields) + Stock > 0
                $filledFields = 0;
                $checkList = [
                    data_get($data, 'basicInfo.title'),
                    data_get($data, 'basicInfo.sku'),
                    data_get($data, 'basicInfo.category'),
                    data_get($data, 'basicInfo.brand'),
                    data_get($data, 'description.mainDescription'),
                    $sellingPrice > 0 ? '1' : null,
                    count($images) > 0 ? '1' : null
                ];
                foreach ($checkList as $item) {
                     if (!empty($item)) $filledFields++;
                }

                $initialQty = (float)data_get($data, 'inventory.stocks.0.available', 0);
                $calculatedStatus = data_get($data, 'listingStatus.status', 'Draft');

                if ($filledFields >= 6 && $initialQty > 0) {
                    $calculatedStatus = 'Active';
                }

                $product = \App\Models\Product::create([
                    'company_id'      => $request->user()->getActiveCompanyId(),
                    'business_name'   => $request->user()->company->name ?? null,
                    'name'            => data_get($data, 'basicInfo.title'),
                    'type'            => $hasVariation ? 'Variant' : 'Simple',
                    'stock_type'      => $hasVariation ? 'parent' : 'basic',
                    'sku'             => data_get($data, 'basicInfo.sku'),
                    'barcode'         => data_get($data, 'basicInfo.productIdentifierValue'), // Defaulting barcode
                    'category'        => data_get($data, 'basicInfo.category'),
                    'brand'           => data_get($data, 'basicInfo.brand'),
                    'description'     => data_get($data, 'description.mainDescription'),
                    'item_type'       => 'physical',

                    // Inventory Mapping
                    'track_inventory'  => true,
                    'initial_quantity' => $initialQty,
                    'warehouse'        => data_get($data, 'inventory.stocks.0.warehouse', 'Default'),
                    'bin'              => data_get($data, 'inventory.stocks.0.binLocations.0'),

                    // Manufacturer info
                    'manufacturer_name' => data_get($data, 'basicInfo.manufacturer'),
                    'manufacturer_country_code' => substr(data_get($data, 'basicInfo.manufacturedCountry', 'US'), 0, 2),

                    // Pricing Mapping
                    'cost_price'      => (float)$costPrice,
                    'selling_price'   => (float)$sellingPrice,
                    'discount_type'   => data_get($data, 'pricing.discountType', 'none'),
                    'discount_value'  => (float)data_get($data, 'pricing.discountValue', 0),
                    'tax_class'       => data_get($data, 'pricing.taxClass', 'standard'),

                    'images'          => $images,
                    'status'          => $calculatedStatus,
                    'visibility'      => 'Public',
                    'created_by_id'   => $request->user()->id,
                ]);

                // Sync Identifiers
                if (data_get($data, 'basicInfo.productIdentifierType') && data_get($data, 'basicInfo.productIdentifierValue')) {
                    $product->identifiers()->create([
                        'product_identifier' => $data['basicInfo']['productIdentifierType'],
                        'product_identifier_value' => $data['basicInfo']['productIdentifierValue']
                    ]);
                }

                // Sync Bullet Points (Features)
                if (isset($data['description']['features']) && is_array($data['description']['features'])) {
                    foreach ($data['description']['features'] as $index => $feature) {
                        if (empty($feature)) continue;
                        $product->bulletPoints()->create([
                            'bullet_text' => $feature,
                            'display_order' => $index
                        ]);
                    }
                }

                // Sync Dimensions
                $product->dimensions()->create([
                    'length' => (float)data_get($data, 'basicInfo.dimensionLength', 0),
                    'width' => (float)data_get($data, 'basicInfo.dimensionWidth', 0),
                    'height' => (float)data_get($data, 'basicInfo.dimensionHeight', 0),
                    'weight' => (float)data_get($data, 'basicInfo.weightValue', 0),
                    'weight_unit' => data_get($data, 'basicInfo.weightUnit', 'kg'),
                    'dimension_unit' => data_get($data, 'basicInfo.dimensionUnit', 'inch'),
                ]);

                // Sync Multi-Warehouse Inventory (Stock Levels)
                if (isset($data['inventory']['stocks']) && is_array($data['inventory']['stocks'])) {
                    foreach ($data['inventory']['stocks'] as $stock) {
                        $warehouseName = $stock['warehouse'] ?? 'Default';
                        $warehouse = \App\Models\Warehouse::firstOrCreate(
                            ['name' => $warehouseName, 'company_id' => $request->user()->getActiveCompanyId()],
                            ['is_default' => ($warehouseName === 'Default' || ($stock['isDefault'] ?? false))]
                        );

                        $product->stockLevels()->create([
                            'warehouse_id' => $warehouse->id,
                            'available_quantity' => (int)($stock['available'] ?? 0),
                            'minimum_level' => 0,
                        ]);
                    }
                }

                $hasVariation = filter_var(data_get($data, 'variants.hasVariation', false), FILTER_VALIDATE_BOOLEAN);

                if ($hasVariation && is_array(data_get($data, 'variants.variantItems'))) {
                    foreach (data_get($data, 'variants.variantItems', []) as $variantData) {
                        if (empty($variantData['title'])) continue;
                        $product->variants()->create([
                            'name'       => $variantData['title'],
                            'sku'        => $variantData['sku'] ?? ($product->sku . '-' . uniqid()),
                            'attributes' => $variantData['combination'] ?? [],
                            'status'     => 'active',
                            'selling_price' => (float)($variantData['price'] ?? 0),
                            'inventory_quantity' => (int)($variantData['quantity'] ?? 0),
                            'barcode' => $variantData['barcode'] ?? null,
                        ]);
                    }
                }

                return $product;
            });
        } catch (\Illuminate\Database\QueryException $e) {
            // Handle Duplicate Entry
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Duplicate entry detected. The SKU or Identifier provided already exists.',
                    'errors' => [
                        'basicInfo.sku' => ['The SKU has already been taken.']
                    ]
                ], 422);
            }
            throw $e;
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => $product->load(['variants', 'identifiers', 'bulletPoints', 'dimensions', 'stockLevels.warehouse'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $product = \App\Models\Product::where('company_id', $companyId)
            ->with(['variants', 'identifiers', 'bulletPoints', 'dimensions', 'stockLevels.warehouse'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'status' => 'success',
            'data' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $product = \App\Models\Product::where('company_id', $companyId)->findOrFail($id);

        $data = $request->all();

        try {
            $product->update([
                'name' => data_get($data, 'basicInfo.title', $product->name),
                'sku' => data_get($data, 'basicInfo.sku', $product->sku),
                'category' => data_get($data, 'basicInfo.category', $product->category),
                'brand' => data_get($data, 'basicInfo.brand', $product->brand),
                'manufacturer_name' => data_get($data, 'basicInfo.manufacturer', $product->manufacturer_name),
                'description' => data_get($data, 'description.mainDescription', $product->description),
                'cost_price' => data_get($data, 'pricing.costPrice', $product->cost_price),
                'selling_price' => data_get($data, 'pricing.sellingPrice', $product->selling_price),
                'discount_type' => data_get($data, 'pricing.discountType', $product->discount_type),
                'discount_value' => data_get($data, 'pricing.discountValue', $product->discount_value),
                'tax_class' => data_get($data, 'pricing.taxClass', $product->tax_class),
                'images' => data_get($data, 'media.images', $product->images),
                'status' => data_get($data, 'listingStatus.status', $product->status),
                'stock_type' => data_get($data, 'variants.hasVariation', false) ? 'parent' : 'basic',
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'success' => false,
                    'status' => 'error',
                    'message' => 'Duplicate entry detected. The SKU provided already exists.',
                    'errors' => [
                        'basicInfo.sku' => ['The SKU has already been taken.']
                    ]
                ], 422);
            }
            throw $e;
        }

        // Update sub-tables (delete and recreate for simplicity in this turn)
        $product->identifiers()->delete();
        if (data_get($data, 'basicInfo.productIdentifierType') && data_get($data, 'basicInfo.productIdentifierValue')) {
            $product->identifiers()->create([
                'product_identifier' => $data['basicInfo']['productIdentifierType'],
                'product_identifier_value' => $data['basicInfo']['productIdentifierValue']
            ]);
        }

        $product->bulletPoints()->delete();
        if (isset($data['description']['features']) && is_array($data['description']['features'])) {
            foreach ($data['description']['features'] as $index => $feature) {
                if (empty($feature)) continue;
                $product->bulletPoints()->create([
                    'bullet_text' => $feature,
                    'display_order' => $index
                ]);
            }
        }

        $product->dimensions()->updateOrCreate([], [
            'length' => (float)data_get($data, 'basicInfo.dimensionLength', 0),
            'width' => (float)data_get($data, 'basicInfo.dimensionWidth', 0),
            'height' => (float)data_get($data, 'basicInfo.dimensionHeight', 0),
            'weight' => (float)data_get($data, 'basicInfo.weightValue', 0),
            'weight_unit' => data_get($data, 'basicInfo.weightUnit', 'kg'),
            'dimension_unit' => data_get($data, 'basicInfo.dimensionUnit', 'inch'),
        ]);

        // Sync Multi-Warehouse Inventory (Stock Levels)
        if (isset($data['inventory']['stocks']) && is_array($data['inventory']['stocks'])) {
            $product->stockLevels()->delete();
            foreach ($data['inventory']['stocks'] as $stock) {
                $warehouseName = $stock['warehouse'] ?? 'Default';
                $warehouse = \App\Models\Warehouse::firstOrCreate(
                    ['name' => $warehouseName, 'company_id' => $request->user()->getActiveCompanyId()],
                    ['is_default' => ($warehouseName === 'Default' || ($stock['isDefault'] ?? false))]
                );

                $product->stockLevels()->create([
                    'warehouse_id' => $warehouse->id,
                    'available_quantity' => (int)($stock['available'] ?? 0),
                    'minimum_level' => 0,
                ]);
            }
        }

        if (data_get($data, 'variants.hasVariation', false) && is_array(data_get($data, 'variants.variantItems'))) {
            // Simple approach: delete and recreate variants for now
            $product->variants()->delete();
            foreach (data_get($data, 'variants.variantItems', []) as $variantData) {
                if (empty($variantData['title'])) continue;
                $product->variants()->create([
                    'name' => $variantData['title'],
                    'sku' => $variantData['sku'] ?? ($product->sku . '-' . uniqid()),
                    'attributes' => $variantData['combination'] ?? [],
                    'status' => 'active',
                    'selling_price' => (float)($variantData['price'] ?? 0),
                    'inventory_quantity' => (int)($variantData['quantity'] ?? 0),
                    'barcode' => $variantData['barcode'] ?? null,
                    'brand' => data_get($data, 'basicInfo.brand'),
                    'category' => data_get($data, 'basicInfo.category'),
                    'supplier_data' => data_get($data, 'suppliers', []),
                    'specifications' => data_get($data, 'attributes', []),
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $product->load(['variants', 'identifiers', 'bulletPoints', 'dimensions', 'stockLevels.warehouse'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $product = \App\Models\Product::where('company_id', $companyId)->findOrFail($id);

        \Illuminate\Support\Facades\DB::transaction(function () use ($product) {
            $product->variants()->delete();
            $product->identifiers()->delete();
            $product->bulletPoints()->delete();
            $product->dimensions()->delete();
            $product->stockLevels()->delete();
            $product->delete();
        });

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    }

    /**
     * Update a specific variant.
     */
    public function updateVariant(Request $request, string $productId, string $variantId)
    {
        $variant = \App\Models\ProductVariant::where('product_id', $productId)->findOrFail($variantId);

        $validated = $request->validate([
            'basicInfo.title' => 'required|string|max:255',
            'basicInfo.sku' => 'nullable|string',
            'basicInfo.brand' => 'nullable|string',
            'basicInfo.category' => 'nullable|string',
            'pricing.sellingPrice' => 'nullable|numeric',
            'pricing.costPrice' => 'nullable|numeric',
            'inventory.stocks.0.available' => 'nullable|numeric',
            'basicInfo.productIdentifierValue' => 'nullable|string',
            'media.images' => 'nullable|array',
            'media.images.*.url' => 'nullable|string',
            'suppliers' => 'nullable|array',
            'attributes' => 'nullable|array',
        ]);

        $variant->update([
            'name' => data_get($validated, 'basicInfo.title'),
            'sku' => data_get($validated, 'basicInfo.sku'),
            'brand' => data_get($validated, 'basicInfo.brand'),
            'category' => data_get($validated, 'basicInfo.category'),
            'selling_price' => (float)data_get($validated, 'pricing.sellingPrice', 0),
            'cost_price' => (float)data_get($validated, 'pricing.costPrice', 0),
            'inventory_quantity' => (int)data_get($validated, 'inventory.stocks.0.available', 0),
            'barcode' => data_get($validated, 'basicInfo.productIdentifierValue'),
            'image' => data_get($validated, 'media.images.0.url'),
            'supplier_data' => data_get($validated, 'suppliers', []),
            'specifications' => data_get($validated, 'attributes', []),
        ]);

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Variant updated successfully',
            'data' => $variant
        ]);
    }
}
