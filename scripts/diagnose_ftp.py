import os
import ftplib
import socket

def test_credentials():
    FTP_HOST = "212.1.209.105"
    users = [
        "u314799704.gahenaxaisolutions.xyz",
        "u314799704.Gahenax"
    ]
    PASSWORD = os.getenv("FTP_PASS")
    
    for user in users:
        print(f"Testing {user}...")
        try:
            ftp = ftplib.FTP(timeout=5)
            ftp.connect(FTP_HOST, 21)
            ftp.login(user, PASSWORD or "")
            print(f"✅ SUCCESS: {user}")
            print("Current directory:", ftp.pwd())
            print("Contents:")
            ftp.retrlines('LIST')
            ftp.quit()
        except socket.timeout:
            print(f"❌ TIMEOUT: {user}")
        except Exception as e:
            print(f"❌ FAIL: {user} - {e}")

if __name__ == "__main__":
    test_credentials()
