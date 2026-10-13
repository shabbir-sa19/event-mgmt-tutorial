'use client'

import { Button } from '@/components/ui/button';
import { ErrorInfo } from 'next/error';
import { useEffect } from 'react'

export default function ErrorPage({ error, retry }: ErrorInfo) {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => retry()}> Try again </Button>
    </div>
  )
}