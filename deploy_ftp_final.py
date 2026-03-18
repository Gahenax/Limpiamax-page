import os
import ftplib
from pathlib import Path

def deploy_to_ftp():
    # FTP Connection Details
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.gahenaxaisolutions.xyz"
    FTP_PASS = "Luisdaniel949."
    REMOTE_DIR = "public_html"
    LOCAL_DIR = r"c:\Users\jotam\OneDrive\Desktop\GahenaxAI\limpiamax-web\out"

    print(f"🚀 Iniciando despliegue FTP en {FTP_HOST}...")

    try:
        # Connect to FTP
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("✅ Conexión FTP establecida.")

        # List remote root
        print("📁 Listando directorio raíz remoto (.):")
        try:
            items = []
            ftp.retrlines('LIST', items.append)
            for item in items: print(f"  - {item}")
        except Exception as e: print(f"❌ Error al listar: {e}")

        # List parent directory (..)
        print("📁 Listando directorio padre (..):")
        try:
            items = []
            ftp.cwd('..')
            ftp.retrlines('LIST', items.append)
            for item in items: print(f"  - {item}")
            ftp.cwd('u314799704.gahenaxaisolutions.xyz') # Regresar a la carpeta de usuario si es necesario
        except Exception as e: print(f"❌ Error al listar padre: {e}")

        # Navigate to target directory if found
        potential_dirs = ["public_html", "www", "html", "."]
        found_dir = None
        for d in potential_dirs:
            try:
                ftp.cwd(d)
                found_dir = d
                print(f"📂 Entrando en: {d}")
                break
            except:
                continue

        if not found_dir:
            print("❌ No se encontró un directorio de despliegue estándar.")
            ftp.quit()
            return

        def upload_directory(local_path, remote_path):
            for item in os.listdir(local_path):
                l_item_path = os.path.join(local_path, item)
                if os.path.isfile(l_item_path):
                    with open(l_item_path, 'rb') as f:
                        print(f"📤 Subiendo archivo: {item}")
                        ftp.storbinary(f'STOR {item}', f)
                elif os.path.isdir(l_item_path):
                    try:
                        ftp.mkd(item)
                    except ftplib.error_perm:
                        # Directory already exists
                        pass
                    ftp.cwd(item)
                    upload_directory(l_item_path, item)
                    ftp.cwd('..')

        # Start recursive upload
        upload_directory(LOCAL_DIR, "")

        ftp.quit()
        print("🎉 ¡Despliegue completado con éxito! La web ya debería estar online en gahenaxaisolutions.xyz")

    except Exception as e:
        print(f"❌ Error durante el despliegue: {e}")

if __name__ == "__main__":
    deploy_to_ftp()
