import sftp from 'ssh2-sftp-client';
import { Readable } from 'stream';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: 'WM4jgbMFQuQ0UM',
  readyTimeout: 60000
};

async function testWrite() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('Testing write to index.php...');
    const content = "<?php include 'index.html'; ?>";
    const stream = Readable.from([content]);
    await client.put(stream, '/html/index.php');
    console.log('✅ Successfully overwrote index.php');
    await client.end();
  } catch (err) {
    console.error('❌ Failed to overwrite index.php:', err.message);
  }
}

testWrite();
