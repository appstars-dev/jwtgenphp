<?php
$logPath = '/tmp/cron_test.log';
//file_put_contents($logPath, date('Y-m-d H:i:s') . " - TGCron Script is running\n", FILE_APPEND);
require ('includes/bootstrap.php');
echo "Token length: " . strlen(EnvIsSet("TG_BOT_TOKEN","","")) . " символов\n";

$scriptDir = __DIR__;
$dbPath = $scriptDir . '/includes/tg_users.db';

function dlog($msg)
{
    global $logPath;
    file_put_contents($logPath, date('H:i:s') . " - {$msg}\n", FILE_APPEND);
}

dlog("=== RUNNING TG CronJOB ===");
dlog("Working directory: " . getcwd());
dlog("DB path: {$dbPath}");
dlog("Is DB already exist? " . (file_exists($dbPath) ? 'YES' : 'NO'));

if (!file_exists($dbPath)) {
    dlog("WARNING: DB file was not found. It will be created during connection.");
} else {
    $size = filesize($dbPath);
    dlog("DB size: {$size} bytes");
    if ($size == 0) {
        dlog("FATAL: DB file is empty! It could be not enough rights for writing SQL.");
        unlink($dbPath);
    }
}

require_once $dbPath;
dlog("DB connection successful.");

$token = EnvIsSet("TG_BOT_TOKEN","","");
$offsetFile = __DIR__ . '/last_offset.txt';

$offset = 0;
if (file_exists($offsetFile)) {
    $offset = (int)file_get_contents($offsetFile);
}

$params = [
    'timeout' => 5,
    'limit' => 100,
];
if ($offset > 0) {
    $params['offset'] = $offset;
}

$url = "https://api.telegram.org/bot".$token."/getUpdates?" . http_build_query($params);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false || $httpCode !== 200) {
    error_log("Telegram error: HTTP {$httpCode}, Response: {$response}");
    exit(1);
}

$data = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON parsing error: " . json_last_error_msg());
    exit(1);
}

if (!isset($data['ok']) || !$data['ok'] || empty($data['result'])) {
    exit(0);
}

$stmt = $pdo->prepare("
    INSERT OR REPLACE INTO users (chat_id, username, first_name, last_name, updated_at) 
    VALUES (:chat_id, :username, :first_name, :last_name, CURRENT_TIMESTAMP)
");

$maxUpdateId = 0;
$processedCount = 0;

foreach ($data['result'] as $update) {
    if (!isset($update['message'])) {
        continue;
    }

    if ($update['update_id'] > $maxUpdateId) {
        $maxUpdateId = $update['update_id'];
    }

    $msg = $update['message'];
    $from = $msg['from'] ?? [];

    if (empty($from['id'])) {
        continue;
    }

    try {
        $stmt->execute([
            ':chat_id' => (int)$from['id'],
            ':username' => $from['username'] ?? null,
            ':first_name' => $from['first_name'] ?? null,
            ':last_name' => $from['last_name'] ?? null,
        ]);
        $processedCount++;
    } catch (PDOException $e) {
        error_log("DB error while saving the user " . ($from['id'] ?? 'unknown') . ": " . $e->getMessage());
    }
}

echo "Received updates: {$processedCount}\n";

// Getting offset
$newOffset = $maxUpdateId + 1;
file_put_contents($offsetFile, $newOffset);
echo "New offset has been saved: {$newOffset}\n";
