<?php 
// HTML Init
$fhead='<!DOCTYPE html >
<html lang=en>
<head>
    <title>JWT tag generator</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5">
        <link rel="icon" href="images/no_avatar.png" type="image/png">
        <link rel="apple-touch-icon" href="images/no_avatar.png" type="image/png">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/iconfont.css">
        <script type="text/javascript" src="js/main.js"></script>
</head>
<body>';
$ffoot= '
</body>
</html>';
require 'bootstrap.php';
require_once 'capi.php';
$joinroom=EnvIsSet('DEFAULT_ROOM', 'InputRoom', 'public');
if (EnvIsSet('', 'CheckWildcard', false))
{$room= '*';}
else
{$room=$joinroom;}
// get the local secret key
$secret = EnvIsSet('JWT_KEY','InputJSecret', 'no secret');

// Create the token header
$header = json_encode([
    'typ' => 'JWT',
    'alg' => 'HS256'
]);

// Create the token payload
$payload = json_encode([
    'aud' => EnvIsSet('APP_ID','InputAppid', ''),
    'iss' => EnvIsSet('APP_ID','InputAppid', ''),
    'sub' => EnvIsSet('JITSI_URI','InputURI', ''),
    'exp' => time() + EnvIsSet('EXPIRES','ExpirationTime', '30')*60,
    'context' =>array(
    'user_id' => array(
        "name" => EnvIsSet('','InputName', 'Anonymous'),
        "email" => EnvIsSet('','InputEmail', 'anonymous@email.com'),
        "id" => EnvIsSet('','InputEmail', 'anonymous@email.com'))),
    'moderator' => EnvIsSet('','CheckModerator', false) === "on",
    'room' => $room,
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

//Create Link
$jituri = EnvIsSet('JITSI_URI','InputURI','');
$link = CreateBaseURI(EnvIsSet('URI_PROTO','','https'), $jituri)."/".$joinroom."?jwt=";
if (isset($mail_wizard)){echo('');} else {

if (isset($jituri)) {
    echo $fhead;
    if (strcmp(EnvIsSet('RESULT', '', 'both'), "token") !== 0) {
        echo '<div class="shadow p-3 mb-5 bg-body rounded"> <form>
        <label class="form-label"><b>'.ini_local("Your link").': </b></label><div class="input-group mb-3">
        <input type="text" class="form-control" id="jwtlink" name="jwtlink" value="' . $link . $jwt . '">
        <button type="button" class="btn btn-outline-secondary feather icon-copy" onclick="copyJWTLink()"></button>
        </div>
    </form>
    <a class="btn btn-outline-secondary" href="' . $link . $jwt . '"><span class="feather icon-log-in"></span> '. ini_local("Go to meeting") . '</a></div>';
        echo '<div class="shadow p-3 mb-5 bg-body rounded"> <form>
        <label class="form-label"><b>'.ini_local("Your short link").': </b></label><div class="input-group mb-3">
        <input type="text" class="form-control" id="sjwtlink" name="sjwtlink" value="' . shortapi($link.$jwt, EnvIsSet('SLINK_URL','',''), EnvIsSet('SLINK_PASSWD','','')) . '">
        <button type="button" class="btn btn-outline-secondary feather icon-copy" onclick="copyJWTLink()"></button>
        </div>
    </form>
    <a class="btn btn-outline-secondary" href="' . $link . $jwt . '"><span class="feather icon-log-in"></span> '. ini_local("Go to meeting") . '</a></div>';
    }
}
    if (strcmp(EnvIsSet('RESULT', '', 'both'), "link") !== 0) {
    echo '<div class="shadow p-3 mb-5 bg-body rounded"> <form>
        <label class="form-label"><b>'.ini_local("Your token").':</b></label><div class="input-group mb-3">
        <input type="text" class="form-control" id="jwtoken" name="jwtoken" value="'.$jwt.'">
        <button type="button" class="btn btn-outline-secondary feather icon-copy" onclick="copyJWToken()"></button>
        </div>
    </form></div>';
    }
echo $ffoot;
}

//For mailing
$mail_text='<p>You were suggested to the Jitsi conference. In case you want to participate meeting, please click the button below. <br> Be careful, double check the mail sender to avoid unwanted circumstances</p>';
$mail_link= '<h2>Your Link:</h2> <a href="' . $link . $jwt .'">'.$link . $jwt.'</a></div>';
$mail_tpl='<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html lang=en>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
  </head>
  <body style="margin: 0; padding: 0">
    <table style="background-color: #f4f4f8; height: 100%" width="100%" cellspacing="0" cellpadding="0">
      <tbody>
        <tr style="padding-bottom: 32px">
          <td style="vertical-align: top; padding-top: 80px" align="center">
            <table width="600" style="background-color: #ffffff; border-collapse: collapse; min-width: 320px; font-family: sans-serif; font-weight: 400; line-height: 140%; mso-line-height-rule: exactly; color: rgb(29, 27, 27);" cellspacing="0">
              <tbody>
                <tr>
                  <td>
                    <table style="padding: 32px 32px 48px 32px" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <td>
                            <table>
                              <tbody>
                                <tr>
                                  <td style="padding: 0; width: 300px; text-align: left;" align="left">
                                    <img style="display: block" src="'.EnvIsSet('MAIL_LOGO','','https://github.com/appstars-dev/jwtgenphp/blob/public/images/no_avatar.png?raw=true').'" alt="logo" width="64">
                                  </td>
                                  <td style="padding: 0; width: 300px" align="right">
                                   <a style="color: rgb(4, 119, 4); font-family: sans-serif; font-size: 16px; line-height: 22px; letter-spacing: normal; text-decoration: none;" href="'.EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user").'" target="_blank" rel="noopener">Mail back to author</a>
                                   </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style="padding-left: 32px;padding-right: 32px;padding-bottom: 36px;" width="600">
                      <tbody>
                        <tr>
                          <td style="padding-top: 0; padding-bottom: 40px; font-family: sans-serif; font-size: 16px; line-height: 22px; letter-spacing: normal; width: 600px; height: 27px;">
                            '.$mail_text.'
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0" style="background-color: rgb(4, 119, 4); border-radius: 12px; padding: 14px 28px;">
                              <tbody><tr>
                                <td valign="middle" align="center">
                                  <a style="color:rgb(255, 255, 255); font-family: sans-serif; font-weight:bold; font-size: 16px; -webkit-text-size-adjust:none; border-radius: 12px; line-height: 20px; text-decoration: none;" href="'. $link . $jwt .'" target="_blank" rel="noopener">
                                    <b>Join</b>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
</body>
</html>';


