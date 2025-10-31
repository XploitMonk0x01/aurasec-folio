'use client'

import { BootSequence } from '@/components/BootSequence'
import { useState } from 'react'

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <BootSequence
          onComplete={() => {
            setIsLoading(false)
          }}
        />
      )}
    </>
  )
}
