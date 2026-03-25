import time
import subprocess
import datetime

DOMAIN = "limpiamaxbarcelona.com"
TARGET_IP = "212.1.209.105"
TARGET_NS = ["hostinger.com", "dns-parking.com"] # Parking check as well

def check_dns():
    print(f"[{datetime.datetime.now()}] --- Check para {DOMAIN} ---")
    
    # Check A Record
    try:
        a_result = subprocess.check_output(f"nslookup {DOMAIN} 8.8.8.8", shell=True, stderr=subprocess.STDOUT).decode('utf-8')
        if TARGET_IP in a_result:
            print("✅ A Record: CORRECTO (Apunta a Hostinger)")
        else:
            print("❌ A Record: PENDIENTE (Aún no propaga)")
    except Exception as e:
        print(f"⚠️ A Record Error: {e}")

    # Check NS Records
    try:
        ns_result = subprocess.check_output(f"nslookup -type=ns {DOMAIN} 8.8.8.8", shell=True, stderr=subprocess.STDOUT).decode('utf-8')
        if "hostinger" in ns_result.lower():
            print("✅ Nameservers: CORRECTO (Hostinger)")
        elif "dns-parking" in ns_result.lower():
            print("⚠️ Nameservers: PARKING (GoDaddy)")
        else:
            print("❌ Nameservers: OTROS")
    except Exception as e:
        print(f"⚠️ NS Record Error: {e}")
    print("-" * 40)

def main():
    while True:
        check_dns()
        print("Siguiente check en 20 minutos...")
        time.sleep(1200) # 20 minutos

if __name__ == "__main__":
    main()
