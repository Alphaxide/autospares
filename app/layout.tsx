import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"
// Remove the import for AdminButton
// Remove this line:
// import { AdminButton } from "@/components/admin-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AutoSpares Kenya - Premium Car Spare Parts",
  description: "Quality car spare parts for all makes and models. Fast delivery across Kenya.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            {/* Remove the AdminButton component from the body */}
            {/* Remove this line: */}
            {/* <AdminButton /> */}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'