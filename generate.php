<?php 
ini_set ('display_errors', 1);

require 'bootstrap.php';

// get the local secret key
$secret = EnvIsSet('JWT_KEY','InputJSecret', 'nosecret');

// Create the token header
$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

// Create the token payload
$payload = json_encode([
    'user_id' => array(
        "name" => EnvIsSet('','InputName', 'Anonimous'),
        "id" => EnvIsSet('','InputEmail', 'anonimous@email.com'),
        "email" => EnvIsSet('','InputEmail', 'anonimous@email.com')),
    'moderator' => EnvIsSet('','CheckModerator', false),
    'sub' => EnvIsSet('','InputURI', ''),
    'room' => EnvIsSet('','InputRoom', '*'),
    'exp' => time() + EnvIsSet('EXPIRES','ExpirationTime', '30')*60
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
    echo "Your Link:<br /> <a href=\"" . $link . $jwt ."\">".$link . $jwt."</a><br />";
    }
echo "Your token:\n" . $jwt . "\n";
?>