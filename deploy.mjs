import sftp from 'ssh2-sftp-client';
import path from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: 'WM4jgbMFQuQ0UM',
  retries: 3,
  retry_factor: 2,
  retry_minTimeout: 2000
};

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
