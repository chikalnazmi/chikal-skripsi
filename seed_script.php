<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->call('migrate:fresh', ['--seed' => true, '--force' => true]);
echo "Migrated and Seeded!\n";
echo trim($kernel->output());
