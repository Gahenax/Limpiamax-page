const path = require('path')
const http = require('http')

// Configuración de entorno para Hostinger
process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// Intentar cargar Next.js
try {
    const { startServer } = require('next/dist/server/lib/start-server')
    
    // Leer el config original generado por Next
    const fs = require('fs')
    const serverJsContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8')
    
    // Extraer y limpiar el objeto nextConfig del server.js original
    // Eliminamos rutas absolutas de Windows que rompen el despliegue
    const configMatch = serverJsContent.match(/const nextConfig = (\{.*?\})\n/s)
    let nextConfig = {}
    
    if (configMatch) {
        try {
            const rawConfig = configMatch[1]
            // Limpiar rutas absolutas locales
            const cleanedConfig = rawConfig.replace(/C:\\\\Users\\\\.*?\\\\limpiamax-web/g, '.')
            nextConfig = JSON.parse(cleanedConfig)
        } catch (e) {
            console.error('Error parseando nextConfig:', e)
        }
    }

    const port = parseInt(process.env.PORT, 10) || 3000
    const hostname = 'localhost'

    console.log(`> Iniciando servidor Gahenax en puerto ${port}...`)

    startServer({
        dir: __dirname,
        isDev: false,
        config: nextConfig,
        hostname,
        port,
        allowRetry: false,
    }).catch((err) => {
        console.error('Error al iniciar Next.js:', err)
        process.exit(1)
    })

} catch (err) {
    console.error('Error crítico cargando dependencias:', err)
    
    // Fallback minimalista por si Next.js no carga
    http.createServer((req, res) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Error crítico en el despliegue de Limpiamax. Verifica los logs.')
    }).listen(process.env.PORT || 3000)
}
