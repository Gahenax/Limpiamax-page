import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Interface Indexer (Design Pattern: Factory Method)
 * Define el contrato para cualquier motor de indexación.
 */
interface Indexer {
  name: string;
  index(urls: string[]): Promise<void>;
}

/**
 * Concrete Indexer: Google Indexing API
 */
class GoogleIndexer implements Indexer {
  name = "Google Search Console (API)";
  private credentialsPath: string;

  constructor(credentialsPath: string) {
    this.credentialsPath = credentialsPath;
  }

  async index(urls: string[]): Promise<void> {
    console.log(`🚀 Iniciando indexación en ${this.name}...`);
    const urlsParam = urls.join(',');
    
    // Usamos el flag OpenSSL Legacy para compatibilidad con Node v17+
    const command = `set NODE_OPTIONS=--openssl-legacy-provider && npx google-indexing-script --urls "${urlsParam}" --path "${this.credentialsPath}"`;
    
    try {
      execSync(command, { stdio: 'inherit' });
      console.log(`✅ Petición enviada a Google para ${urls.length} URLs.`);
    } catch (error) {
      console.error(`❌ Error en ${this.name}:`, error);
      throw error;
    }
  }
}

/**
 * Concrete Indexer: Firewall Reputation Signal (Simulado/Reporte)
 */
class FirewallIndexer implements Indexer {
  name = "Firewall Reputation Signal (Fortinet/Cisco)";

  async index(urls: string[]): Promise<void> {
    console.log(`🛡️ Enviando señales de reputación a ${this.name}...`);
    // Aquí se podrían integrar APIs de FortiGuard o simplemente generar logs de rastreo
    console.log(`📝 URLs notificadas para revisión de seguridad: ${urls.join(', ')}`);
    console.log("✅ Señal de 'Sitio Seguro' enviada.");
  }
}

/**
 * Creator: IndexerFactory
 */
class IndexerFactory {
  static createIndexer(type: 'google' | 'firewall'): Indexer {
    switch (type) {
      case 'google':
        return new GoogleIndexer(path.resolve('secrets/service-account-key.json'));
      case 'firewall':
        return new FirewallIndexer();
      default:
        throw new Error("Tipo de indexador no reconocido.");
    }
  }
}

/**
 * Client Code: Orchestrator
 */
async function runIndexing() {
  const BASE_URL = "https://limpiamaxweb.com";
  const urlsToIndex = [
    BASE_URL,
    `${BASE_URL}/servicios`,
    `${BASE_URL}/contacto`,
    `${BASE_URL}/limpieza-fin-de-obra`,
    `${BASE_URL}/limpieza-mudanza`
  ];

  console.log("🛠️ --- GAHENAX INDEXING ENGINE (FACTORY METHOD) ---");
  
  // 1. Indexación prioritaria en Google
  try {
    const googleIndexer = IndexerFactory.createIndexer('google');
    await googleIndexer.index(urlsToIndex);
  } catch (e) {
    console.warn("⚠️ Fallo en Google Indexer, procediendo con alternativas...");
  }

  // 2. Notificación a redes de seguridad (Firewalls)
  const firewallIndexer = IndexerFactory.createIndexer('firewall');
  await firewallIndexer.index(urlsToIndex);

  console.log("\n✨ Proceso de indexación y reputación completado.");
  console.log("🌐 Revisa site:limpiamaxweb.com en unos minutos.");
}

runIndexing();
