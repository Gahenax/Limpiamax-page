import { Metadata } from 'next';
import { BannerLayoutWrapper } from '@/components/home/BannerLayoutWrapper';
import { Footer } from '@/components/home/Footer';
import { BottomNav } from '@/components/home/BottomNav';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | LimpiaMax Barcelona',
  description: 'Términos y condiciones de contratación de los servicios de limpieza profesional de LimpiaMax en Barcelona.',
  alternates: {
    canonical: '/terminos',
  },
};

export default function TerminosPage() {
  return (
    <BannerLayoutWrapper>
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-primary font-outfit mb-4 tracking-tight">Términos y Condiciones</h1>
          <p className="text-muted-foreground text-lg mb-12 font-medium">Última actualización: abril 2026</p>

          <div className="prose prose-lg prose-slate max-w-none space-y-10">

            {/* 1. Información General */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">1. Información General (LSSI-CE Art. 10)</h2>
              <p className="text-muted-foreground font-medium">En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa al usuario que:</p>
              <ul className="list-none space-y-2 text-base text-muted-foreground font-medium">
                <li><strong className="text-primary">Titular:</strong> Limpia MAX — Servicios de Limpieza Profesional</li>
                <li><strong className="text-primary">Domicilio:</strong> Barcelona, España</li>
                <li><strong className="text-primary">Correo electrónico:</strong> limpiamaxbarcelona00@gmail.com</li>
                <li><strong className="text-primary">Teléfono:</strong> +34 674 571 497</li>
                <li><strong className="text-primary">Actividad:</strong> Servicios de limpieza profesional para hogares y empresas</li>
              </ul>
            </section>

            {/* 2. Objeto */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">2. Objeto y Ámbito de Aplicación</h2>
              <p className="text-muted-foreground font-medium">
                Los presentes Términos y Condiciones regulan la contratación de servicios de limpieza profesional ofrecidos por Limpia MAX
                a través del sitio web <strong>limpiamaxweb.com</strong>. Al realizar una reserva o enviar un formulario de contacto,
                el usuario acepta íntegramente las presentes condiciones.
              </p>
            </section>

            {/* 3. Servicios */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">3. Descripción de los Servicios</h2>
              <p className="text-muted-foreground font-medium">Limpia MAX ofrece los siguientes servicios de limpieza profesional en el área metropolitana de Barcelona:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li><strong className="text-primary">Limpieza de casas y pisos:</strong> Limpieza regular o puntual de viviendas particulares.</li>
                <li><strong className="text-primary">Limpieza de fin de obra:</strong> Limpieza especializada posterior a reformas o construcciones.</li>
                <li><strong className="text-primary">Limpieza de mudanza / fin de alquiler:</strong> Limpieza profunda para entregas de inmuebles.</li>
              </ul>
              <p className="text-muted-foreground font-medium mt-4">
                El alcance específico de cada servicio se detalla en la ficha del producto correspondiente dentro de la sección de Servicios.
              </p>
            </section>

            {/* 4. Precios */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">4. Precios e Impuestos</h2>
              <p className="text-muted-foreground font-medium">
                Todos los precios mostrados en el sitio web <strong>incluyen el IVA aplicable</strong> (21% o el tipo reducido correspondiente).
                El precio final del servicio es el que aparece en la pantalla de &quot;Resumen y Confirmación&quot; antes de proceder al pago.
              </p>
              <p className="text-muted-foreground font-medium mt-4">
                Limpia MAX se reserva el derecho de modificar los precios en cualquier momento, sin que ello afecte a las reservas ya confirmadas y pagadas.
              </p>
            </section>

            {/* 5. Proceso de Contratación */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">5. Proceso de Contratación</h2>
              <ol className="list-decimal pl-6 space-y-3 text-muted-foreground font-medium">
                <li><strong className="text-primary">Selección del servicio:</strong> El usuario elige el tipo de limpieza y lo añade al carrito.</li>
                <li><strong className="text-primary">Datos de entrega:</strong> Se introduce la dirección completa donde se prestará el servicio.</li>
                <li><strong className="text-primary">Selección de fecha y horario:</strong> El usuario elige la fecha y franja horaria deseada.</li>
                <li><strong className="text-primary">Datos de contacto:</strong> Se proporcionan nombre, teléfono y correo electrónico.</li>
                <li><strong className="text-primary">Confirmación y pago:</strong> El usuario revisa el resumen y procede al pago seguro mediante Stripe o confirma vía WhatsApp.</li>
                <li><strong className="text-primary">Confirmación automática:</strong> Una vez completado el pago, el usuario recibe un email de confirmación y la cita queda registrada en nuestro sistema.</li>
              </ol>
            </section>

            {/* 6. Pago */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">6. Métodos de Pago</h2>
              <p className="text-muted-foreground font-medium">
                Los pagos se procesan de forma segura a través de <strong>Stripe</strong>, una plataforma certificada PCI-DSS Nivel 1.
                Limpia MAX no almacena ni tiene acceso a los datos de tu tarjeta. Se aceptan tarjetas Visa, Mastercard, American Express y otros métodos disponibles en Stripe.
              </p>
            </section>

            {/* 7. Cancelación */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">7. Política de Cancelación y Devoluciones</h2>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground font-medium">
                <li><strong className="text-primary">Cancelación con más de 24 horas de antelación:</strong> Reembolso completo del importe abonado.</li>
                <li><strong className="text-primary">Cancelación entre 12 y 24 horas antes:</strong> Reembolso del 50% del importe.</li>
                <li><strong className="text-primary">Cancelación con menos de 12 horas:</strong> No se realizará reembolso, salvo causa de fuerza mayor debidamente justificada.</li>
                <li><strong className="text-primary">No presentación (no-show):</strong> No se realizará reembolso.</li>
              </ul>
              <p className="text-muted-foreground font-medium mt-4">
                Para solicitar una cancelación, contacta con nosotros a través de WhatsApp (+34 674 571 497) o por correo electrónico. Los reembolsos se procesarán
                por el mismo método de pago utilizado en un plazo máximo de 14 días naturales.
              </p>
            </section>

            {/* 8. Seguro */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">8. Seguro de Responsabilidad Civil</h2>
              <p className="text-muted-foreground font-medium">
                Todos los servicios de Limpia MAX están cubiertos por un <strong>Seguro de Responsabilidad Civil</strong> que protege
                ante posibles daños accidentales durante la prestación del servicio.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium mt-4">
                <li><strong className="text-primary">Qué cubre:</strong> Daños materiales accidentales causados por nuestro equipo durante la ejecución del servicio (rotura de objetos, daños en superficies, etc.).</li>
                <li><strong className="text-primary">Qué NO cubre:</strong> Objetos de valor extraordinario no declarados previamente, desgaste natural de superficies, daños preexistentes, ni objetos dejados en zonas de difícil acceso sin aviso previo.</li>
                <li><strong className="text-primary">Cómo reclamar:</strong> Se debe notificar el incidente dentro de las 24 horas siguientes a la finalización del servicio enviando fotos y descripción del daño a limpiamaxbarcelona00@gmail.com.</li>
              </ul>
            </section>

            {/* 9. Obligaciones */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">9. Obligaciones del Cliente</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground font-medium">
                <li>Facilitar acceso al inmueble en la fecha y hora acordadas.</li>
                <li>Proporcionar suministro de agua y electricidad en condiciones normales.</li>
                <li>Informar sobre objetos de valor especial o zonas que requieran atención particular.</li>
                <li>Garantizar que la información proporcionada durante la reserva es veraz y completa.</li>
              </ul>
            </section>

            {/* 10. Garantía */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">10. Garantía de Satisfacción</h2>
              <p className="text-muted-foreground font-medium">
                Si no estás satisfecho con el resultado del servicio, puedes comunicarlo dentro de las <strong>24 horas siguientes</strong> a la
                finalización. Limpia MAX se compromete a enviar de nuevo al equipo para completar o corregir el trabajo sin coste adicional.
              </p>
            </section>

            {/* 11. Propiedad Intelectual */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">11. Propiedad Intelectual</h2>
              <p className="text-muted-foreground font-medium">
                Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño gráfico, código fuente) son propiedad de Limpia MAX
                o de sus licenciantes y están protegidos por la legislación española e internacional de propiedad intelectual e industrial.
                Queda prohibida su reproducción, distribución o transformación sin autorización expresa.
              </p>
            </section>

            {/* 12. Ley Aplicable */}
            <section>
              <h2 className="text-2xl font-extrabold text-primary font-outfit">12. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-muted-foreground font-medium">
                Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes
                se someten a los Juzgados y Tribunales de la ciudad de Barcelona, sin perjuicio del derecho del consumidor a acudir a los
                tribunales de su domicilio conforme al artículo 52.2 de la Ley de Enjuiciamiento Civil.
              </p>
              <p className="text-muted-foreground font-medium mt-4">
                Asimismo, informamos de la existencia de la plataforma europea de resolución de litigios en línea (ODR):{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
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
