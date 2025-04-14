'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { CertificatesSection } from '@/components/CertificatesSection'
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        {navigation.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              onClick={() => handleNavigation(item.href)}
              className="w-full"
            >
              {item.icon && (
                <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  useEffect(() => {
    const initMatrix = () => {
      const canvas = document.getElementById('matrix-canvas')
      if (!canvas) return

      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-='
      const fontSize = 10
      const columns = canvas.width / fontSize

      const drops = []
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00FF00' // Green color for the matrix
        ctx.font = `${fontSize}px arial`

        for (let i = 0; i < columns; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      setInterval(draw, 30)
    }

    initMatrix()
  }, [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased aurasec-theme`}
      >
        <canvas
          id="matrix-canvas"
          style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        />
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <Link href="#" className="flex items-center space-x-2">
                <Icons.shield
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
                <span className="font-bold">CyberSecurity Portfolio</span>
              </Link>
              <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>NAVIGATION</SidebarGroupLabel>
                <NavigationItems />
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarSeparator />
              <p className="text-xs text-muted-foreground px-2">
                &copy; {new Date().getFullYear()} Thomas Shelby. All rights
                reserved.
              </p>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-40 border-b bg-background">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden" />
                  <Link
                    href="#"
                    className="hidden items-center space-x-2 md:flex"
                  >
                    <Icons.shield
                      className="h-6 w-6 text-green-500"
                      aria-hidden="true"
                    />
                    <span className="font-bold">CyberSecurity Portfolio</span>
                  </Link>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="md:w-[300px]"
                    />
                    <Icons.search
                      className="absolute right-2.5 top-3 h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <nav className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icons.github className="mr-2 h-4 w-4" aria-hidden="true" />
                    GitHub
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icons.linkedin
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    LinkedIn
                  </Button>
                </nav>
              </div>
            </header>
            <main className="flex-1">
              <div className="container py-12">{children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <Analytics debug={process.env.NODE_ENV === 'development'} />
        <SpeedInsights />
      </body>
    </html>
  )
}
