<?php
/**
 * Gahenax Admin Node - Isolated Config
 * Carga las variables del .env de forma segura para el motor PHP
 */
session_start();

function loadEnv($path) {
    if(!file_exists($path)) return false;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim($name) . "=" . trim($value));
        $_ENV[trim($name)] = trim($value);
    }
}

// Subir un nivel para encontrar el .env del proyecto principal
loadEnv(__DIR__ . '/../.env');

// Configuración Global del Nodo Admin
define('ADMIN_USER', getenv('ADMIN_USER') ?: 'GahenaxAdmin');
define('ADMIN_PIN', getenv('ADMIN_PIN') ?: 'gahenax2026');
define('GOOGLE_KEY_PATH', __DIR__ . '/../service-account-key.json');
define('SHEET_ID_ORDERS', getenv('GOOGLE_SHEET_ID_SALES'));

// Sistema de Protección de Sesión
function checkAuth($redirect = 'login.php') {
    if (!isset($_SESSION['gahenax_authenticated'])) {
        header('Location: ' . $redirect);
        exit;
    }
}
?>
