import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fullAddress, seo, site } from "@/config/site";
import { images } from "@/config/images";
import { services } from "@/config/services";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Reinigungsfirma ${site.region}`,
    template: `%s | ${site.name}`,
  },
  description: seo.defaultDescription,
  keywords: seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – ${site.slogan}`,
    description: seo.defaultDescription,
    images: [{ url: images.og, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – ${site.slogan}`,
    description: seo.defaultDescription,
    images: [images.og],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#23678a",
  width: "device-width",
  initialScale: 1,
};

/** Strukturierte Daten für lokales SEO (Google Local / Rich Results). */
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: site.name,
    slogan: site.slogan,
    url: site.url,
    // TODO: Platzhalter in src/config/site.ts durch echte Daten ersetzen
    telephone: site.phone,
    email: site.email,
    image: images.og,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "CH",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.maps.lat, longitude: site.maps.lng },
    areaServed: site.region,
    openingHours: "Mo-Sa 08:00-18:00",
    vatID: site.uid,
    description: seo.defaultDescription,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Reinigungsleistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        // Verweist auf die jeweilige Leistungs-Detailseite.
        url: `${site.url}/leistungen/${service.id}`,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: `${site.url}/leistungen/${service.id}`,
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
        <LocalBusinessJsonLd />
        {/* Adresse für Suchmaschinen auch im Markup: {fullAddress} */}
        <meta name="geo.region" content="CH" />
        <meta name="geo.placename" content={site.address.city} />
        <meta name="author" content={site.name} />
        <meta name="address" content={fullAddress} />
      </body>
    </html>
  );
}
