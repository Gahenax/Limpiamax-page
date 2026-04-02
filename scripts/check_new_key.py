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
    'grep -r "BVajm" ~/domains/limpiamaxweb.com/ --exclude-dir=node_modules --exclude-dir=.git',
    'grep -r "rk_live" ~/domains/limpiamaxweb.com/ --exclude-dir=node_modules --exclude-dir=.git',
    'cat ~/domains/limpiamaxweb.com/nodejs/.env',
    'ps -ef | grep lsnode',
    'ls -la /tmp/passenger*'
]

for cmd in cmds:
    print(f"\nRunning: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    print(stdout.read().decode())
    print(stderr.read().decode())

client.close()
