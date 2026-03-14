import paramiko
import os
from dotenv import load_dotenv

load_dotenv()

def test_connection():
    host = os.getenv('SFTP_HOST')
    port = int(os.getenv('SFTP_PORT'))
    user = os.getenv('SFTP_USER')
    password = os.getenv('SFTP_PASS')

    print(f"Connecting to {host}:{port} as {user}...")
    try:
        transport = paramiko.Transport((host, port))
        transport.connect(username=user, password=password)
        sftp = paramiko.SFTPClient.from_transport(transport)
        
        print("Successfully connected!")
        print("Root directory listing:")
        for file in sftp.listdir('.'):
            print(f"  - {file}")
            
        sftp.close()
        transport.close()
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection()
