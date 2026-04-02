import paramiko
import time
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

print('--- HARD PURGE: Killing next-server, lsnode, and node processes ---')
# Using single commands to avoid shell quoting hell
cmds = [
    'pkill -u u314799704 -9 -f next-server',
    'pkill -u u314799704 -9 -f lsnode',
    'pkill -u u314799704 -9 -f node'
]

for cmd in cmds:
    print(f'Executing: {cmd}')
    client.exec_command(cmd)

time.sleep(5)

print('\n--- VERIFYING CLEAN SLATE ---')
# Use grep -E conservatively or separate greps
stdin, stdout, stderr = client.exec_command('ps auxww | grep -v grep | grep -v ps')
output = stdout.read().decode()
found_residue = False
for line in output.splitlines():
    if any(x in line for x in ['next-server', 'lsnode', 'node']):
        found_residue = True
        print(f'STILL RUNNING: {line}')

if not found_residue:
    print('SUCCESS: All project residues purged.')

print('\n--- TRIGGERING RESTART (RE-TOUCH) ---')
node_path = '/home/u314799704/domains/limpiamaxweb.com/nodejs'
client.exec_command(f'mkdir -p {node_path}/tmp && touch {node_path}/tmp/restart.txt')
print('Restart triggered.')

client.close()
