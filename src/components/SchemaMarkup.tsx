import Script from 'next/script';

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "LimpiaMax Barcelona",
    "image": "https://limpiamaxweb.com/hero-premium-1.png",
    "@id": "https://limpiamaxweb.com",
    "url": "https://limpiamaxweb.com",
    "telephone": "+34674571497",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Mallorca",
      "addressLocality": "Barcelona",
      "addressRegion": "BCN",
      "postalCode": "08013",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4036,
      "longitude": 2.1744
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2150"
    },
    "areaServed": {
      "@type": "City",
      "name": "Barcelona"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Limpieza",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza de Fin de Obra"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza de Mudanza"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Limpieza de Fin de Alquiler"
          }
        }
      ]
    }
  };

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
