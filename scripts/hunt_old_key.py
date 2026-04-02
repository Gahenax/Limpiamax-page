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

# Search for the old key fragment in the entire domain directory
old_key_fragment = '7sU5d' 
print(f"Searching for old key fragment: {old_key_fragment}...")

cmds = [
    f'grep -r "{old_key_fragment}" ~/domains/limpiamaxweb.com/ --exclude-dir=node_modules --exclude-dir=.git',
    'ps aux | grep node | grep -v grep'
]

for cmd in cmds:
    print(f"\nRunning: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    print(stdout.read().decode())
    print(stderr.read().decode())

client.close()
