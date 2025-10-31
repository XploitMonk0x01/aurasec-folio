'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useAppStore } from '@/store/use-app-store'
import { pgpPublicKey } from '@/config/security'

interface TerminalOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const TERMINAL_THEME = {
  background: '#0b0f10', // Consistent with bg900
  foreground: '#bfeecf',
  cursor: '#00ff7a', // Consistent with neon color
  selection: 'rgba(0,255,122,0.3)',
  black: '#000000',
  brightBlack: '#555555',
  red: '#ff2d95',
  brightRed: '#ff2d95',
  green: '#00ff7a',
  brightGreen: '#00ff7a',
  yellow: '#ffb86b',
  brightYellow: '#ffb86b',
  blue: '#00d7ff',
  brightBlue: '#00d7ff',
  magenta: '#ff2d95',
  brightMagenta: '#ff2d95',
  cyan: '#00d7ff',
  brightCyan: '#00d7ff',
  white: '#e6eef3',
  brightWhite: '#ffffff',
}

// Deterministic PRNG for simulated outputs
function seededRandom(seedStr: string) {
  let seed = 0
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0
  }
  return function () {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    return (seed >>> 0) / 4294967296
  }
}

export const TerminalOverlay = ({ isOpen, onClose }: TerminalOverlayProps) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInstance = useRef<Terminal>()
  const fitAddonRef = useRef<FitAddon>()

  useEffect(() => {
    if (!terminalRef.current || !isOpen) return

    const term = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontSize: 14,
      fontFamily: '"JetBrains Mono", monospace',
      theme: TERMINAL_THEME,
      allowTransparency: true,
    })

    const fitAddon = new FitAddon()
    fitAddonRef.current = fitAddon
    term.loadAddon(fitAddon)

    term.open(terminalRef.current)
    // Defer fit until the next frame to ensure dimensions are measurable
    const fitSafe = () => {
      try {
        fitAddonRef.current?.fit()
      } catch {
        // If it fails due to zero-dimension container, retry shortly
        requestAnimationFrame(() => {
          try {
            fitAddonRef.current?.fit()
          } catch {
            /* noop */
          }
        })
      }
    }
    requestAnimationFrame(fitSafe)

    term.writeln('AuraSec Portfolio Terminal [Version 1.0.0]')
    term.writeln('(c) 2025 Thomas Shelby. All rights reserved.')
    term.writeln('')
    term.write('> ')

    const handleCommand = (command: string) => {
      const [cmd, ...args] = command.trim().toLowerCase().split(' ')

      switch (cmd) {
        case 'help':
          term.writeln('\r\nAvailable commands:')
          term.writeln('  help           - Show this help message')
          term.writeln('  whoami         - Display user info')
          term.writeln('  pgp            - Display PGP public key')
          term.writeln(
            '  scan <target>  - Simulate a security scan (demo only)'
          )
          term.writeln('  theme <name>   - Switch theme (kali|parrot|default)')
          term.writeln('  clear          - Clear terminal')
          term.writeln('  exit           - Close terminal\r\n')
          break

        case 'whoami':
          term.writeln('\r\nThomas Shelby')
          term.writeln('Offensive Security | Blue Team | Bug Hunter')
          term.writeln('GitHub: @XploitMonk0x01')
          term.writeln('Twitter: @t_shelby\r\n')
          break

        case 'pgp':
          term.writeln('\r\n[+] Loading PGP Public Key...')
          term.writeln('[+] Key Type: RSA 4096-bit')
          term.writeln('[+] Purpose: Secure Communication\r\n')

          // Display PGP key line by line with slight delay effect
          const keyLines = pgpPublicKey.split('\n')
          keyLines.forEach((line, index) => {
            setTimeout(() => {
              term.writeln(line)
              if (index === keyLines.length - 1) {
                term.writeln('\r\n[✓] PGP Key displayed successfully')
                term.writeln('    Use this key to send encrypted messages\r\n')
                term.write('> ')
              }
            }, index * 10)
          })
          return // Skip the prompt write since we do it in setTimeout

        case 'scan':
          const target = args[0] || 'localhost'
          term.writeln(`\r\nSimulated Security Scan of ${target}`)
          term.writeln('Note: This is a demo scan with simulated output\r\n')

          const rand = seededRandom(target)
          const ports = [22, 80, 443, 3306, 8080].filter(() => rand() > 0.5)

          ports.forEach((port) => {
            const date = new Date().toISOString().split('T')[0]
            const time = new Date().toTimeString().split(' ')[0]
            term.writeln(`${date} ${time} | ${port}/tcp open`)
          })
          term.writeln('\r\n')
          break

        case 'clear':
          term.clear()
          break

        case 'theme':
          const themeName = args[0]
          if (
            !themeName ||
            !['kali', 'parrot', 'default'].includes(themeName)
          ) {
            term.writeln('\r\nUsage: theme <kali|parrot|default>\r\n')
            break
          }
          useAppStore
            .getState()
            .setThemeMode(themeName as 'kali' | 'parrot' | 'default')
          term.writeln(`\r\nSwitched to ${themeName} theme\r\n`)
          break

        case 'exit':
          onClose()
          break

        default:
          if (command.trim()) {
            term.writeln(`\r\nCommand not found: ${command}\r\n`)
          }
      }

      term.write('> ')
    }

    let currentCommand = ''

    term.onData((e) => {
      switch (e) {
        case '\r': // Enter
          term.writeln('')
          handleCommand(currentCommand)
          currentCommand = ''
          break
        case '\u007F': // Backspace
          if (currentCommand.length > 0) {
            currentCommand = currentCommand.slice(0, -1)
            term.write('\b \b')
          }
          break
        default:
          currentCommand += e
          term.write(e)
      }
    })

    terminalInstance.current = term

    const handleResize = () => {
      fitSafe()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [isOpen, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-200 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-panel backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-[rgba(0,0,0,0.35)] border-b border-[rgba(255,255,255,0.03)]">
          <h2 className="text-neon font-mono">AuraSec Terminal</h2>
          <button
            onClick={onClose}
            className="px-2 py-1 text-subtle hover:text-primary transition-colors"
          >
            ×
          </button>
        </div>
        <div ref={terminalRef} className="h-[calc(100vh-40px)]" />
      </div>
    </div>
  )
}

export default TerminalOverlay
