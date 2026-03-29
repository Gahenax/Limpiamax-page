import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: 'WM4jgbMFQuQ0UM'
};

async function checkHtaccess() {
  const client = new sftp();
  try {
    await client.connect(config);
    const exists = await client.exists('/html/.htaccess');
    console.log(`.htaccess exists: ${exists}`);
    if (exists) {
        const data = await client.get('/html/.htaccess');
        console.log('--- Content ---');
        console.log(data.toString());
    }
    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

checkHtaccess();
