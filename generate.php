<?php 
ini_set ('display_errors', 1);

require 'bootstrap.php';
$expires=getenv('EXPIRES');

// get the local secret key
$secret = getenv('JWT_KEY');

// Create the token header
$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

// Create the token payload
$payload = json_encode([
    'user_id' => 1,
    'moderator' => $_POST['InputRoom'],
    'sub' => "",
    'room' => $_POST['InputRoom'],
    'exp' => time() + $extpires*60

    

]);

// Encode Header
$base64UrlHeader = base64UrlEncode($header);

// Encode Payload
$base64UrlPayload = base64UrlEncode($payload);

// Create Signature Hash
$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

// Encode Signature to Base64Url String
$base64UrlSignature = base64UrlEncode($signature);

// Create JWT
$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

echo "Your token:\n" . $jwt . "\n";
?>