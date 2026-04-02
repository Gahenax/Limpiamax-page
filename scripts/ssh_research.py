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

cmds = [
    'ps aux | grep -v grep | grep node',
    'find ~/domains -name ".htaccess" -maxdepth 4 -exec echo "--- {} ---" \; -exec cat {} \;',
    'ls -la ~/domains/gahenaxaisolutions.online/public_html/.htaccess'
]

for cmd in cmds:
    print(f"\nRunning: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    print(stdout.read().decode())
    print(stderr.read().decode())

client.close()
