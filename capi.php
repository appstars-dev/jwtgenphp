<?php
function teleapi($token, $chat_id, $text)
{
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $text,
        'parse_mode' => 'HTML'
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    return file_get_contents($url, false, $context);
}

function shortenLink(string $apiUrl, string $longUrl, string $apiKey): array
{
    if (!filter_var($longUrl, FILTER_VALIDATE_URL)) {
        throw new Exception('Incorrect format. Link have to begin with http:// or https://');
    }

    $ch = curl_init($apiUrl);

    $payload = json_encode(['url' => $longUrl]);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'X-API-KEY: ' . $apiKey
        ],
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);

    if ($error !== '') {
        throw new Exception('cURL Error: ' . $error);
    }

    $result = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Can not recognise server response. RAW data: ' . $response);
    }

    // Проверка на ошибки по HTTP коду или полю error в ответе
    if ($httpCode !== 200) {
        $message = $result['error'] ?? 'Unknown server error';
        throw new Exception("API Error (HTTP {$httpCode}): {$message}");
    }

    // Если всё ок, возвращаем данные
    if (!isset($result['short_url']) || !isset($result['short_code'])) {
        throw new Exception('Unexpected response format');
    }

    return [
        'long_url'  => $result['long_url'] ?? $longUrl,
        'short_url' => $result['short_url'],
        'short_code'=> $result['short_code']
    ];
}