<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Products: " . App\Models\Product::count() . PHP_EOL;
echo "Listings: " . App\Models\Listing::count() . PHP_EOL;
echo "Shopify Listings: " . App\Models\Listing::where('channel_id', 'like', '%shopify%')->count() . PHP_EOL;

$channels = App\Models\Channel::all();
foreach($channels as $c) {
    echo "Channel: {$c->name} ({$c->platform}) - Listings: " . $c->listings()->count() . PHP_EOL;
}
