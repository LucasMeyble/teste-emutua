import type { Metadata } from "next";
import "./styles/globals.css";

import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/providers/sessionProviderWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'eMutua App',
  description: 'Sistema de gerenciamento de produtos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
