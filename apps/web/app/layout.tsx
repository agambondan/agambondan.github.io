import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://agambondan.github.io"),
  applicationName: "Firman Agam Portfolio",
  title: {
    default: "Backend Engineer Portfolio | Firman Agam",
    template: "%s | Firman Agam"
  },
  description:
    "Backend engineer portfolio with CV, projects, and engineering blog focused on Go, REST/gRPC APIs, and scalable systems.",
  keywords: [
    "Firman Agam",
    "Backend Engineer",
    "Backend Engineer Portfolio",
    "Go Developer",
    "gRPC",
    "REST API",
    "System Design",
    "API Engineering",
    "Software Architecture",
    "Engineering Blog",
    "Curriculum Vitae"
  ],
  authors: [{ name: "Firman Agam" }],
  creator: "Firman Agam",
  category: "technology",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#7c5cff" }]
  },
  openGraph: {
    title: "Backend Engineer Portfolio | Firman Agam",
    description:
    "Backend Engineer experienced in Golang, REST/gRPC APIs, and scalable production systems.",
    type: "website",
    url: "https://agambondan.github.io",
    siteName: "Firman Agam Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/linkedin-profile.jpeg",
        width: 1200,
        height: 1200,
        alt: "Firman Agam profile photo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineer Portfolio | Firman Agam",
    description: "Portfolio, CV, and engineering notes about scalable backend systems.",
    images: ["/linkedin-profile.jpeg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("web-theme");var root=document.documentElement;root.classList.remove("dark","light");if(theme==="light"){root.classList.add("light");}else{root.classList.add("dark");}}catch(e){}})();`
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
