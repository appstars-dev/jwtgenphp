<?php
// Autoloader
if (file_exists('vendor/autoload.php')) {
    require_once('vendor/autoload.php');
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

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
    $proto ="https://";
    }
    else 
        {
            $proto=$proto.'://';
        }
if (!isset($uri)) {$proto="";};
    $text=$proto.$uri;
        return $text;
}

function EnvIsSet ($env, $post, $default) {
$value = $default;
if (empty($_ENV[$env]) or strcmp($_ENV[$env], "") == 0)
    {
        if (empty($_POST[$post]) or strcmp($_POST[$post], "") == 0){$value = $default;} else {$value=$_POST[$post];}
    } else {$value=$_ENV[$env];}
    return $value;
}

function HideDiv($env, $css_class){
    if($_ENV[$env] !== null and strcmp($_ENV[$env], "") == 1){echo $css_class."{display:none;}";}
}
?>