import time
import requests
import dns.resolver

def monitor_migration(domain, target_ns, source_url):
    print(f"🕵️ Monitoreando migración de: {domain}")
    print(f"🎯 Objetivo Nameservers: {target_ns}")
    
    while True:
        try:
            # 1. Check Nameservers
            answers = dns.resolver.resolve(domain, 'NS')
            ns_list = [str(rdata) for rdata in answers]
            ns_ok = all(any(target in ns for ns in ns_list) for target in target_ns)
            
            # 2. Check Content Parity (Optional/If reachable)
            try:
                response = requests.get(f"http://{domain}", timeout=5)
                # Simple check: Title should match (or another unique string)
                parity = "OK" if response.status_code == 200 else "Wait..."
            except:
                parity = "Unreachable"

            print(f"[{time.strftime('%H:%M:%S')}] NS: {'✅' if ns_ok else '⏳'} | Status: {parity}")
            
            if ns_ok and parity == "OK":
                print("\n🎉 ¡Migración confirmada! El DNS ha propagado y el sitio responde.")
                break
                
        except Exception as e:
            print(f"[{time.strftime('%H:%M:%S')}] ⏳ Esperando propagación... ({e})")
            
        time.sleep(60) # Revisar cada minuto

if __name__ == "__main__":
    monitor_migration(
        "limpiamaxbarcelona.com", 
        ["ns1.dns-parking.com", "ns2.dns-parking.com"],
        "https://gahenaxaisolutions.xyz"
    )
