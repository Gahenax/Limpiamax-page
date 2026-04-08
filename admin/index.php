<?php
require_once 'config.php';
require_once 'includes/google_sheets.php';
checkAuth(); 

// 1. Obtener Token de Google
$accessToken = getGoogleAccessToken(GOOGLE_KEY_PATH);

// 2. Obtener Datos de la Hoja de Ventas (Rango A2:Z100 por ejemplo)
$ordersData = getSheetData(SHEET_ID_ORDERS, 'Hoja1!A2:Z100', $accessToken);

// 3. Procesar Estadísticas Básicas
$totalOrders = count($ordersData);
$totalRevenue = 0;
foreach($ordersData as $row) {
    // Supongamos que la columna del precio es la 5 (ajustar segun realidad)
    $cleanPrice = str_replace(['€', '$', ','], '', $row[5] ?? '0');
    $totalRevenue += (float)$cleanPrice;
}

?>
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Limpiamax Admin | Datos Reales</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen font-sans">

    <!-- Sidebar Mini -->
    <nav class="fixed top-0 left-0 h-full w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-6 gap-8">
        <div class="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">L</div>
    </nav>

    <!-- Main Content -->
    <main class="ml-20 p-8">
        <header class="flex justify-between items-center mb-10">
            <div>
                <h1 class="text-3xl font-bold">Panel de Gestión Real</h1>
                <p class="text-gray-400 text-sm mt-1">Conectado a Google Sheets: <?php echo SHEET_ID_ORDERS; ?></p>
            </div>
            <div class="flex gap-4">
                <span class="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs font-mono border border-green-800/50">LIVE_SYNC_OK</span>
            </div>
        </header>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div class="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <p class="text-gray-400 text-sm">Pedidos en Hoja de Google</p>
                <p class="text-4xl font-bold mt-2"><?php echo $totalOrders; ?></p>
            </div>
            <div class="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/30">
                <p class="text-indigo-400 text-sm">Ingresos Totales Registrados</p>
                <p class="text-4xl font-bold mt-2 text-indigo-100">€<?php echo number_format($totalRevenue, 2); ?></p>
            </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div class="p-6 border-b border-gray-700">
                <h2 class="font-bold text-lg">Historial de Pedidos Real-Time</h2>
            </div>
            <div class="p-0 overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="text-gray-500 uppercase text-xs border-b border-gray-700 bg-gray-850">
                            <th class="px-6 py-4">Fecha</th>
                            <th class="px-6 py-4">Cliente</th>
                            <th class="px-6 py-4">Servicio</th>
                            <th class="px-6 py-4">Precio</th>
                            <th class="px-6 py-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                        <?php if (empty($ordersData)): ?>
                            <tr><td colspan="5" class="p-10 text-center text-gray-500 italic">No se encontraron pedidos en la hoja de Google.</td></tr>
                        <?php else: ?>
                            <?php foreach(array_slice($ordersData, 0, 20) as $order): ?>
                            <tr class="hover:bg-gray-750 transition-colors">
                                <td class="px-6 py-4 font-mono text-gray-400"><?php echo htmlspecialchars($order[0] ?? '--'); ?></td>
                                <td class="px-6 py-4 font-bold"><?php echo htmlspecialchars($order[1] ?? '--'); ?></td>
                                <td class="px-6 py-4"><?php echo htmlspecialchars($order[4] ?? '--'); ?></td>
                                <td class="px-6 py-4 text-indigo-400"><?php echo htmlspecialchars($order[5] ?? '--'); ?></td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 rounded-md text-[10px] bg-gray-700 text-gray-300">REGISTRADO</span>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

</body>
</html>
