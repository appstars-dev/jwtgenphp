<?php
$rootDir = dirname(__DIR__);

if (file_exists($rootDir . '/includes/bootstrap.php')) {
    require_once $rootDir . '/includes/bootstrap.php';
} elseif (file_exists($rootDir . '/bootstrap.php')) {
    require_once $rootDir . '/bootstrap.php';
}

$debug = EnvIsSet("DEBUG_MODE", "", false);

$dbFile = $rootDir . '/includes/tg_users.db';

try {
    // Вот эта строка создает соединение и файл БД, если его нет:
    $pdo = new PDO("sqlite:{$dbFile}", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    if ($debug) echo "DB connected: {$dbFile}\n";

    // Создаем таблицу, если её нет
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            chat_id INTEGER PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS bot_state (
            key_name TEXT PRIMARY KEY,
            value    TEXT
        )
    ");

} catch (PDOException $e) {
    error_log("DB Error: " . $e->getMessage());
    throw $e;
}
