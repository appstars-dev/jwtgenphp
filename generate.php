<?php 
// HTML Init
$fhead='<html>
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="images/no_avatar.png" type="image/png">
    <link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body>';
$ffoot= '
</body>
</html>';

// need functions
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
    'sub' => EnvIsSet('JITSI_URI','InputURI', ''),
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
$jituri = EnvIsSet('JITSI_URI','InputURI','');
$link = CreateBaseURI($_ENV['URI_PROTO'], $jituri)."/".$hasroom."&jwt=";

// Output
echo $fhead;
if (isset($jituri))
    {
    echo '<div class="shadow p-3 mb-5 bg-body rounded"> <h2>Your Link:</h2> <a href="' . $link . $jwt .'">'.$link . $jwt.'</a></div>';
    }
echo '<div class="shadow p-3 mb-5 bg-body rounded"><h2>Your token:</h2>' . $jwt . '</div>';
echo $ffoot;
?>