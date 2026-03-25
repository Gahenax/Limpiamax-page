/**
 * GAHENAX AI: GODADDY DNS UNLOCKER (CONSOLE EDITION)
 * --------------------------------------------------
 * INSTRUCCIONES:
 * 1. Ve a la pestaña de DNS de GoDaddy en tu navegador.
 * 2. Presiona F12 (Consola).
 * 3. Pega este código y presiona ENTER.
 */

(async () => {
    console.log("%c GAHENAX: Iniciando protocolo de desbloqueo DNS...", "color: #00ff00; font-weight: bold;");

    const targetIP = '212.1.209.105';
    const oldIPs = ['15.197.225.128', '3.33.251.168'];

    // 1. Quitar bloqueos de UI (Atributos disabled y clases de bloqueo)
    document.querySelectorAll('[disabled], .disabled, .locked, [aria-disabled="true"]').forEach(el => {
        el.removeAttribute('disabled');
        el.removeAttribute('aria-disabled');
        el.classList.remove('disabled', 'locked');
        el.style.pointerEvents = 'auto';
        el.style.opacity = '1';
    });

    // 2. Buscar registros A con las IPs viejas
    const rows = Array.from(document.querySelectorAll('tr, .dns-row, div[role="row"]'));
    let found = 0;

    for (const row of rows) {
        if (oldIPs.some(ip => row.innerText.includes(ip))) {
            found++;
            console.log(`Registro detectado: ${row.innerText.trim()}`);
            
            // Forzar click en el botón de Editar o en la fila misma
            const editBtn = row.querySelector('button[aria-label*="Edit"], .h-icon-edit, [data-test-id*="edit"], .dns-edit-btn');
            if (editBtn) {
                editBtn.click();
            } else {
                row.click(); // Intentar click general
            }

            // Esperar un momento a que abra el panel/modal
            await new Promise(r => setTimeout(r, 1000));

            // Buscar el input de la IP
            const input = document.querySelector('input[name="value"], input[data-test-id*="value"], input[placeholder*="Points to"]');
            if (input) {
                input.value = targetIP;
                // Disparar eventos para que el framework de GoDaddy detecte el cambio
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`IP inyectada: ${targetIP}`);
                
                // Buscar el botón de Guardar
                const saveBtn = document.querySelector('button[data-test-id*="save"], button.h-button-primary, button[type="submit"]');
                if (saveBtn) {
                    console.log("%c BOTON GUARDAR HABILITADO: Haz clic en GUARDAR ahora.", "color: #ff9900; font-weight: bold;");
                    saveBtn.removeAttribute('disabled');
                    saveBtn.style.background = "#00ff00";
                }
            }
        }
    }

    if (found === 0) {
        console.warn("No encontre registros A con las IPs de AWS. Asegurate de estar en la pestaña correcta de DNS.");
    }
})();
