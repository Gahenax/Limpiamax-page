import sftp from 'ssh2-sftp-client';

const config = {
  host: '212.1.209.105',
  port: 21, // Probablemente FTP estándar, no SFTP
  user: 'u314799704.Gahenax',
  password: process.env.FTP_PASS
};

// Como ssh2-sftp-client es para SFTP (puerto 22), 
// y los datos parecen ser de FTP (puerto 21), 
// usaré una librería de FTP o simplemente probaré con SFTP primero por si acaso.
// Pero la IP y usuario son típicos de Hostinger FTP.

import ftp from 'basic-ftp';

async function listHostinger() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "212.1.209.105",
            user: "u314799704.Gahenax",
            password: process.env.FTP_PASS,
            secure: false
        });
        console.log("✅ Conectado a Hostinger!");
        console.log(await client.list("/"));
        
        // Intentar ver si existe public_html
        try {
            console.log("--- public_html content ---");
            console.log(await client.list("/public_html"));
        } catch (e) {
            console.log("public_html no encontrado en la raíz.");
        }

    } catch (err) {
        console.error("❌ Error:", err.message);
    }
    client.close();
}

listHostinger();
