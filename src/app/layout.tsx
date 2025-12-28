'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import { useHotkeys } from '@/lib/hooks/useHotkeys'
import { Toaster } from '@/components/ui/toaster'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import Link from 'next/link'
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
// import { CertificatesSection } from '@/components/CertificatesSection'
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'
import Header from '@/components/Header'
import { motion } from 'motion/react'
import { BootSequence } from '@/components/BootSequence'

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const navigation = [
  { name: 'Home', href: '/', icon: Icons.home },
  { name: 'About', href: '/about', icon: Icons.user },
  { name: 'Projects', href: '/projects', icon: Icons.workflow },
  { name: 'Skills', href: '/skills', icon: Icons.code },
  { name: 'Contact', href: '/contact', icon: Icons.mail },
  { name: 'Certificates', href: '/certificates', icon: Icons.file },
  { name: 'Terminal', href: '/terminal', icon: Icons.terminal },
]

// Memoized NavigationItems component to prevent re-creation
const NavigationItems = React.memo(() => {
  const { setOpenMobile, isMobile } = useSidebar()
  const router = useRouter()

  const handleNavigation = useCallback(
    (href: string) => {
      if (isMobile) {
        setOpenMobile(false)
      }
      router.push(href)
    },
    [isMobile, setOpenMobile, router]
  )

  return (
    <SidebarMenu>
      {navigation.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: index * 0.08,
            duration: 0.4,
            type: 'spring',
            stiffness: 120,
          }}
          whileHover={{
            x: 6,
            transition: { duration: 0.15 },
          }}
        >
          <SidebarMenuItem>
            <motion.div
              whileHover={{
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderLeft: '3px solid #00ff00',
                paddingLeft: '8px',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden"
            >
              <SidebarMenuButton
                onClick={() => handleNavigation(item.href)}
                className="w-full relative"
              >
                <motion.div className="flex items-center">
                  {item.icon && (
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        filter: 'drop-shadow(0 0 8px #00ff00)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    </motion.div>
                  )}
                  <motion.span
                    whileHover={{
                      color: '#00ff00',
                      textShadow: '0 0 8px #00ff00',
                    }}
                  >
                    {item.name}
                  </motion.span>
                </motion.div>

                {/* Hacker scan line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: { duration: 0.6 },
                  }}
                />
              </SidebarMenuButton>
            </motion.div>
          </SidebarMenuItem>
        </motion.div>
      ))}
    </SidebarMenu>
  )
})

NavigationItems.displayName = 'NavigationItems'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pageContentRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [showBootSequence, setShowBootSequence] = useState(false)
  const matrixCleanupRef = useRef<(() => void) | null>(null)

  // Memoized Matrix initialization to prevent recreation
  const initMatrix = useCallback(() => {
    if (typeof window === 'undefined') return null // Prevent SSR issues

    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    let animationId: number
    let resizeListener: () => void

    // Set canvas size with better performance
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
        canvas.width = innerWidth
        canvas.height = innerHeight
      }
    }

    resizeCanvas()
    resizeListener = resizeCanvas
    window.addEventListener('resize', resizeListener, { passive: true })

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-='
    const fontSize = 14 // Larger for better visibility
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    let lastTime = 0
    const targetFPS = 30 // Limit FPS for better performance
    const frameTime = 1000 / targetFPS

    const draw = (currentTime: number) => {
      // Throttle animation to target FPS
      if (currentTime - lastTime >= frameTime) {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)' // More visible trails
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Brighter green color for the matrix characters
        ctx.fillStyle = '#00FF41' // Slightly brighter green
        ctx.font = `${fontSize}px monospace`

        // Process more drops for better visibility
        const step = Math.max(1, Math.floor(columns / 150)) // More characters
        for (let i = 0; i < columns; i += step) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
            drops[i] = 0
          }
          drops[i]++
        }

        lastTime = currentTime
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    // Return cleanup function
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)

    // Only run client-side code after mount
    if (typeof window !== 'undefined') {
      // Check if boot sequence has been shown this session
      const hasSeenBoot = sessionStorage.getItem('bootSequenceShown')
      if (!hasSeenBoot) {
        setShowBootSequence(true)
      }

      // Initialize Matrix with cleanup reference
      matrixCleanupRef.current = initMatrix()
    }

    return () => {
      // Cleanup matrix animation
      if (matrixCleanupRef.current) {
        matrixCleanupRef.current()
      }
    }
  }, [initMatrix])

  const handleBootComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('bootSequenceShown', 'true')
    }
    setShowBootSequence(false)
  }, [])

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased aurasec-theme dark`}
      >
        {/* Boot sequence - shows once per session */}
        {showBootSequence && <BootSequence onComplete={handleBootComplete} />}

        {/* Matrix canvas - always visible and more prominent */}
        <motion.canvas
          id="matrix-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
            willChange: 'opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isMounted ? 0.8 : 0, // More visible opacity when mounted
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        />
        <SidebarProvider>
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <Sidebar collapsible="icon">
              <SidebarHeader>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link href="#" className="flex items-center space-x-2">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        filter: [
                          'drop-shadow(0 0 5px #00ff00)',
                          'drop-shadow(0 0 15px #00ff00)',
                          'drop-shadow(0 0 5px #00ff00)',
                        ],
                      }}
                      transition={{
                        rotate: {
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                        filter: { duration: 2, repeat: Infinity },
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Icons.shield
                        className="h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <motion.span
                      className="font-bold hidden group-data-[state=expanded]:block"
                      animate={{
                        textShadow: [
                          '0 0 5px #00ff00',
                          '0 0 10px #00ff00, 0 0 20px #00ff00',
                          '0 0 5px #00ff00',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Hacker's Portfolio
                    </motion.span>
                  </Link>
                </motion.div>
                <SidebarSeparator />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <SidebarGroupLabel>NAVIGATION</SidebarGroupLabel>
                  </motion.div>
                  <NavigationItems />
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarSeparator />
                <motion.p
                  className="text-xs text-muted-foreground px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  &copy; 2025 Thomas Shelby. All rights reserved.
                </motion.p>
              </SidebarFooter>
            </Sidebar>
          </motion.div>
          <SidebarInset>
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Header />
            </motion.div>
            <main className="flex-1 pt-16 overflow-x-hidden">
              <div
                ref={pageContentRef}
                className="container py-12 max-w-full overflow-x-hidden"
              >
                {/* Simplified: removed nested motion wrappers that were hiding content */}
                {children}

                {/* Background effects - only render after mount to prevent hydration issues */}
                {isMounted && (
                  <>
                    {/* Cool hacker scan lines effect */}
                    <motion.div
                      className="fixed inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 7,
                      }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-0 right-0 h-px bg-green-500/40"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{
                            y:
                              typeof window !== 'undefined'
                                ? window.innerHeight + 10
                                : 1000,
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 8,
                            ease: 'linear',
                          }}
                        />
                      ))}
                    </motion.div>
                  </>
                )}

                {/* Additional background effects - only render after mount */}
                {isMounted && (
                  <>
                    {/* Optimized Data streams effect - Reduced from 6 to 3 */}
                    <motion.div
                      className="fixed top-0 left-0 w-full h-full pointer-events-none z-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 3, duration: 1.5 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-px bg-gradient-to-b from-transparent via-green-500/15 to-transparent"
                          style={{
                            left: `${(i + 1) * 25}%`,
                            height: '100%',
                            willChange: 'transform',
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: [0, 1, 0] }}
                          transition={{
                            duration: 6,
                            delay: i * 1.5,
                            repeat: Infinity,
                            repeatDelay: 15,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Optimized Terminal cursor blink */}
                    <motion.div
                      className="fixed bottom-4 right-4 w-2 h-4 bg-green-500 pointer-events-none z-20"
                      style={{ willChange: 'opacity' }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Reduced Scan lines effect - From many to 2 */}
                    <motion.div
                      className="fixed inset-0 pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ delay: 2, duration: 1 }}
                    >
                      {[...Array(2)].map((_, i: number) => (
                        <motion.div
                          key={i}
                          className="absolute left-0 right-0 h-px bg-green-500/20"
                          style={{
                            top: `${30 + i * 30}%`,
                            willChange: 'transform, opacity',
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                            repeatDelay: 8,
                          }}
                        />
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
