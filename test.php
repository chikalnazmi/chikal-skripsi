<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::first();
if ($user) {
    echo "Existing user: {$user->username}, {$user->email}\n";
    $v = Validator::make([
        'username' => $user->username, 
        'email' => $user->email
    ], [
        'username' => 'unique:users', 
        'email' => 'unique:users'
    ]);
    echo "Validation passes: " . ($v->passes() ? 'Yes' : 'No') . "\n";
    print_r($v->errors()->toArray());
} else {
    echo "No users found.\n";
}
