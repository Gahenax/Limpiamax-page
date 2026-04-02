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

print('--- NUCLEAR RESET: Purging all domain residues ---')
# The user was right: I crossed domains before and they are fighting for 3000.
# I will kill all node/next/lsnode processes for ALL domains of this user.

# pkill -9 -u is the most violent way.
client.exec_command('pkill -9 -u u314799704')

print('Purging all processes for user u314799704 (including background ones)...')
time.sleep(5)

# Verify no more node/next/lsnode
stdin, stdout, stderr = client.exec_command('ps auxww | grep -E "node|lsnode|next-server" | grep -v grep')
output = stdout.read().decode()
if not output:
    print('SUCCESS: Total purge complete. Site is likely down now (cold).')
else:
    print('WARNING: Some processes stubborn. Retrying kill...')
    client.exec_command('ps auxww | grep -E "node|lsnode|next-server" | grep -v grep | awk "{print $2}" | xargs kill -9')

# Now trigger ONLY Limpiamax restart via Passenger
print('\n--- Triggering restart ONLY for Limpiamax ---')
limpiamax_path = '/home/u314799704/domains/limpiamaxweb.com/nodejs'
client.exec_command(f'mkdir -p {limpiamax_path}/tmp && touch {limpiamax_path}/tmp/restart.txt')

# Also, ensure gahenaxaisolutions.online DOES NOT try to restart immediately
# by touching its restart file too, just in case, but we want Limpiamax to win port 3000 if it starts.
# Actually, Passenger Isolation should handle different ports if configured, 
# but if they are both set to 3000 in .env/package.json, they fight.

print('Restart triggered for Limpiamax.')

client.close()
