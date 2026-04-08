<?php
/**
 * Gahenax Admin Node Setup
 * Crea la estructura fisica para el nodo administrativo aislado
 */
$dir = __DIR__ . '/admin';

if (!file_exists($dir)) {
    if (mkdir($dir, 0755, true)) {
        echo "[SUCCESS] Carpeta /admin creada exitosamente.\n";
    } else {
        echo "[ERROR] No se pudo crear la carpeta /admin.\n";
    }
} else {
    echo "[INFO] La carpeta /admin ya existe.\n";
}

// Tambien creamos la carpeta para assets e includes
@mkdir($dir . '/includes', 0755, true);
@mkdir($dir . '/assets', 0755, true);

echo "[DONE] Estructura de Nodo lista.";
?>
