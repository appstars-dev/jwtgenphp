<?php
// Autoloader
if (file_exists('vendor/autoload.php')) {
    require_once('vendor/autoload.php');
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

function base64UrlEncode(string $text)
{
    return str_replace(
        ['+', '/', '='],
        ['-', '_', ''],
        base64_encode($text)
    );
}

function CreateBaseURI (string $proto, string $uri): string
{
if ($proto != "http" or $proto != "https") {
    $proto ="https://";
    }
    else 
        {
            $proto=$proto.'://';
        }
if (!isset($uri)) $proto="";
    return $proto.$uri;
}

function EnvIsSet (string $env, string $post, string $default) {
$value = $default;
if (empty($_ENV[$env]) or (strcmp($_ENV[$env], "") == 0))
    {
        $value = (empty($_POST[$post]) or strcmp($_POST[$post], "") == 0) ? $default : $_POST[$post];
    } else {$value=$_ENV[$env];}
    if (isset($value)) {
        return $value;
    }
}

function HideDiv(string $env, string $css_class){
    if($_ENV[$env] !== null and strcmp($_ENV[$env], "") == 1){echo $css_class."{display:none;}";}
}

function addRecaptchaJS(string $key){
    if (EnvIsSet('GR_ENABLED','',false) == "true" and $key){
    echo '<script src="https://www.google.com/recaptcha/api.js?render='.$key.'" async defer></script>';
    if (EnvIsSet('GR_VERSION','',3) == "3"){
     echo '<script>
      function onClick(e) {
        e.preventDefault();
        grecaptcha.ready(function() {
          grecaptcha.execute('.$key.', {action: \'submit\'}).then(function(token) {
          });
        });
      }
  </script>';}
    }
}
function RecaptchaElement($key){
    if (EnvIsSet('GR_ENABLED','',false) == "true" and $key){
    echo 'data-sitekey="'.$key.'" data-callback="onSubmit"';
    }
}

function Recaptchadiv($key){
    if (EnvIsSet('GR_ENABLED','',false) == "true" and $key and EnvIsSet('GR_VERSION','',3)==2){
        echo '<div class="g-recaptcha" data-sitekey="'.$key.'"></div>';
    }
}
function ini_local(string $filePath, string $englishValue, string $lang): string
{
    if (!file_exists($filePath)) {
        throw new RuntimeException("Can't find localization file: $filePath");
    }

    $content = file_get_contents($filePath);
    if ($content === false) {
        throw new RuntimeException("Can't read localization file: $filePath");
    }

    $lines = preg_split('/\r\n|\r|\n/', $content);

    $currentLang = null;
    $translations = [];

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, ';')) {
            continue;
        }

        if (preg_match('/^\[([a-zA-Z]{2,})\]$/', $line, $matches)) {
            $currentLang = strtolower($matches[1]);
            continue;
        }

        if ($currentLang === null) {
            continue;
        }

        if (preg_match('/^([A-Z_]+)\s*=\s*(?|"([^"]*)"|\'([^\']*)\'|([^\s#]+))$/', $line, $matches)) {
            $keyName = $matches[1];
            $value   = isset($matches[2]) ? $matches[2] : (isset($matches[3]) ? $matches[3] : $matches[4]);

            $translations[$currentLang][$keyName] = $value;
        }
    }
    $key = null;
    if (isset($translations['en'])) {
        foreach ($translations['en'] as $k => $v) {
            if ($v === $englishValue) {
                $key = $k;
                break;
            }
        }
    }

    if ($key === null) {
        return $englishValue;
    }

    if (isset($translations[$lang][$key])) {
        return $translations[$lang][$key];
    }
    return $englishValue;
}
