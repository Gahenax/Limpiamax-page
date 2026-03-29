import sftp from 'ssh2-sftp-client';
import path from 'path';
import { fileURLToPath } from 'url';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: 'WM4jgbMFQuQ0UM',
  readyTimeout: 60000
};

async function inspect() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('--- ROOT / ---');
    const root = await client.list('/');
    console.table(root.map(f => ({ name: f.name, type: f.type })));
    
    // Check if there is a public_html or similar
    const webRootFound = root.find(f => f.name === 'html' || f.name === 'public_html' || f.name === 'www');
    if (webRootFound) {
        console.log(`--- WEB ROOT /${webRootFound.name} ---`);
        const files = await client.list(`/${webRootFound.name}`);
        console.table(files.map(f => ({ name: f.name, type: f.type })));
        
        // Check for index.php explicitly
        const hasPHP = files.find(f => f.name === 'index.php');
        console.log(`index.php exists: ${!!hasPHP}`);
        
        const hasHTML = files.find(f => f.name === 'index.html');
        console.log(`index.html exists: ${!!hasHTML}`);
    }

    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

inspect();
