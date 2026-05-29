import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

import { Navbar } from '@/components/layout/Navbar'

import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Maré Quente Biquínis',
  description: 'Loja oficial',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
