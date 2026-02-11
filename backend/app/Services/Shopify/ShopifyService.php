<?php

namespace App\Services\Shopify;

use Illuminate\Support\Facades\Http;
use Exception;

class ShopifyService
{
    protected $apiVersion = '2024-01';

    /**
     * Validate connection credentials by fetching shop details
     */
    public function validateConnection(string $shopDomain, string $accessToken)
    {
        $shopDomain = $this->normalizeDomain($shopDomain);

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken
        ])->get("https://{$shopDomain}/admin/api/{$this->apiVersion}/shop.json");

        if ($response->successful()) {
            return $response->json()['shop'];
        }

        throw new Exception("Failed to connect to Shopify: " . ($response->json()['errors'] ?? $response->body()));
    }

    /**
     * Fetch products from Shopify
     */
    public function getProducts(string $shopDomain, string $accessToken, array $params = [])
    {
        $shopDomain = $this->normalizeDomain($shopDomain);

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken
        ])->get("https://{$shopDomain}/admin/api/{$this->apiVersion}/products.json", $params);

        if ($response->successful()) {
            return [
                'products' => $response->json()['products'],
                'link' => $this->parsePaginationHeaders($response->header('Link'))
            ];
        }

        throw new Exception("Failed to fetch products from Shopify: " . $response->body());
    }

    /**
     * Parse Shopify's 'Link' header for pagination
     */
    private function parsePaginationHeaders($linkHeader)
    {
        if (!$linkHeader) return [];

        $links = [];
        $parts = explode(',', $linkHeader);
        foreach ($parts as $part) {
            if (preg_match('/<(.*)>; rel="(.*)"/', trim($part), $matches)) {
                $url = parse_url($matches[1]);
                parse_str($url['query'] ?? '', $query);
                $links[$matches[2]] = $query['page_info'] ?? null;
            }
        }
        return $links;
    }

    /**
     * Update Variant Data (Price, etc)
     */
    public function updateVariant(string $shopDomain, string $accessToken, $variantId, array $data)
    {
        $shopDomain = $this->normalizeDomain($shopDomain);

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken
        ])->put("https://{$shopDomain}/admin/api/{$this->apiVersion}/variants/{$variantId}.json", [
            'variant' => $data
        ]);

        if ($response->successful()) {
            return $response->json()['variant'];
        }

        throw new Exception("Failed to update variant on Shopify: " . $response->body());
    }

    /**
     * Update Inventory Level
     */
    public function updateInventory(string $shopDomain, string $accessToken, array $data)
    {
        $shopDomain = $this->normalizeDomain($shopDomain);

        // Shopify uses a 'set' or 'adjust' endpoint
        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $accessToken
        ])->post("https://{$shopDomain}/admin/api/{$this->apiVersion}/inventory_levels/set.json", $data);

        if ($response->successful()) {
            return $response->json()['inventory_level'];
        }

        throw new Exception("Failed to update inventory on Shopify: " . $response->body());
    }

    /**
     * Normalize shop domain to always be 'something.myshopify.com'
     */
    private function normalizeDomain(string $domain)
    {
        $domain = preg_replace('/^https?:\/\//', '', $domain);
        $domain = rtrim($domain, '/');

        if (!str_contains($domain, '.myshopify.com')) {
            $domain .= '.myshopify.com';
        }

        return $domain;
    }
}
