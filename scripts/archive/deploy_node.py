import os
import ftplib
import sys

def deploy_node_app():
    # FTP Connection Details (From previous successful script)
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.Gahenax"
    FTP_PASS = "Luisdaniel949."
    
    # Target directory for Node.js app (Change if needed)
    REMOTE_DIR = "limpiamax-node" 
    LOCAL_DIR = r"c:\Users\jotam\OneDrive\Desktop\GahenaxAI\limpiamax-web\.next\standalone"

    print(f"🚀 Iniciando despliegue de Aplicación Node.js en {FTP_HOST}...")

    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("✅ Conexión FTP establecida.")

        # Create and enter remote directory
        try:
            ftp.mkd(REMOTE_DIR)
            print(f"📁 Directorio creado: {REMOTE_DIR}")
        except:
            print(f"📂 El directorio {REMOTE_DIR} ya existe o no se pudo crear.")
        
        ftp.cwd(REMOTE_DIR)

        def upload_directory(local_path, remote_path):
            try:
                for item in os.listdir(local_path):
                    l_item_path = os.path.join(local_path, item)
                    
                    if os.path.isfile(l_item_path):
                        with open(l_item_path, 'rb') as f:
                            print(f"📤 Subiendo: {os.path.join(remote_path, item)}")
                            ftp.storbinary(f'STOR {item}', f)
                    elif os.path.isdir(l_item_path):
                        try:
                            ftp.mkd(item)
                        except:
                            pass
                        ftp.cwd(item)
                        upload_directory(l_item_path, os.path.join(remote_path, item))
                        ftp.cwd('..')
            except Exception as e:
                print(f"⚠️ Error procesando {local_path}: {e}")

        # Start recursive upload
        print(f"⏳ Subiendo archivos desde {LOCAL_DIR}...")
        upload_directory(LOCAL_DIR, "")

        ftp.quit()
        print("\n" + "="*50)
        print("🎉 ¡Archivos subidos con éxito!")
        print("Próximos pasos en Hostinger:")
        print(f"1. Ve a tu panel de Hostinger -> Aplicación Node.js")
        print(f"2. Configura la raíz de la aplicación como: /{REMOTE_DIR}")
        print(f"3. Configura el archivo de inicio como: server.js")
        print(f"4. Asegúrate de añadir las variables de entorno (STRIPE_SECRET_KEY, etc.)")
        print(f"5. Haz clic en 'Iniciar' o 'Reiniciar'")
        print("="*50)

    except Exception as e:
        print(f"❌ Error crítico durante el despliegue: {e}")

if __name__ == "__main__":
    deploy_node_app()
