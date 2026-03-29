import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || ''
};

async function overwriteIndexPhp() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('Attempting to overwrite index.php...');
    const content = "<?php\n// Redirect to static index.html\ninclude 'index.html';\nexit;\n";
    await client.put(Buffer.from(content), '/html/index.php');
    console.log(' index.php overwritten!');
    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

overwriteIndexPhp();
