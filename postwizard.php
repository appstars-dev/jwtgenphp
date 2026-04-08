<?php
$mail_wizard = true;

// Autoloader
if (file_exists('vendor/autoload.php')) {
    require_once('vendor/autoload.php');
}
    require_once('generate.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// Initialize the PHPMailer
$mail = new PHPMailer(true);
$mail->addAddress($_POST['InputEmail']);

// SMTP server configuration
$mail->isSMTP();
$mail->isHTML(true);
$mail->Host = EnvIsSet('SMTP_SRV','InputSMTPURI', 'localhost');
$mail->SMTPAuth = EnvIsSet('SMTP_AUTH','CheckSMTPAuth', true);
$mail->Username = EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user");
$mail->Password = EnvIsSet('SMTP_PWD','CheckSMTPPassword', "changemesmtp");
$mail->From = EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user");
$mail->SMTPSecure = 'ssl';
$mail->Port = EnvIsSet('SMTP_PORT','', 587);
$mail->SMTPKeepAlive = true;
$mail->SMTPDebug = 0;



// Letter configuration
$mail->isHTML(true);
$mail->Subject = EnvIsSet('SMTP_TOPIC','SMTPTopic', "You were sujested to Jitsi Meeting");;
$mail->Body = $mail_text.$mail_btn;
$mail->AltBody = $mail_text.$mail_link;

try {
    $mail->send();
    echo "Letter was successfully sent!";
} catch (Exception $e) {
    echo "Error: " . $mail->ErrorInfo;
}
?>