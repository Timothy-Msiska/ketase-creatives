import React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminProvider } from "@/lib/admin-context"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Ketase Creatives | Design & Communications",
  description:
    "A creative and communications subsidiary of Ketase Group, delivering exceptional design, branding, and digital solutions.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: [
      {
        url: "/ketase-creatives-logo.svg",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/ketase-creatives-logo.svg",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "/creatives1.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {/* Global background circles */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={`
                absolute rounded-full
                blur-3xl
                animate-float
                ${
                  [
                    "bg-[var(--chart-1)]/14",
                    "bg-[var(--chart-2)]/14",
                    "bg-[var(--chart-3)]/14",
                    "bg-[var(--chart-4)]/12",
                    "bg-[var(--chart-5)]/18",
                  ][i % 5]
                }
              `}
              style={{
                width: `${180 + (i % 4) * 120}px`,
                height: `${180 + (i % 4) * 120}px`,
                top: `${(i * 13) % 100}%`,
                left: `${(i * 29) % 100}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <AdminProvider>
          <Header />
          <main className="relative pt-20">{children}</main>
        </AdminProvider>

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
