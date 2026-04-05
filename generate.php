<?php 
ini_set ('display_errors', 1);

require 'bootstrap.php';
$expires=getenv('EXPIRES');

// get the local secret key
$secret = getenv('JWT_KEY');
$hasroom=$_POST['InputRoom'];

if (!isset($hasroom)) {
    $hasroom = '*'; 
    }

// Create the token header
$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

// Create the token payload
$payload = json_encode([
    'user_id' => array(
        "name" => $_POST['InputName'],
        "id" => $_POST['InputEmail'],
        "email" => $_POST['InputEmail']),
    'moderator' => $_POST['CheckModerator'],
    'sub' => $_POST['InputURI'],
    'room' => $hasroom,
    'exp' => time() + $expires*60
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

if ($hasroom="*"){$hasroom="";}
//Create Link
$link=CreateBaseURI(getenv('URI_PROTO'), $_POST['InputURI'])."/".$hasroom."&jwt=";

if (isset($_POST['InputURI']))
    {
    echo "Your Link:\n" . $link . $jwt ."\n";
    }
echo "Your token:\n" . $jwt . "\n";
?>