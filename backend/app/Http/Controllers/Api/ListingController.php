<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * ListingController - Marketplace Published Inventory API
 *
 * Handles CRUD operations for marketplace listings.
 * Each listing represents a product published to a specific channel
 * with optional overrides for price, title, description, etc.
 */
class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Query params:
     * - channel_id: Filter by channel
     * - product_id: Filter by product
     * - status: Filter by status (draft, active, paused, error)
     * - sync_status: Filter by sync status
     * - page, per_page: Pagination
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        // Handle "Inactive" tab which shows products NOT in listings
        if ($request->get('status') === 'Inactive' || $request->get('status') === 'inactive') {
            return $this->getNotListedProducts($request);
        }

        $query = Listing::with(['channel', 'product', 'createdBy', 'updatedBy'])
            ->where('company_id', $companyId);

        // Filters
        $channelId = $request->channel_id ?: $request->channel;
        if ($channelId && $channelId !== 'all') {
            $query->where('channel_id', $channelId);
        }
        if ($request->has('product_id')) {
            $query->where('stock_item_id', $request->product_id);
        }
        if ($request->has('status')) {
            $query->where('status', strtolower($request->status));
        }
        if ($request->has('sync_status')) {
            $query->where('sync_status', $request->sync_status);
        }
        if ($request->has('is_published')) {
            $query->where('is_published', $request->boolean('is_published'));
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'updated_at');
        $sortDir = $request->get('sort_dir', 'desc');
        $query->orderBy($sortBy, $sortDir);

        $perPage = min($request->get('per_page', 20), 100);
        $paginated = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $paginated->items(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'total_pages' => $paginated->lastPage(),
            ]
        ]);
    }

    /**
     * Store a newly created listing.
     *
     * Creates a new marketplace listing for a product.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $validated = $request->validate([
            'channel_id' => 'required|string|exists:channels,channel_id',
            'stock_item_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|string',

            // Content overrides
            'title_override' => 'nullable|string|max:500',
            'description_override' => 'nullable|string',
            'short_description_override' => 'nullable|string|max:500',
            'features_override' => 'nullable|array',

            // Pricing
            'price_override' => 'nullable|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|size:3',

            // Inventory
            'quantity_allocated' => 'nullable|integer|min:0',
            'buffer_quantity' => 'nullable|integer|min:0',
            'sync_quantity' => 'nullable|boolean',

            // Status
            'status' => 'nullable|string',

            // Marketplace-specific
            'category_id' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'mapped_attributes' => 'nullable|array',
            'custom_attributes' => 'nullable|array',
        ]);

        // Add system fields
        $validated['listing_id'] = 'lst_' . bin2hex(random_bytes(8));
        $validated['company_id'] = $companyId;
        $validated['created_by'] = $user->id;
        $validated['updated_by'] = $user->id;
        $validated['status'] = $validated['status'] ?? 'draft';
        $validated['sync_status'] = 'pending';
        $validated['currency'] = $validated['currency'] ?? 'USD';

        $listing = Listing::create($validated);
        $listing->load(['channel', 'product', 'createdBy']);

        // Audit log
        AuditLog::logCreate('listing', $listing->listing_id, $validated);

        return response()->json([
            'success' => true,
            'data' => $listing,
            'message' => 'Listing created successfully'
        ], 201);
    }

    /**
     * Display the specified listing.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $listing = Listing::with(['channel', 'product', 'variant', 'createdBy', 'updatedBy'])
            ->where('company_id', $companyId)
            ->findOrFail($id);

        // Add computed fields
        $listing->effective_title = $listing->effective_title;
        $listing->effective_description = $listing->effective_description;
        $listing->effective_price = $listing->effective_price;
        $listing->available_quantity = $listing->available_quantity;

        return response()->json([
            'success' => true,
            'data' => $listing
        ]);
    }

    /**
     * Update the specified listing.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $listing = Listing::where('company_id', $companyId)->findOrFail($id);
        $oldValues = $listing->toArray();

        $validated = $request->validate([
            // Content overrides
            'title_override' => 'nullable|string|max:500',
            'description_override' => 'nullable|string',
            'short_description_override' => 'nullable|string|max:500',
            'features_override' => 'nullable|array',

            // Pricing
            'price_override' => 'nullable|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',

            // Inventory
            'quantity_allocated' => 'nullable|integer|min:0',
            'quantity_reserved' => 'nullable|integer|min:0',
            'buffer_quantity' => 'nullable|integer|min:0',
            'sync_quantity' => 'nullable|boolean',

            // Status
            'status' => 'nullable|in:draft,pending,active,paused,ended',
            'is_published' => 'nullable|boolean',

            // Marketplace-specific
            'marketplace_id' => 'nullable|string|max:100',
            'marketplace_sku' => 'nullable|string|max:100',
            'listing_url' => 'nullable|string|max:2000',
            'category_id' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'mapped_attributes' => 'nullable|array',
            'custom_attributes' => 'nullable|array',
        ]);

        $validated['updated_by'] = $user->id;

        // If publishing for first time
        if ($request->boolean('is_published') && !$listing->is_published) {
            $validated['published_at'] = now();
        }

        // Mark sync as pending if content changed
        $contentFields = ['title_override', 'description_override', 'price_override', 'quantity_allocated'];
        if (array_intersect_key($validated, array_flip($contentFields))) {
            $validated['sync_status'] = 'pending';
        }

        $listing->update($validated);
        $listing->load(['channel', 'product', 'createdBy', 'updatedBy']);

        // Audit log
        AuditLog::logUpdate('listing', $listing->listing_id, $oldValues, $listing->toArray());

        return response()->json([
            'success' => true,
            'data' => $listing,
            'message' => 'Listing updated successfully'
        ]);
    }

    /**
     * Remove the specified listing.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $listing = Listing::where('company_id', $companyId)->findOrFail($id);
        $oldValues = $listing->toArray();

        $listing->delete(); // Soft delete

        // Audit log
        AuditLog::logDelete('listing', $id, $oldValues);

        return response()->json([
            'success' => true,
            'message' => 'Listing deleted successfully'
        ]);
    }

    /**
     * Publish a listing to marketplace.
     */
    public function publish(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $listing = Listing::with(['channel', 'product'])
            ->where('company_id', $companyId)
            ->findOrFail($id);

        $listing->publish();
        $listing->updated_by = $user->id;
        $listing->save();

        // --- BRIDGE TO MARKETPLACES ---
        if ($listing->channel && $listing->channel->platform === 'shopify') {
            try {
                $service = new \App\Services\ShopifyService($listing->channel);

                // If it already has a marketplace ID, we update it. Otherwise, create.
                if ($listing->marketplace_id) {
                    $service->updateProduct($listing);
                    $message = 'Listing updated on Shopify successfully';
                } else {
                    $service->createProduct($listing);
                    $message = 'Listing published to Shopify successfully';
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Shopify Publish Error: ' . $e->getMessage());
                $listing->markSyncError($e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Published locally but failed to push to Shopify: ' . $e->getMessage(),
                    'data' => $listing->fresh()
                ], 400);
            }
        } else {
             $message = 'Listing published successfully (Local Only)';
        }

        AuditLog::logSync('listing', $listing->listing_id, 'manual_publish');

        return response()->json([
            'success' => true,
            'data' => $listing->fresh(['channel', 'product']),
            'message' => $message
        ]);
    }

    /**
     * Pause a listing.
     */
    public function pause(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $listing = Listing::where('company_id', $companyId)->findOrFail($id);

        $listing->pause();
        $listing->updated_by = $user->id;
        $listing->save();

        return response()->json([
            'success' => true,
            'data' => $listing->fresh(),
            'message' => 'Listing paused'
        ]);
    }

    /**
     * Get listings summary/stats.
     */
    public function stats(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $stats = [
            'total' => Listing::where('company_id', $companyId)->count(),
            'active' => Listing::where('company_id', $companyId)->where('status', 'active')->count(),
            'draft' => Listing::where('company_id', $companyId)->where('status', 'draft')->count(),
            'paused' => Listing::where('company_id', $companyId)->where('status', 'paused')->count(),
            'error' => Listing::where('company_id', $companyId)->where('status', 'error')->count(),
            'pending_sync' => Listing::where('company_id', $companyId)->where('sync_status', 'pending')->count(),
            'total_allocated' => Listing::where('company_id', $companyId)->sum('quantity_allocated'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
    /**
     * Get products that are not yet listed in the given channel.
     */
    public function getNotListedProducts(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();
        $channelId = $request->query('channel_id') ?: $request->query('channel', 'shopify');

        $query = \App\Models\Product::where('company_id', $companyId)
            ->whereNotExists(function ($query) use ($channelId) {
                $query->select(\Illuminate\Support\Facades\DB::raw(1))
                    ->from('listings')
                    ->whereColumn('listings.stock_item_id', 'products.id')
                    ->where('listings.channel_id', $channelId)
                    ->whereNull('listings.deleted_at');
            });

        // Filter by Search if provided
        if ($request->has('q')) {
            $q = $request->q;
            $query->where(function($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('sku', 'like', "%{$q}%");
            });
        }

        $paginated = $query->latest()->paginate($request->get('limit', 20));

        // Format similarly to listings for frontend compatibility
        $items = collect($paginated->items())->map(function($product) {
            return [
                'listing_id' => 'unlisted_' . $product->id, // Fake ID for UI
                'stock_item_id' => $product->id,
                'status' => 'inactive',
                'is_linked' => false,
                'channel' => [
                    'name' => 'Available for Listing',
                    'marketplace' => 'central'
                ],
                'product' => [
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'price' => (float)$product->selling_price,
                    'stock' => (int)$product->initial_quantity,
                ],
                // We mark it as fake so frontend knows it's unlisted
                'is_stub' => true
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $items,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'total_pages' => $paginated->lastPage(),
            ]
        ]);
    }
}
