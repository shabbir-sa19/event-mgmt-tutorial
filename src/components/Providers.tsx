"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./providers/theme-provider"
import QueryProvider from "./providers/query-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  )
}