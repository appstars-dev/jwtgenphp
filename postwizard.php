<?php
// Autoloader
if (file_exists('vendor/autoload.php')) {
    require_once('vendor/autoload.php');
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// Initialize the PHPMailer
$mail = new PHPMailer(true);

// SMTP server configuration
$mail->isSMTP();
$mail->Host = EnvIsSet('SMTP_SRV','InputSMTPURI', 'localhost');
$mail->SMTPAuth = EnvIsSet('SMTP_AUTH','CheckSMTPAuth', true);
$mail->Username = EnvIsSet('SMTP_USR','CheckSMTPLogin', "default_user");
$mail->Password = EnvIsSet('SMTP_PWD','CheckSMTPPassword', "changemesmtp");
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = EnvIsSet('SMTP_PWD','CheckSMTPPassword', 587);
?>