<?php
require_once 'includes/bootstrap.php';
require_once __DIR__ . '/includes/tg_db.php';

$logPath = '/tmp/cron_test.log';
file_put_contents($logPath, date('Y-m-d H:i:s') . " - TGCron Script START\n", FILE_APPEND);


logDebug("=== RUNNING TG CronJOB ===");
logDebug("Working directory: " . getcwd());

echo "Token length: " . strlen(EnvIsSet("TG_BOT_TOKEN", "", "")) . " symbols\n";

try {
    $dbConfigPath = __DIR__ . '/includes/tg_db.php';

    if (!file_exists($dbConfigPath)) {
        logDebug("FATAL: includes/tg_db.php not found! Cannot connect to DB.");
        exit(1);
    }

    require $dbConfigPath;

    // Проверка: переменная $pdo должна появиться в глобальной области
    if (!isset($pdo) || !$pdo instanceof PDO) {
        logDebug("FATAL: \$pdo is not created after loading tg_db.php.");
        exit(1);
    }

    logDebug("DB connection successful. PDO instance ready.");

    $actualDbPath = dirname(__DIR__) . '/includes/tg_users.db';

} catch (Exception $e) {
    logDebug("DB Connection Error: " . $e->getMessage());
    logDebug($e->getTraceAsString());
    exit(1);
}

$token = EnvIsSet("TG_BOT_TOKEN", "", "");
if (empty($token)) {
    logDebug("ERROR: TG_BOT_TOKEN is empty!");
    exit(1);
}

$offsetFile = __DIR__ . '/last_offset.txt';
$offset = 0;
if (file_exists($offsetFile)) {
    $offset = (int)file_get_contents($offsetFile);
}

$params = ['timeout' => 5, 'limit' => 100];
if ($offset > 0) {
    $params['offset'] = $offset;
}

$url = "https://api.telegram.org/bot" . $token . "/getUpdates?" . http_build_query($params);
logDebug("Requesting updates...");

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    logDebug("Telegram error: HTTP {$httpCode}, Response: {$response}");
    exit(1);
}

$data = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    logDebug("JSON parsing error: " . json_last_error_msg());
    exit(1);
}

if (!isset($data['ok']) || !$data['ok'] || empty($data['result'])) {
    logDebug("No updates.");
    exit(0);
}

// Теперь $pdo точно существует!
$stmt = $pdo->prepare("
    INSERT OR REPLACE INTO users (chat_id, username, first_name, last_name, updated_at) 
    VALUES (:chat_id, :username, :first_name, :last_name, CURRENT_TIMESTAMP)
");

$maxUpdateId = 0;
$processedCount = 0;

foreach ($data['result'] as $update) {
    if (!isset($update['message'])) continue;
    if ($update['update_id'] > $maxUpdateId) $maxUpdateId = $update['update_id'];

    $msg = $update['message'];
    $from = $msg['from'] ?? [];
    if (empty($from['id'])) continue;

    try {
        $stmt->execute([
            ':chat_id' => (int)$from['id'],
            ':username' => $from['username'] ?? null,
            ':first_name' => $from['first_name'] ?? null,
            ':last_name' => $from['last_name'] ?? null,
        ]);
        $processedCount++;
    } catch (PDOException $e) {
        logDebug("DB error saving user {$from['id']}: " . $e->getMessage());
    }
}

logDebug("Processed: {$processedCount} updates.");

$newOffset = $maxUpdateId + 1;
file_put_contents($offsetFile, $newOffset);
logDebug("New offset: {$newOffset}");

echo "Done. Processed: {$processedCount}\n";
