'use client'

import { useEffect, useCallback } from 'react'
import { siteConfig } from '@/config/site-config'

interface HotkeyHandler {
  [key: string]: () => void
}

export const useHotkeys = (handlers: HotkeyHandler) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      // Special handling for terminal key (Shift+~)
      if (key === '~' && event.shiftKey && handlers['terminal']) {
        event.preventDefault()
        handlers['terminal']()
        return
      }

      // Check for other hotkey matches
      Object.entries(siteConfig.hotkeys).forEach(([name, hotkey]) => {
        if (
          handlers[name] &&
          key === hotkey.key.toLowerCase() &&
          name !== 'terminal'
        ) {
          event.preventDefault()
          handlers[name]()
        }
      })

      // Special handling for Ctrl+K
      if (event.ctrlKey && key === 'k' && handlers['command']) {
        event.preventDefault()
        handlers['command']()
      }
    },
    [handlers]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}
