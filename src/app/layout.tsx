import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NavShell } from "@/components/nav/NavShell";
import { ProjectStoreProvider } from "@/lib/store/ProjectStore";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "How to Film — plan, shoot, edit on your phone",
  description:
    "Pick a subject, get a shot-by-shot shooting plan, record it with a guided checklist, and learn as you go. Built for phone filmmakers.",
  applicationName: "How to Film",
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Stops iOS zooming the page when a text field is focused mid-shoot.
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <ProjectStoreProvider>
          <NavShell>{children}</NavShell>
        </ProjectStoreProvider>
      </body>
    </html>
  );
}
