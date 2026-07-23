<?php
require_once __DIR__ . '/includes/tg_db.php';
require_once 'includes/bootstrap.php';
$debug = EnvIsSet("DEBUG_MODE","", false);
$token = EnvIsSet("TG_BOT_TOKEN","","");
$message = FieldV($_POST['message']);
$username = FieldV($_POST['username']);
// Disable buffering to see messages as soon as we got it
if ($debug === true) {
    ob_implicit_flush(true);
    ini_set('display_errors', 1);
    logDebug("=== Testing Sending ===");


    if (empty($token)) {
        logDebug("FATAL ERROR: Variable TG_BOT_TOKEN is empty!");
        logDebug("Check if .env present in the root directory).");
        logDebug("Should be: TG_BOT_TOKEN=yourtoken.");
        exit(1);
    }

    if (strlen($token) < 30) {
        logDebug("❌ Error: Token is too short (" . strlen($token) . "). Check for spaces.");
        exit(1);
    }
    $safeToken = substr($token, 0, 5) . '...' . substr($token, -5);
    logDebug("Token got: {$safeToken}");
    logDebug("Looking for user: @{$username}");
}
/**
 * @throws Exception
 */
function sendMessageByUsername($pdo, $token, $username, $text)
{
    global $pdo;

    $stmt = $pdo->prepare("SELECT chat_id, username FROM users WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $row = $stmt->fetch();
    $debug = EnvIsSet("DEBUG_MODE","", false);

    if (!$row) {
        logDebug("User @{$username} was not found in the database.!<br>");
        logDebug("Text /start to Telegram, to be set in the database.<br>");
        logDebug("Or check if Telegram username matches with set one.<br>");
        throw new Exception("User @{$username} was not found (did not write to bot).<br>");
    }

        logDebug("User was found. Chat ID: {$row['chat_id']}, Username: {$row['username']}");

    $url = "https://api.telegram.org/bot{$token}/sendMessage";

    $data = [
        'chat_id' => $row['chat_id'],
        'text' => $text,
        'parse_mode' => 'HTML'
    ];
    if ($debug === true) {
        logDebug("Sending to URL: " . str_replace($token, '***HIDDEN***', $url));
    }
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);

    $resp = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    if ($resp === false) {
        throw new Exception("cURL Error: " . $curlError);
    }

    if ($httpCode !== 200) {
        throw new Exception("HTTP Error {$httpCode}: " . $resp);
    }

    return json_decode($resp, true);
}

try {
    $result = sendMessageByUsername($pdo, $token, $username, $message);

    if (isset($result['ok']) && $result['ok']) {
        echo "<br>Message was successfully sent!<br>";
    } else {
        echo "\nTelegram error: " . ($result['description'] ?? 'Unknown');
    }
} catch (Exception $e) {
    echo "\n FAILED: " . $e->getMessage() . "<br>";
}
