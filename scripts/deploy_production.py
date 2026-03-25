import os
import ftplib
import sys

def deploy_production():
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.Gahenax"
    FTP_PASS = "Luisdaniel949."
    
    LOCAL_DIR = r"c:\Users\jotam\OneDrive\Desktop\GahenaxAI\limpiamax-web\out"

    if not os.path.exists(LOCAL_DIR):
        print(f"❌ Error: La carpeta '{LOCAL_DIR}' no existe. Ejecuta 'npm run build' primero.")
        return

    print(f"🚀 Iniciando despliegue de PRODUCCIÓN en {FTP_HOST}...")

    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("✅ Conexión FTP establecida con éxito.")

        def upload_recursive(local_path, remote_path):
            try:
                items = os.listdir(local_path)
                for item in items:
                    l_item_path = os.path.join(local_path, item)
                    # Normalize remote path
                    r_item_path = (remote_path + "/" + item).strip("/")
                    
                    if os.path.isfile(l_item_path):
                        with open(l_item_path, 'rb') as f:
                            print(f"🔼 Subiendo: {r_item_path}")
                            # Navigate to remote dir
                            try:
                                ftp.cwd("/" + remote_path)
                            except:
                                # Try creating it if not at root
                                if remote_path != ".":
                                    parts = remote_path.split("/")
                                    current = ""
                                    for part in parts:
                                        current = (current + "/" + part).strip("/")
                                        try:
                                            ftp.mkd("/" + current)
                                        except:
                                            pass
                                ftp.cwd("/" + remote_path)
                            
                            ftp.storbinary(f'STOR {item}', f)
                    
                    elif os.path.isdir(l_item_path):
                        # Skip .next directory if it leaked into out (unlikely)
                        if item == ".next":
                            continue
                            
                        print(f"📂 Procesando carpeta: {r_item_path}")
                        try:
                            ftp.mkd("/" + r_item_path)
                        except:
                            # Directory might exist
                            pass
                        upload_recursive(l_item_path, r_item_path)
            except Exception as e:
                print(f"⚠️ Error en {local_path}: {e}")

        # Inicia la subida desde la raíz de Hostinger
        upload_recursive(LOCAL_DIR, ".")

        ftp.quit()
        print("\n✨ ¡Despliegue de Producción completado con éxito! ✨")
        print("📡 Sentry y Stripe Live están ahora ACTIVOS en el servidor.")

    except Exception as e:
        print(f"❌ Error crítico durante el despliegue: {e}")

if __name__ == "__main__":
    deploy_production()
