<?php
$dbFile = __DIR__ . '/tg_users.db';


$pdo = new PDO("sqlite:{$dbFile}", null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

echo("DB was connected, check users table...");

// Checking if the table exists
$result = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users';");
$tableExists = $result && $result->fetchColumn();

if (!$tableExists) {
    echo("Users table was not found! Creating table...");
    $createSql = "
        CREATE TABLE users (
            chat_id INTEGER PRIMARY KEY,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ";
    try {
        $pdo->exec($createSql);
        echo("Users table was created.!");
    } catch (PDOException $e) {
        echo("Fatal error while creating the table: " . $e->getMessage());
        exit(1);
    }
} else {
    echo("Users table already exists!.");
}

$pdo->exec("
    CREATE TABLE IF NOT EXISTS bot_state (
        key_name TEXT PRIMARY KEY,
        value    TEXT
    )
");

return $pdo;
