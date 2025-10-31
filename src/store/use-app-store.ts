import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  isTerminalOpen: boolean
  themeMode: 'kali' | 'parrot' | 'default'
  setTerminalOpen: (isOpen: boolean) => void
  toggleTerminal: () => void
  setThemeMode: (theme: 'kali' | 'parrot' | 'default') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isTerminalOpen: false,
      themeMode: 'kali',
      setTerminalOpen: (isOpen) => set({ isTerminalOpen: isOpen }),
      toggleTerminal: () =>
        set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
      setThemeMode: (theme) => set({ themeMode: theme }),
    }),
    {
      name: 'app-storage',
    }
  )
)
