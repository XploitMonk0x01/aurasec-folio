'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
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
// import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
// import { CertificatesSection } from '@/components/CertificatesSection'
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'
import Header from '@/components/Header'
import { motion } from 'motion/react'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pageContentRef = useRef<HTMLDivElement>(null)
  const [isContentVisible, setIsContentVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const NavigationItems = () => {
    const { setOpenMobile, isMobile } = useSidebar()

    const handleNavigation = (href: string) => {
      if (isMobile) {
        setOpenMobile(false)
      }
      router.push(href)
    }

    return (
      <SidebarMenu>
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              x: 8,
              transition: { duration: 0.2 },
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
                        <item.icon
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
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
  }

  useEffect(() => {
    setIsMounted(true)

    const initMatrix = () => {
      const canvas = document.getElementById(
        'matrix-canvas'
      ) as HTMLCanvasElement
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-='
      const fontSize = 10
      const columns = Math.floor(canvas.width / fontSize)

      // Initialize drops array with proper typing
      const drops: number[] = Array(columns).fill(1)

      const draw = () => {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Green color for the matrix characters
        ctx.fillStyle = '#00FF00'
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < columns; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      // Start animation
      const intervalId = setInterval(draw, 30)

      // Cleanup function
      return () => {
        clearInterval(intervalId)
        window.removeEventListener('resize', resizeCanvas)
      }
    }

    const cleanup = initMatrix()

    // Scroll effect: hide content on scroll up, show on scroll down
    let lastY = window.scrollY
    let ticking = false
    const threshold = 4

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          const el = pageContentRef.current
          if (!el) return

          const dy = y - lastY
          let shouldShow = true

          if (dy < -threshold && y > 100) {
            // scrolling up -> hide content (only after scrolling past header)
            shouldShow = false
          } else if (dy > threshold || y <= 100) {
            // scrolling down OR at top -> show content
            shouldShow = true
          }

          // Update state and classes together
          setIsContentVisible(shouldShow)

          if (shouldShow) {
            el.classList.add('show-on-scroll-down')
            el.classList.remove('hide-on-scroll-up')
          } else {
            el.classList.add('hide-on-scroll-up')
            el.classList.remove('show-on-scroll-down')
          }

          lastY = y
          ticking = false
        })
        ticking = true
      }
    }

    // Add small delay to prevent initial flash
    const timer = setTimeout(() => {
      window.addEventListener('scroll', onScroll, { passive: true })
    }, 100)

    return () => {
      clearTimeout(timer)
      cleanup && cleanup()
      window.removeEventListener('scroll', onScroll)
    }
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
        <motion.canvas
          id="matrix-canvas"
          style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
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
                  &copy; {new Date().getFullYear()} Thomas Shelby. All rights
                  reserved.
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
            <main className="flex-1 pt-16">
              <motion.div
                ref={pageContentRef}
                className={`container py-12 page-content ${
                  isMounted && isContentVisible ? 'show-on-scroll-down' : ''
                }`}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{
                  opacity: isContentVisible ? 1 : 0,
                  y: isContentVisible ? 0 : -20,
                  scale: isContentVisible ? 1 : 0.98,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: false, amount: 0.1 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  }}
                  viewport={{ once: false }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                  >
                    {children}
                  </motion.div>
                </motion.div>

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
                  {isMounted &&
                    [...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-0 right-0 h-px bg-green-500/40"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{
                          y: window.innerHeight + 10,
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

                {/* Data streams effect */}
                <motion.div
                  className="fixed top-0 left-0 w-full h-full pointer-events-none z-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
                      style={{
                        left: `${(i + 1) * 16.666}%`,
                        height: '100%',
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: [0, 1, 0] }}
                      transition={{
                        duration: 4,
                        delay: i * 0.8,
                        repeat: Infinity,
                        repeatDelay: 10,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>

                {/* Terminal cursor blink */}
                <motion.div
                  className="fixed bottom-4 right-4 w-2 h-4 bg-green-500 pointer-events-none z-20"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Scan lines effect */}
                <motion.div
                  className="fixed inset-0 pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {[...Array(3)].map((_, i: number) => (
                    <motion.div
                      key={i}
                      className="absolute left-0 right-0 h-px bg-green-500/30"
                      style={{ top: `${25 + i * 20}%` }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 6,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
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
