import os
import ftplib

def deploy_static_to_hostinger():
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.Gahenax"
    FTP_PASS = "Luisdaniel949."
    
    LOCAL_DIR = r"c:\Users\jotam\OneDrive\Desktop\GahenaxAI\limpiamax-web\out"

    print(f"Iniciando despliegue STATIC en Hostinger ({FTP_HOST})...")

    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print("Conexion FTP establecida.")

        def upload_directory(local_path, remote_path):
            try:
                items = os.listdir(local_path)
                for item in items:
                    l_item_path = os.path.join(local_path, item)
                    r_item_path = (remote_path + "/" + item).strip("/")
                    
                    if os.path.isfile(l_item_path):
                        with open(l_item_path, 'rb') as f:
                            print(f"Subiendo: {r_item_path}")
                            # Asegurarse de estar en el directorio correcto
                            ftp.cwd("/" + remote_path)
                            ftp.storbinary(f'STOR {item}', f)
                    elif os.path.isdir(l_item_path):
                        try:
                            ftp.mkd("/" + r_item_path)
                            print(f"Creado: {r_item_path}")
                        except:
                            pass
                        upload_directory(l_item_path, r_item_path)
            except Exception as e:
                print(f"Error en {local_path}: {e}")

        # Start recursive upload to current directory (should be public_html by default for this user)
        print(f"Syncing legacy static content to current directory...")
        upload_directory(LOCAL_DIR, ".")

        ftp.quit()
        print("\nDespliegue completado con exito!")

    except Exception as e:
        print(f"Error critico: {e}")

if __name__ == "__main__":
    deploy_static_to_hostinger()
