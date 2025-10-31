'use client'

import dynamic from 'next/dynamic'
import { useHotkeys } from '@/lib/hooks/useHotkeys'
import { useAppStore } from '@/store/use-app-store'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'

// Lazy load components with loading states
const TerminalOverlay = dynamic(
  () => import('@/components/terminal/TerminalOverlay'),
  {
    ssr: false,
    loading: () => null,
  }
)

const MatrixCanvas = dynamic(() => import('@/components/canvas/MatrixCanvas'), {
  ssr: false,
  loading: () => null,
})

const BackgroundScene = dynamic(
  () => import('@/components/canvas/BackgroundScene'),
  {
    ssr: false,
    loading: () => null,
  }
)

export default function Home() {
  const { isTerminalOpen, toggleTerminal, setTerminalOpen } = useAppStore()

  useHotkeys({
    terminal: () => toggleTerminal(),
    escape: () => setTerminalOpen(false),
  })

  return (
    <div className="relative min-h-screen">
      {/* Layered background effects */}
      <div className="fixed inset-0 -z-20 bg-bg900" />
      <BackgroundScene />
      <div className="fixed inset-0 -z-10 opacity-40">
        <MatrixCanvas />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </div>

      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Keyboard help tooltip */}
      <div className="fixed bottom-4 right-4 text-subtle text-sm">
        Press <kbd className="px-2 py-1 bg-panel rounded">Shift</kbd>+
        <kbd className="px-2 py-1 bg-panel rounded">~</kbd> for terminal
      </div>
    </div>
  )
}
