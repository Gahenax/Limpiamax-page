import os

env_path = 'c:/Users/jotam/OneDrive/Desktop/GahenaxAI/limpiamax-web/.env'
creds = {}
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, _, v = line.partition('=')
            creds[k.strip()] = v.strip()

import paramiko
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('151.106.106.26', port=65002, username='u314799704', password=creds.get('FTP_PASS',''), timeout=20)
print("SSH OK")

node_path = '/home/u314799704/domains/limpiamaxweb.com/nodejs'

# 1. Matar procesos node y lsnode
print("\n[1] Matando todos los procesos node/lsnode del usuario...")
client.exec_command('pkill -u u314799704 -f node; pkill -u u314799704 -f lsnode')

# 2. Esperar un poco
import time
time.sleep(2)

# 3. Lanzar la app de Limpiamax correctamente
# Usando el binario de node20 que encontramos
node_bin = '/opt/alt/alt-nodejs20/root/usr/bin/node'
print("\n[2] Lanzando app de Limpiamax...")
launch_cmd = f'cd {node_path} && export $(grep -v "^#" .env | xargs) && export NODE_ENV=production && nohup {node_bin} server.js >> console.log 2>> stderr.log &'
client.exec_command(launch_cmd)

# 4. Verificar proceso
time.sleep(3)
print("\n[3] Verificando procesos activos...")
_, stdout, _ = client.exec_command('ps aux | grep -E "node|lsnode" | grep -v grep')
print(stdout.read().decode())

client.close()
