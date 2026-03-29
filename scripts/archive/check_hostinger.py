import os
import ftplib

def list_hostinger():
    FTP_HOST = "212.1.209.105"
    FTP_USER = "u314799704.Gahenax"
    FTP_PASS = os.getenv("FTP_PASS")

    print(f"Connecting to {FTP_HOST}...")
    try:
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        print(" Login success!")
        
        print("\n--- Root Directory ---")
        ftp.dir("/")
        
        try:
            print("\n--- public_html ---")
            ftp.dir("/public_html")
        except Exception as e:
            print(f"Error listing public_html: {e}")

        ftp.quit()
    except Exception as e:
        print(f" Error: {e}")

if __name__ == "__main__":
    list_hostinger()
