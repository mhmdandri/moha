import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { siteConfig, faqsData } from "@/lib/site";
import { outfit } from "@/lib/fonts";

const siteLogoUrl = new URL(siteConfig.ogImage, siteConfig.url).toString();

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteLogoUrl,
  image: siteLogoUrl,
  email: siteConfig.email,
  telephone: "+6281210860242",
  priceRange: "IDR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  sameAs: siteConfig.sameAs,
  description: siteConfig.description,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan Pembuatan Website & Solusi Digital",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Pembuatan Website & Web App Fullstack",
          description:
            "Pembuatan website modern, responsif, cepat dengan Next.js, React, Node.js, dan database.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Undangan Pernikahan Digital & QR Check-In",
          description:
            "Website undangan pernikahan digital interaktif dengan sistem RSVP dan QR code check-in tamu.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Pembuatan Landing Page & Personal Brand",
          description:
            "Landing page konversi tinggi untuk personal brand, UMKM, dan profil perusahaan profesional.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jasa Desain UI/UX & Redesign Website",
          description:
            "Merancang antarmuka website yang intuitif, estetis, dan memberikan pengalaman pengguna terbaik.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqsData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Jasa Pembuatan Website & Web Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="overflow-x-hidden scroll-smooth"
    >
      <body className={`${outfit.className} antialiased`}>
        {/* Schema.org Structured Data for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
