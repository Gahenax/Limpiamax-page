import sftp from 'ssh2-sftp-client';

const config = {
  host: 'r5l.550.myftpupload.com',
  port: 22,
  username: 'client_7099bf3c0_1103883',
  password: process.env.SFTP_PASSWORD || '',
  readyTimeout: 60000
};

async function fixPermissions() {
  const client = new sftp();
  try {
    await client.connect(config);
    console.log('Fixing permissions in /html...');
    
    // Set 755 for html root itself
    await client.chmod('/html', 0o755);
    
    // List and fix
    const files = await client.list('/html');
    for (const file of files) {
        const remotePath = `/html/${file.name}`;
        if (file.type === 'd') {
            console.log(`Setting 755 for ${remotePath}`);
            await client.chmod(remotePath, 0o755);
        } else {
            console.log(`Setting 644 for ${remotePath}`);
            await client.chmod(remotePath, 0o644);
        }
    }

    await client.end();
  } catch (err) {
    console.error(' Error:', err.message);
  }
}

fixPermissions();
