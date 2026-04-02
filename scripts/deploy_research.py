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

print('--- SEARCHING FOR src DIRECTORY ---')
stdin, stdout, stderr = client.exec_command('find ~ -name "src" -type d')
out = stdout.read().decode()
if out:
    print(out)
else:
    print('No "src" directories found.')

print('\n--- CHECKING .next/REQUIRED-SERVER-FILES.JSON ---')
# This can tell us where it was built
node_path = '/home/u314799704/domains/limpiamaxweb.com/nodejs'
stdin, stdout, stderr = client.exec_command(f'cat {node_path}/.next/required-server-files.json')
print(stdout.read().decode())

client.close()
