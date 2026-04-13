import { Metadata } from 'next';
import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | LimpiaMax Barcelona',
  description: 'Política de privacidad y protección de datos de LimpiaMax. Conforme al RGPD (UE 2016/679) y la LOPDGDD (LO 3/2018).',
  alternates: {
    canonical: '/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <BannerLayoutWrapper>
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary font-outfit mb-4 tracking-tight">Política de Privacidad</h1>
          <p className="text-muted-foreground text-lg mb-12 font-medium">Última actualización: abril 2026</p>

          <div className="prose prose-lg prose-slate max-w-none space-y-10">
            
            {/* 1. Responsable */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">1. Responsable del Tratamiento</h2>
              <ul className="list-none space-y-2 text-base text-muted-foreground font-medium">
                <li><strong className="text-primary">Denominación:</strong> Limpia MAX (Servicios de Limpieza Profesional)</li>
                <li><strong className="text-primary">Domicilio:</strong> Barcelona, España</li>
                <li><strong className="text-primary">Correo electrónico:</strong> limpiamaxbarcelona00@gmail.com</li>
                <li><strong className="text-primary">Teléfono:</strong> +34 674 571 497</li>
              </ul>
            </section>

            {/* 2. Datos que recogemos */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">2. Datos Personales que Recogemos</h2>
              <p className="text-muted-foreground font-medium">En función de la interacción del usuario con nuestro sitio web, podemos recoger los siguientes datos personales:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li><strong className="text-primary">Formulario de contacto:</strong> Nombre, correo electrónico y teléfono.</li>
                <li><strong className="text-primary">Proceso de reserva (checkout):</strong> Nombre completo, dirección postal, código postal, teléfono, correo electrónico, fecha y horario del servicio.</li>
                <li><strong className="text-primary">Datos de pago:</strong> Procesados directamente por <strong>Stripe, Inc.</strong> Limpia MAX no almacena ni tiene acceso a los datos de tu tarjeta de crédito o débito.</li>
                <li><strong className="text-primary">Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas y duración de la visita, recogidos mediante cookies analíticas previo consentimiento.</li>
              </ul>
            </section>

            {/* 3. Finalidad */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">3. Finalidad del Tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li>Gestionar las solicitudes de presupuesto y contacto.</li>
                <li>Ejecutar la prestación de los servicios de limpieza contratados.</li>
                <li>Procesar pagos de forma segura a través de Stripe.</li>
                <li>Enviar confirmaciones de reserva por correo electrónico (vía Resend).</li>
                <li>Agendar las citas en nuestro calendario interno.</li>
                <li>Realizar análisis estadísticos anónimos para mejorar nuestro servicio (previo consentimiento).</li>
                <li>Reportar conversiones publicitarias a Google Ads (previo consentimiento).</li>
              </ul>
            </section>

            {/* 4. Base Jurídica */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">4. Base Jurídica del Tratamiento</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li><strong className="text-primary">Ejecución de un contrato</strong> (Art. 6.1.b RGPD): Para gestionar la reserva y prestación del servicio contratado.</li>
                <li><strong className="text-primary">Consentimiento</strong> (Art. 6.1.a RGPD): Para el envío de formularios de contacto, cookies analíticas y publicidad personalizada.</li>
                <li><strong className="text-primary">Interés legítimo</strong> (Art. 6.1.f RGPD): Para la prevención de fraude y la seguridad del sitio web.</li>
              </ul>
            </section>

            {/* 5. Destinatarios */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">5. Destinatarios de los Datos</h2>
              <p className="text-muted-foreground font-medium">Tus datos personales podrán ser comunicados a los siguientes terceros, exclusivamente para las finalidades descritas:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-muted-foreground border border-border rounded-xl overflow-hidden">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-4 text-left font-black text-primary text-xs uppercase tracking-wider">Proveedor</th>
                      <th className="p-4 text-left font-black text-primary text-xs uppercase tracking-wider">Finalidad</th>
                      <th className="p-4 text-left font-black text-primary text-xs uppercase tracking-wider">País</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium">
                    <tr><td className="p-4">Stripe, Inc.</td><td className="p-4">Procesamiento de pagos</td><td className="p-4">EE.UU. (Cláusulas Contractuales Tipo)</td></tr>
                    <tr><td className="p-4">Google LLC</td><td className="p-4">Analítica web y publicidad</td><td className="p-4">EE.UU. (Marco de Privacidad UE-EE.UU.)</td></tr>
                    <tr><td className="p-4">Resend, Inc.</td><td className="p-4">Envío de emails transaccionales</td><td className="p-4">EE.UU. (Cláusulas Contractuales Tipo)</td></tr>
                    <tr><td className="p-4">Google Sheets/Calendar</td><td className="p-4">Gestión interna de citas y pedidos</td><td className="p-4">UE (Google Workspace)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. Conservación */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">6. Plazo de Conservación</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li><strong className="text-primary">Datos de contacto:</strong> Se conservarán durante el tiempo necesario para atender la solicitud y, como máximo, 12 meses.</li>
                <li><strong className="text-primary">Datos de facturación:</strong> Se conservarán durante el plazo legal exigido (5 años, conforme al Código de Comercio).</li>
                <li><strong className="text-primary">Datos de navegación (cookies):</strong> Según lo indicado en la Política de Cookies (máximo 13 meses).</li>
              </ul>
            </section>

            {/* 7. Derechos */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">7. Derechos del Usuario</h2>
              <p className="text-muted-foreground font-medium">De conformidad con el RGPD (UE 2016/679) y la LOPDGDD (LO 3/2018), puedes ejercer los siguientes derechos en cualquier momento:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li><strong className="text-primary">Acceso:</strong> Solicitar una copia de tus datos personales.</li>
                <li><strong className="text-primary">Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
                <li><strong className="text-primary">Supresión:</strong> Solicitar la eliminación de tus datos (&quot;derecho al olvido&quot;).</li>
                <li><strong className="text-primary">Limitación:</strong> Solicitar la restricción del tratamiento.</li>
                <li><strong className="text-primary">Portabilidad:</strong> Recibir tus datos en un formato estructurado y de uso común.</li>
                <li><strong className="text-primary">Oposición:</strong> Oponerte al tratamiento de tus datos por motivos legítimos.</li>
              </ul>
              <p className="text-muted-foreground font-medium mt-4">
                Para ejercer cualquiera de estos derechos, envía un correo a{' '}
                <a href="mailto:limpiamaxbarcelona00@gmail.com" className="text-accent font-bold hover:underline">limpiamaxbarcelona00@gmail.com</a>{' '}
                indicando el derecho que deseas ejercer y adjuntando una copia de tu DNI o documento identificativo.
              </p>
              <p className="text-muted-foreground font-medium mt-4">
                Si consideras que tus derechos no han sido atendidos correctamente, puedes presentar una reclamación ante la{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline">Agencia Española de Protección de Datos (AEPD)</a>.
              </p>
            </section>

            {/* 8. Cookies */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">8. Política de Cookies</h2>
              <p className="text-muted-foreground font-medium">
                Este sitio web utiliza cookies propias y de terceros. Puedes configurar tus preferencias de cookies en cualquier momento
                a través del banner de consentimiento que aparece al acceder al sitio. Las cookies analíticas y publicitarias solo se activarán
                tras tu consentimiento explícito.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium mt-4">
                <li><strong className="text-primary">Cookies técnicas (necesarias):</strong> Permiten la navegación y el funcionamiento del carrito de compra. No requieren consentimiento.</li>
                <li><strong className="text-primary">Cookies analíticas (Google Analytics):</strong> Recogen información anónima sobre el uso del sitio. Requieren consentimiento previo.</li>
                <li><strong className="text-primary">Cookies de marketing (Google Ads):</strong> Permiten la medición de conversiones publicitarias. Requieren consentimiento previo.</li>
              </ul>
            </section>

            {/* 9. Seguridad */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">9. Medidas de Seguridad</h2>
              <p className="text-muted-foreground font-medium">
                Limpia MAX aplica las medidas técnicas y organizativas apropiadas para garantizar la seguridad de tus datos personales,
                incluyendo cifrado HTTPS/TLS en todas las comunicaciones, procesamiento de pagos mediante la plataforma certificada PCI-DSS de Stripe,
                y acceso restringido a los datos internos.
              </p>
            </section>

            {/* 10. Modificaciones */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">10. Modificaciones</h2>
              <p className="text-muted-foreground font-medium">
                Limpia MAX se reserva el derecho de modificar esta política para adaptarla a novedades legislativas o cambios en nuestras
                actividades. Cualquier modificación será publicada en esta página con la fecha de actualización correspondiente.
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <Link href="/" className="text-accent font-bold hover:underline">← Volver al inicio</Link>
          </div>
        </div>
      </main>
      <BottomNav />
      <Footer />
    </BannerLayoutWrapper>
  );
}
