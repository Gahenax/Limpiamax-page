<?php
require_once 'config.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pin = $_POST['pin'] ?? '';

    if ($user === ADMIN_USER && $pin === ADMIN_PIN) {
        $_SESSION['gahenax_authenticated'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Credenciales del Nodo Inválidas';
    }
}
?>
<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Seguro | Gahenax Node</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center font-sans">

    <div class="bg-gray-800 p-10 rounded-3xl border border-gray-700 w-full max-w-md shadow-2xl">
        <div class="mb-8 text-center">
            <div class="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4">L</div>
            <h1 class="text-2xl font-bold">Admin Console</h1>
            <p class="text-gray-400 text-sm mt-2">Nodo de Gestión Independiente (PHP)</p>
        </div>

        <?php if ($error): ?>
            <div class="bg-red-900/30 border border-red-800 text-red-400 p-4 rounded-xl mb-6 text-sm">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>

        <form method="POST" class="flex flex-col gap-5">
            <div>
                <label class="block text-gray-400 text-xs uppercase font-bold mb-2 ml-1">Administrador</label>
                <input type="text" name="username" required class="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-mono">
            </div>
            <div>
                <label class="block text-gray-400 text-xs uppercase font-bold mb-2 ml-1">Pin de Seguridad</label>
                <input type="password" name="pin" required class="w-full bg-gray-900 border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-mono">
            </div>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 mt-2">
                Conectar al Nodo
            </button>
        </form>

        <footer class="mt-10 text-center">
            <p class="text-xs text-gray-500">Gahenax AI Solutions © 2026</p>
        </footer>
    </div>

</body>
</html>
