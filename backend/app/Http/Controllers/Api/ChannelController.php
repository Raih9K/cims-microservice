<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * ChannelController - Marketplace Connections API
 *
 * Handles CRUD for marketplace channels (Shopify, Amazon, eBay, etc.)
 * Each company can have multiple channel connections.
 */
class ChannelController extends Controller
{
    /**
     * Display all channels for the company.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channels = Channel::where('company_id', $companyId)
            ->withCount(['listings', 'listings as active_listings_count' => function ($q) {
                $q->where('status', 'active');
            }])
            ->get()
            ->map(function ($channel) {
                $channel->total_allocated_stock = $channel->total_allocated_stock;
                return $channel;
            });

        return response()->json([
            'success' => true,
            'data' => $channels
        ]);
    }

    /**
     * Store a newly created channel.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'platform' => 'required|in:shopify,amazon,ebay,etsy,walmart,other',
            'marketplace' => 'nullable|string',
            'marketplace_data' => 'nullable|array',
            'credentials' => 'nullable|array',
            'store_url' => 'nullable|url|max:500',
        ]);

        $validated['channel_id'] = 'ch_' . bin2hex(random_bytes(8));
        $validated['company_id'] = $companyId;
        $validated['connected_by'] = $user->id;
        $validated['created_by'] = $user->id;
        $validated['updated_by'] = $user->id;
        $validated['status'] = 'pending';
        $validated['marketplace'] = $validated['marketplace'] ?? $validated['platform'];

        $channel = Channel::create($validated);

        // Audit log
        AuditLog::logCreate('channel', $channel->channel_id, [
            'name' => $channel->name,
            'platform' => $channel->platform,
        ]);

        return response()->json([
            'success' => true,
            'data' => $channel,
            'message' => 'Channel created successfully'
        ], 201);
    }

    /**
     * Display the specified channel with listings.
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)
            ->with(['listings' => function ($q) {
                $q->with('product')->limit(50);
            }, 'connectedBy'])
            ->withCount('listings')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $channel
        ]);
    }

    /**
     * Update the specified channel.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)->findOrFail($id);
        $oldValues = $channel->toArray();

        $validated = $request->validate([
            'name' => 'nullable|string|max:100',
            'status' => 'nullable|in:active,inactive,error,pending',
            'marketplace_data' => 'nullable|array',
            'credentials' => 'nullable|array',
            'store_url' => 'nullable|url|max:500',
        ]);

        $validated['updated_by'] = $user->id;

        $channel->update($validated);

        // Audit log
        AuditLog::logUpdate('channel', $channel->channel_id, $oldValues, $channel->toArray());

        return response()->json([
            'success' => true,
            'data' => $channel,
            'message' => 'Channel updated successfully'
        ]);
    }

    /**
     * Remove the specified channel.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)->findOrFail($id);
        $oldValues = $channel->toArray();

        // Check for active listings
        $activeListings = $channel->listings()->where('status', 'active')->count();
        if ($activeListings > 0) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'HAS_ACTIVE_LISTINGS',
                    'message' => "Cannot delete channel with {$activeListings} active listings. Please end them first."
                ]
            ], 422);
        }

        $channel->delete(); // Soft delete

        // Audit log
        AuditLog::logDelete('channel', $id, $oldValues);

        return response()->json([
            'success' => true,
            'message' => 'Channel deleted successfully'
        ]);
    }

    /**
     * Activate a channel.
     */
    public function activate(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)->findOrFail($id);

        $channel->update([
            'status' => 'active',
            'updated_by' => $user->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $channel,
            'message' => 'Channel activated'
        ]);
    }

    /**
     * Deactivate a channel.
     */
    public function deactivate(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)->findOrFail($id);

        $channel->update([
            'status' => 'inactive',
            'updated_by' => $user->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $channel,
            'message' => 'Channel deactivated'
        ]);
    }

    /**
     * Test channel connection.
     */
    public function testConnection(Request $request, string $id)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $channel = Channel::where('company_id', $companyId)->findOrFail($id);

        // TODO: Implement actual API connection test based on platform
        // For now, return mock success

        return response()->json([
            'success' => true,
            'data' => [
                'connected' => true,
                'message' => 'Connection test successful',
                'tested_at' => now()->toIso8601String(),
            ]
        ]);
    }

    /**
     * Get channel stats.
     */
    public function stats(Request $request)
    {
        $user = $request->user();
        $companyId = $user->getActiveCompanyId();

        $stats = [
            'total_channels' => Channel::where('company_id', $companyId)->count(),
            'active_channels' => Channel::where('company_id', $companyId)->where('status', 'active')->count(),
            'by_platform' => Channel::where('company_id', $companyId)
                ->selectRaw('platform, count(*) as count')
                ->groupBy('platform')
                ->pluck('count', 'platform'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
