"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./providers/theme-provider"
import QueryProvider from "./providers/query-provider"
import StoreProvider from "./providers/store-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}