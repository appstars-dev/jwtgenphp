<?php
$mail_wizard = true;
$mail_tpl='';
$mail_text='';
$mail_link = '';

if (file_exists('../vendor/autoload.php')) {
    require_once('../vendor/autoload.php');
}

if (file_exists('../generate.php')) {
    require_once('../generate.php');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Initialize the PHPMailer
$mail = new PHPMailer(true);
try {
    $mail->addAddress($_POST['InputEmail']);
} catch (Exception $e) {

}

// SMTP server configuration
$mail->isSMTP();
$mail->Host = EnvIsSet('SMTP_SRV','InputSMTPURI', 'localhost');
$mail->SMTPAuth = EnvIsSet('SMTP_AUTH','CheckSMTPAuth', true);
$mail->Username = EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user");
$mail->Password = EnvIsSet('SMTP_PWD','CheckSMTPPassword', "changemesmtp");
$mail->From = EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user");
$mail->SMTPSecure = 'ssl';
$mail->Port = EnvIsSet('SMTP_PORT','', 587);
$mail->SMTPKeepAlive = true;
$mail->SMTPDebug = 2;

// Letter configuration
$mail->Subject = EnvIsSet('SMTP_TOPIC','SMTPTopic', "You were suggested to Jitsi Meeting");
$mail->Body = $mail_tpl;
$mail->isHTML();
$mail->AltBody = $mail_text.$mail_link;

try {
    $mail->send();
    echo "Letter was successfully sent!";
} catch (Exception $e) {
    echo "Error: " . $mail->ErrorInfo;
}
