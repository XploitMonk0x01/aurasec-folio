import type { Metadata } from 'next'
import './globals.css'
import VisualEditsMessenger from '../visual-edits/VisualEditsMessenger'
import ErrorReporter from '@/components/ErrorReporter'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Aura Operator',
  description:
    'Interactive cyber-operator portfolio for DFIR, OSINT, VAPT, frontend engineering, and security writeups.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="62c5fb0d-5ddc-44f0-8ca6-f779da836ca7"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "Aura Operator", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  )
}
