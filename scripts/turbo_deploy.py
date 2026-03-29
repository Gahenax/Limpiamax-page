import os
import ftplib
import glob

# Gahenax Turbo Deploy v1.4 (Fase 11: Inyeccion Estricta de Manifiestos con Hardening)

FTP_HOST = os.getenv("FTP_HOST", "151.106.106.26")
FTP_USER = os.getenv("FTP_USER")
FTP_PASS = os.getenv("FTP_PASS")
REMOTE_DIR = os.getenv("FTP_REMOTE_DIR", "public_html")

def connect():
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(user=FTP_USER, passwd=FTP_PASS)
    return ftp

def ensure_remote_dir(ftp, remote_path):
    parts = remote_path.split('/')
    ftp.cwd("/")
    ftp.cwd(REMOTE_DIR)
    for part in parts:
        if not part: continue
        try:
            ftp.mkd(part)
        except:
            pass
        try:
            ftp.cwd(part)
        except:
            pass

def upload_file(ftp, local_path, remote_path):
    remote_path = remote_path.replace("\\", "/")
    print(f"  - [SYNC-MANIFEST] {remote_path}")
    ensure_remote_dir(ftp, os.path.dirname(remote_path))
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {os.path.basename(remote_path)}", f)

if __name__ == "__main__":
    ftp = connect()
    try:
        print("Iniciando Fase 11: Restauracion Estricta de Manifiestos...")
        
        # 1. Encontrar todos los manifiestos JSON en .next
        manifests = []
        
        # Archivos json en la raiz de .next
        for f in glob.glob(".next/*.json"):
            manifests.append(f)
            
        # Archivos json en .next/server (recursivo)
        for root, dirs, files in os.walk(".next/server"):
            for f in files:
                if f.endswith(".json"):
                    manifests.append(os.path.join(root, f))
        
        for local_file in manifests:
            # Si el hostinger lee el standalone, tambien subimos ahi? Mapeemos ambos para seguridad
            remote_regular = local_file # ej: .next/routes-manifest.json
            upload_file(ftp, local_file, remote_regular)
            
            # Tambien los ponemos en standalone por si Hostinger ejecuta server.js desde ahi
            if os.path.exists(".next/standalone"):
                # el standalone tiene la estructura .next/standalone/.next/...
                remote_standalone = ".next/standalone/" + local_file
                upload_file(ftp, local_file, remote_standalone)
            
        print("Inyeccion de Manifiestos Completada.")
    finally:
        ftp.quit()
