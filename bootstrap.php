<?php
// Autoloader
if (file_exists('vendor/autoload.php')) {
    require_once('vendor/autoload.php');
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); //Notice the Namespace and Class
$dotenv->load();

function base64UrlEncode($text)
{
    return str_replace(
        ['+', '/', '='],
        ['-', '_', ''],
        base64_encode($text)
    );
}

function CreateBaseURI ($proto, $uri)
{
if ($proto != "http" or $proto != "https") {
    $proto ="https:";
    }
    else 
        {
            $proto=$proto.':';
        }
if (empty($uri)) {$proto="";};
    $text=$proto.$uri;
        return $text;
}

?>