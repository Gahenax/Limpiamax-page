import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || '',
  readyTimeout: 60000
};

async function checkSize() {
  const client = new sftp();
  try {
    await client.connect(config);
    const stat = await client.stat('/html/index.html');
    console.log(`Remote /html/index.html size: ${stat.size} bytes`);
    
    // Check if there's an index.html in the root /
    try {
        const statRoot = await client.stat('/index.html');
        console.log(`Remote /index.html size: ${statRoot.size} bytes`);
    } catch {}

    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

checkSize();
