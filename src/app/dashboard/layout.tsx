"use client"
import React, { Suspense } from 'react'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/AppSidebar'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import ErrorPage from './error'
import Loading from './loading'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className="h-[calc(100dvh-3.5rem)] min-h-0 shrink-0 overflow-hidden"
    >
      <AppSidebar />
      <SidebarInset className="m-2 min-h-0 min-w-0 overflow-auto p-2">
        <div className="min-w-0">
          <Suspense fallback={<Loading />}>
            <ErrorBoundary errorComponent={ErrorPage}>
              {children}
            </ErrorBoundary>
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
