import os
import ftplib

def deep_inspect():
    FTP_HOST = "212.1.209.105"
    # Using the primary user provided in the screenshot
    FTP_USER = "u314799704.Gahenax" 
    FTP_PASS = os.getenv("FTP_PASS")
    
    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS or "")
        print(f"✅ Conectado como {FTP_USER}")
        
        print("\n--- Directorio Actual ---")
        ftp.retrlines('LIST')
        
        print("\n--- Intentando subir un nivel (cdup) ---")
        try:
            ftp.cwd("..")
            print("Escapado del root. Nuevo directorio:")
            ftp.retrlines('LIST')
        except:
            print("Acceso restringido al directorio actual.")
            
        print("\n--- Buscando 'public_html' ---")
        try:
            ftp.cwd('public_html')
            print("Entré en public_html!")
            ftp.retrlines('LIST')
        except:
            print("No hay public_html en este nivel.")
            
        ftp.quit()
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    deep_inspect()
