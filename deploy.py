import paramiko
import os
from dotenv import load_dotenv
import time

load_dotenv()

def deploy():
    host = os.getenv('SFTP_HOST')
    port = int(os.getenv('SFTP_PORT'))
    user = os.getenv('SFTP_USER')
    password = os.getenv('SFTP_PASS')
    local_dir = 'out'

    print(f"🚀 Iniciando despliegue en {host} (Modo Compatibilidad)...")
    
    try:
        # Forzar algoritmos que GoDaddy suele aceptar
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Ajustar algoritmos para evitar EOFError
        ssh.connect(
            host, 
            port=port, 
            username=user, 
            password=password, 
            look_for_keys=False, 
            allow_agent=False,
            disabled_algorithms={'pubkeys': ['rsa-sha2-256', 'rsa-sha2-512']}
        )
        
        sftp = ssh.open_sftp()
        print("✅ Conexión SFTP establecida con éxito.")
        
        # Navegar al directorio correcto
        try:
            sftp.chdir('html')
            print("📁 Directorio remoto: /html")
        except:
            print("📁 Directorio remoto: /")

        def upload_dir(local_path, remote_subpath):
            files = os.listdir(local_path)
            for item in files:
                l_path = os.path.join(local_path, item)
                r_path = (remote_subpath + '/' + item).strip('/')
                
                if os.path.isdir(l_path):
                    try:
                        sftp.mkdir(r_path)
                    except:
                        pass
                    upload_dir(l_path, r_path)
                else:
                    print(f"📤 Subiendo: {r_path}")
                    sftp.put(l_path, r_path)

        upload_dir(local_dir, '')
        
        sftp.close()
        ssh.close()
        print("🎉 ¡TODO SUBIDO! La web de Limpia MAX ya debería estar online.")
        
    except Exception as e:
        import traceback
        print(f"❌ Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    deploy()
