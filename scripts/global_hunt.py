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

old_key_frag = '7sU5d'
new_key_frag = 'BVajm'

print(f"--- HUNTING OLD KEY ({old_key_frag}) ---")
stdin, stdout, stderr = client.exec_command(f'grep -rn "{old_key_frag}" ~ --exclude-dir=node_modules --exclude-dir=.git')
print(stdout.read().decode())

print(f"--- HUNTING NEW KEY ({new_key_frag}) ---")
stdin, stdout, stderr = client.exec_command(f'grep -rn "{new_key_frag}" ~ --exclude-dir=node_modules --exclude-dir=.git')
print(stdout.read().decode())

client.close()
