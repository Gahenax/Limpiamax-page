export default async function AdminPage() {
  return (
    <div style={{ 
      padding: '5rem', 
      background: 'white', 
      minHeight: '100vh', 
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️ AISLAMIENTO DE SEGURIDAD</h1>
      <p style={{ fontSize: '1.2rem' }}>Si puedes ver este mensaje, el problema está en los componentes del Dashboard.</p>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <pre>Status: Layout & Auth OK</pre>
      </div>
    </div>
  );
}
