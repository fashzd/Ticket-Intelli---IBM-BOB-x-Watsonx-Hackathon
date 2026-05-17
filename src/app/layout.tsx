import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ticket Inteli - AI-Powered Support Ticket Analysis",
  description: "Analyze support tickets with AI to accelerate triage and improve customer response quality",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Header />
          <main className="main-content" id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

// Made with Bob
