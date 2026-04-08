<?php
$zipFile = 'limpiamax_standalone_pRO.zip';
$extractTo = './';

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    if ($zip->extractTo($extractTo)) {
        echo 'ZIP extracted successfully to ' . $extractTo;
    } else {
        echo 'Failed to extract ZIP.';
    }
    $zip->close();
} else {
    echo 'Failed to open ZIP file: ' . $zipFile;
}
?>
