import sftp from 'ssh2-sftp-client';
import path from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  host: process.env.SFTP_HOST || 'r5l.550.myftpupload.com',
  port: parseInt(process.env.SFTP_PORT || '22'),
  username: process.env.SFTP_USER || 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || 'WM4jgbMFQuQ0UM',
  privateKey: process.env.SFTP_KEY,
  retries: 3,
  retry_factor: 2,
  retry_minTimeout: 2000
};

// Si hay una clave privada en el archivo local y no viene por env, cargarla (para uso local)
if (!config.privateKey && !config.password) {
    try {
        const keyPath = path.join(__dirname, 'limpiamax_key');
        if (fs.existsSync(keyPath)) {
            config.privateKey = fs.readFileSync(keyPath);
        }
    } catch {
        console.log('ℹ️ No se encontró clave privada local, usando contraseña.');
    }
}

const client = new sftp();

async function deploy() {
  const localDir = path.join(__dirname, 'out');
  const remoteDir = '/html'; // Use absolute path to bypass symlink issues

  try {
    console.log('🚀 Iniciando despliegue de Limpia MAX...');
    console.log(`📂 Conectando a ${config.host} como ${config.username}...`);
    
    await client.connect(config);
    console.log('✅ Conexión SFTP establecida con éxito.');

    // Rename existing index.php if it exists to allow index.html to take priority
    try {
      if (await client.exists('./html/index.php')) {
        console.log('🔄 Renombrando index.php antiguo de WordPress...');
        await client.rename('./html/index.php', './html/index.php.bak');
      }
    } catch {
      console.log('⚠️ No se pudo renombrar index.php (posiblemente ya no existe).');
    }

    console.log(`📤 Subiendo contenido de ${localDir} a ${remoteDir}...`);
    
    // Upload the entire directory recursively
    await client.uploadDir(localDir, remoteDir);

    console.log('✨ ¡Despliegue completado con éxito!');
  } catch (err) {
    console.error('❌ Error durante el despliegue:', err.message);
    if (err.message.includes('authentication')) {
      console.log('💡 Sugerencia: Asegúrate de que la clave SSH haya sido vinculada correctamente en el panel de GoDaddy.');
    }
  } finally {
    await client.end();
  }
}

deploy();
