import os
import ftplib
import sys

def deploy_to_production():
    # FTP Connection Details
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.limpiamaxbarcelona.com"
    FTP_PASS = "Luisdaniel949."
    LOCAL_DIR = r"C:\Users\jotam\OneDrive\Desktop\GahenaxAI\limpiamax-web\out"

    print(f"🚀 Iniciando despliegue en PRODUCCIÓN: {FTP_HOST}")
    print(f"👤 Usuario: {FTP_USER}")

    if not os.path.exists(LOCAL_DIR):
        print(f"❌ Error: La carpeta local {LOCAL_DIR} no existe.")
        return

    try:
        # Connect to FTP
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("✅ Conexión establecida correctamente.")

        # Navigate to public_html
        try:
            ftp.cwd('public_html')
            print("📁 Entrando en public_html...")
        except Exception as e:
            print(f"⚠️ No se pudo entrar en public_html, intentando en la raíz... ({e})")

        def upload_directory(local_path):
            for item in os.listdir(local_path):
                l_item_path = os.path.join(local_path, item)
                if os.path.isfile(l_item_path):
                    with open(l_item_path, 'rb') as f:
                        print(f"  ⬆️ Subiendo: {item}")
                        try:
                            ftp.storbinary(f'STOR {item}', f)
                        except Exception as e:
                            print(f"  ❌ Error subiendo {item}: {e}")
                elif os.path.isdir(l_item_path):
                    if item in ['.git', 'node_modules']: continue
                    print(f"  📂 Creando directorio: {item}")
                    try:
                        ftp.mkd(item)
                    except:
                        pass # Ya existe
                    
                    current_dir = ftp.pwd()
                    ftp.cwd(item)
                    upload_directory(l_item_path)
                    ftp.cwd(current_dir)

        # Iniciar subida recursiva
        upload_directory(LOCAL_DIR)

        ftp.quit()
        print("\n✨ ¡DESPLIEGUE COMPLETADO! ✨")
        print(f"🌐 La web ya debería estar LIVE en: https://limpiamaxbarcelona.com")

    except Exception as e:
        print(f"❌ Error crítico durante el despliegue: {e}")

if __name__ == "__main__":
    deploy_to_production()
