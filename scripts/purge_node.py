import paramiko
import os

env_path = 'c:/Users/jotam/OneDrive/Desktop/GahenaxAI/limpiamax-web/.env'
creds = {}
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, _, _v = line.partition('=')
            creds[k.strip()] = _v.strip()

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('151.106.106.26', port=65002, username='u314799704', password=creds.get('FTP_PASS',''), timeout=20)

print('--- Purging node/lsnode processes ---')
# Using a simpler command to avoid shell interpolation issues
client.exec_command('pkill -u u314799704 -9 -f node')
client.exec_command('pkill -u u314799704 -9 -f lsnode')

import time
time.sleep(2)

stdin, stdout, stderr = client.exec_command('ps aux | grep -e node -e lsnode | grep -v grep')
output = stdout.read().decode().strip()
if not output:
    print('SUCCESS: All processes purged.')
else:
    print('REMAINING PROCESSES:\n' + output)

client.close()
