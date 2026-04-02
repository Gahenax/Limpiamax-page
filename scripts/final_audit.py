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

print("--- FULL PROCESS LIST FOR u314799704 ---")
stdin, stdout, stderr = client.exec_command('ps auxww')
print(stdout.read().decode())

print("\n--- CHECKING .next FOLDER STRUCTURE ---")
stdin, stdout, stderr = client.exec_command('ls -R ~/domains/limpiamaxweb.com/nodejs/.next/server/pages/api/')
print(stdout.read().decode())

print("\n--- CHECKING FOR ANY HIDDEN .env FILES ---")
stdin, stdout, stderr = client.exec_command('find ~ -name ".env*"')
print(stdout.read().decode())

client.close()
