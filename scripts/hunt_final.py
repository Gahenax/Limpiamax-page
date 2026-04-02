import paramiko
import os

env_path = 'c:/Users/jotam/OneDrive/Desktop/GahenaxAI/limpiamax-web/.env'
creds = {}
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, _, v = line.partition('=')
            creds[k.strip()] = v.strip()

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('151.106.106.26', port=65002, username='u314799704', password=creds.get('FTP_PASS',''), timeout=20)

print("--- EXAMINING ALL .htaccess FILES FOR STRIPE_SECRET_KEY ---")
stdin, stdout, stderr = client.exec_command('find ~/domains -name ".htaccess" -exec grep -l "STRIPE_SECRET_KEY" {} \;')
found_files = stdout.read().decode().strip().splitlines()

for f in found_files:
    print(f"\n--- {f} ---")
    stdin, stdout, stderr = client.exec_command(f'cat {f}')
    print(stdout.read().decode())

print("\n--- CHECKING IF .next IS BAKED WITH THE OLD KEY IN ALL DOMAINS ---")
old_key_frag = '7sU5d'
stdin, stdout, stderr = client.exec_command(f'grep -r "{old_key_frag}" ~/domains/')
print(stdout.read().decode())

client.close()
