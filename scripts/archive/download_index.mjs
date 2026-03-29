import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || ''
};

async function downloadIndexPhp() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('Downloading index.php...');
    const data = await client.get('/html/index.php');
    console.log('--- Content ---');
    console.log(data.toString());
    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

downloadIndexPhp();
