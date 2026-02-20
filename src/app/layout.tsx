import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "BetDay Lite",
  description: "Mini aplicación de apuestas deportivas simuladas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)] pb-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
