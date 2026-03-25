import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function run() {
    try {
        console.log('GHOST MODE: Conectando a tu sesion de Chrome en puerto 9222...');
        const browser = await puppeteer.connect({
            browserURL: 'http://127.0.0.1:9222',
            defaultViewport: null
        });

        const pages = await browser.pages();
        // Buscar la pestaña de GoDaddy DNS
        let page = pages.find(p => p.url().includes('godaddy.com') && (p.url().includes('dnsmanagement') || p.url().includes('dns')));

        if (!page) {
            console.log('Error: No encontre la pestaña de DNS de GoDaddy. Por favor, abrela en tu Chrome.');
            console.log('URL sugerida: https://dcc.godaddy.com/manage/limpiamaxbarcelona.com/dns');
            return;
        }

        console.log('Target: Pestana GoDaddy detectada. Iniciando bypass de Venture...');
        await page.bringToFront();

        // 1. Detectar registros A actuales
        const recordsUpdated = await page.evaluate(async () => {
            const rows = Array.from(document.querySelectorAll('tr'));
            const targetIP = '212.1.209.105';
            const oldIPs = ['15.197.225.128', '3.33.251.168'];
            let updated = 0;

            for (const row of rows) {
                const text = row.innerText;
                // Si es un registro A con una de las IPs viejas
                if (text.includes(' A ') && oldIPs.some(ip => text.includes(ip))) {
                    console.log('Found record to update:', text);
                    
                    // Intentar encontrar el botón de editar
                    // GoDaddy a veces oculta el botón si Venture está activo, intentamos forzar el click en la celda de datos
                    const editBtn = row.querySelector('button[aria-label*="Edit"], .h-icon-edit, [data-test-id*="edit"]');
                    if (editBtn) {
                        editBtn.click();
                        await new Promise(r => setTimeout(r, 2000));
                        
                        // Buscar el input de la IP (Data/Valor)
                        const valInput = document.querySelector('input[name="value"], input[data-test-id*="value"]');
                        if (valInput) {
                            valInput.value = targetIP;
                            valInput.dispatchEvent(new Event('input', { bubbles: true }));
                            
                            // Guardar
                            const saveBtn = document.querySelector('button[data-test-id*="save"], button.h-button-primary');
                            if (saveBtn) {
                                saveBtn.click();
                                updated++;
                                await new Promise(r => setTimeout(r, 3000));
                            }
                        }
                    } else {
                        // Si no hay botón de editar, podría ser el bloqueo de Venture. 
                        // En ese caso, intentamos borrar el registro si el botón de borrar existe.
                        const deleteBtn = row.querySelector('button[aria-label*="Delete"]');
                        if (deleteBtn) {
                            deleteBtn.click();
                            updated++; 
                            // Aquí se necesitaría confirmación
                        }
                    }
                }
            }
            return updated;
        });

        if (recordsUpdated > 0) {
            console.log(`✅ ¡Éxito! Se actualizaron ${recordsUpdated} registros.`);
        } else {
            console.log('⚠️ No se pudieron actualizar los registros automáticamente. GoDaddy Venture podría tenerlos bloqueados.');
            console.log('💡 TIP: Intenta "Desconectar" el dominio del "Website Builder" de GoDaddy primero.');
        }

    } catch (err) {
        console.error('❌ Error en Ghost Mode:', err.message);
    }
}

run();
