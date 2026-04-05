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
$mail->Host = 'smtp.sendlayer.net';
$mail->SMTPAuth = true;
$mail->Username = 'your_sendlayer_username';
$mail->Password = 'your_sendlayer_password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
?>