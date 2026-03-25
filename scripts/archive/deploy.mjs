import sftp from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  host: process.env.SFTP_HOST || 'r5l.550.myftpupload.com',
  port: parseInt(process.env.SFTP_PORT || '22'),
  username: process.env.SFTP_USER || 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || 'WM4jgbMFQuQ0UM',
  readyTimeout: 60000, // Even more timeout
  retries: 5,
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
      // Renombrar index.php si existe para evitar que WordPress tome el control
        const remoteFiles = await client.list(remoteDir);
        for (const file of remoteFiles) {
            if (file.name === 'index.php') {
                console.log('🔄 Renombrando index.php detectado...');
                const remotePath = `${remoteDir}/${file.name}`.replace(/\\/g, '/');
                const newPath = `${remoteDir}/${file.name}.bak`.replace(/\\/g, '/');
                await client.rename(remotePath, newPath);
                console.log(`✅ ${file.name} renombrado a ${file.name}.bak`);
            }
        }
    } catch (err) {
        console.log('ℹ️ No se pudo procesar index.php:', err.message);
    }

    // Intentar borrar index.html antes de subir para asegurar sobrescritura
    try {
        console.log('🗑️ Intentando borrar index.html antiguo...');
        await client.delete(`${remoteDir}/index.html`.replace(/\\/g, '/'));
        console.log('✅ index.html antiguo borrado.');
    } catch (err) {
        console.log('ℹ️ No se pudo borrar index.html (posiblemente no existe o está bloqueado):', err.message);
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
