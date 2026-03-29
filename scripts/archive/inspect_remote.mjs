import sftp from 'ssh2-sftp-client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  host: process.env.SFTP_HOST || 'r5l.550.myftpupload.com',
  port: parseInt(process.env.SFTP_PORT || '22'),
  username: process.env.SFTP_USER || 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || 'WM4jgbMFQuQ0UM',
  readyTimeout: 60000
};

async function inspect() {
  const client = new sftp();
  try {
    console.log(' Conectando...');
    await client.connect(config);
    console.log(' Conectado.');
    
    console.log('Listing root /:');
    const root = await client.list('/');
    console.table(root.map(f => ({ name: f.name, type: f.type })));
    
    if (root.find(f => f.name === 'html')) {
        console.log('Listing /html:');
        const html = await client.list('/html');
        console.table(html.map(f => ({ name: f.name, type: f.type })));
    }

    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

inspect();
