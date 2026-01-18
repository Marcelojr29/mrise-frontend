import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WhatsAppButton } from "@/components/whatsapp-button"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MRISE TECH - Consultoria em Desenvolvimento Web",
  description: "Transformamos sistemas empresariais com consultoria especializada em desenvolvimento full stack",
  generator: "mrise-tech",
  icons: {
    icon: [
      {
        url: "/mrise-logo-favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/mrise-logo-favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/mrise-logo-favicon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/mrise-logo-favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
