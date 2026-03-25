import os
import ftplib

def list_ftp():
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.Gahenax"
    FTP_PASS = os.getenv("FTP_PASS")
    
    print(f"🔍 Listando contenido FTP en {FTP_HOST}...")
    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS or "")
        
        print("\n--- Directorio Raíz ---")
        ftp.retrlines('LIST')
        
        # Intentar entrar en carpetas de interés
        folders = ['public_html', 'servicios', 'gracias']
        for folder in folders:
            print(f"\n--- Contenido de '{folder}' ---")
            try:
                ftp.cwd(folder)
                ftp.retrlines('LIST')
                ftp.cwd('..')
            except Exception as e:
                print(f"❌ No se pudo acceder a '{folder}': {e}")
                
        ftp.quit()
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    list_ftp()
