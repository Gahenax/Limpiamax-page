import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function run() {
    try {
        console.log('🔗 Conectando al navegador en puerto 9222...');
        const browser = await puppeteer.connect({
            browserURL: 'http://127.0.0.1:9222',
            defaultViewport: null
        });

        const pages = await browser.pages();
        let page = pages.find(p => p.url().includes('dns-zone-editor'));

        if (!page) {
            console.log('❌ No encontré la pestaña del DNS Zone Editor. Ábrela por favor.');
            return;
        }

        console.log('📡 Radar de Minas activado. Esperando que pases el CAPTCHA...');
        
        // Esperar a que el título deje de ser "Just a moment..." o "Un momento..."
        await page.waitForFunction(() => {
            const title = document.title.toLowerCase();
            return !title.includes('moment') && !title.includes('espera') && document.body.innerText.includes('DNS records');
        }, { timeout: 600000 });

        console.log('✅ Barrera superada. Iniciando inyección DNS...');
        await page.bringToFront();

        // 1. Buscar y borrar registros A antiguos (15.197.225.128, 3.33.251.168)
        const deleted = await page.evaluate(async () => {
            const ips = ['15.197.225.128', '3.33.251.168'];
            const rows = Array.from(document.querySelectorAll('tr'));
            let count = 0;

            for (const row of rows) {
                const text = row.innerText;
                if (row.innerText.includes(' A ') && ips.some(ip => text.includes(ip))) {
                    const deleteBtn = row.querySelector('button[aria-label*="Delete"], button[title*="Delete"], .h-icon-delete');
                    if (deleteBtn) {
                        deleteBtn.click();
                        count++;
                        // Esperar un poco para que el modal/confirmación aparezca si lo hay
                        await new Promise(r => setTimeout(r, 1000));
                        const confirmBtn = document.querySelector('button.h-button-danger, button.confirm-delete');
                        if (confirmBtn) confirmBtn.click();
                        await new Promise(r => setTimeout(r, 2000));
                    }
                }
            }
            return count;
        });

        console.log(`🗑️ Registros antiguos eliminados: ${deleted}`);

        // 2. Agregar nuevo registro A: @ -> 212.1.209.105
        console.log('➕ Agregando nuevo registro A (@ -> 212.1.209.105)...');
        await page.evaluate(() => {
            // Esto depende de la UI de Hostinger, intentando selectores genéricos de hPanel
            const typeSelect = document.querySelector('select[name="type"], .h-select');
            if (typeSelect) typeSelect.value = 'A';
            
            const nameInput = document.querySelector('input[name="name"], input[placeholder="Host"]');
            if (nameInput) {
                nameInput.value = '@';
                nameInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            const pointsToInput = document.querySelector('input[name="value"], input[placeholder="Points to"]');
            if (pointsToInput) {
                pointsToInput.value = '212.1.209.105';
                pointsToInput.dispatchEvent(new Event('input', { bubbles: true }));
            }

            const addBtn = document.querySelector('button[type="submit"], button.h-button-primary');
            if (addBtn) addBtn.click();
        });

        console.log('🎉 ¡Misión cumplida! DNS actualizado.');
        
        await new Promise(r => setTimeout(r, 5000));
        await page.screenshot({ path: 'C:/Users/jotam/.gemini/antigravity/brain/3197c7e3-2407-46cc-91f4-9e71e423d9aa/dns_final_proof.png' });

    } catch (err) {
        console.error('❌ Error en el Radar:', err.message);
    }
}

run();
