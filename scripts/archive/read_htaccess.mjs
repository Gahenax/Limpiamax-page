import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: 'WM4jgbMFQuQ0UM',
  readyTimeout: 60000
};

async function readHtaccess() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('Reading .htaccess...');
    const content = await client.get('/html/.htaccess');
    console.log('--- .htaccess CONTENT ---');
    console.log(content.toString());
    await client.end();
  } catch (err) {
    console.error(' Failed to read .htaccess:', err.message);
  }
}

readHtaccess();
