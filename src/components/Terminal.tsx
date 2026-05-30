'use client'

import React, { FormEvent, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CornerDownLeft, RotateCcw, TerminalSquare } from 'lucide-react'

interface TerminalProps {
  lines: string[]
}

type Entry = {
  kind: 'system' | 'command' | 'response'
  text: string
}

const commandHelp = [
  'help        list available commands',
  'whoami      operator identity',
  'skills      core capability clusters',
  'projects    active project dossiers',
  'certs       certification summary',
  'contact     secure communication channel',
  'scan        run portfolio surface scan',
  'clear       reset terminal buffer',
]

export function Terminal({ lines }: TerminalProps) {
  const [entries, setEntries] = useState<Entry[]>(
    lines.map((line) => ({ kind: 'system', text: line })),
  )
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Record<string, string[]>>(
    () => ({
      help: commandHelp,
      whoami: [
        'CALLSIGN: XPLOITMONK0X01',
        'OPERATOR: CHANDAN SINGH',
        'ROLE: DFIR_PRACTITIONER // OSINT_SPECIALIST // PROMPT_ENGINEER',
        'BASE: VADODARA, INDIA',
      ],
      skills: [
        'CYBER: Digital Forensics, OSINT, Incident Response, VAPT, Cloud Security',
        'ADVANCED: Mobile App Pentesting, Malware Analysis, Reverse Engineering, Threat Research',
        'DEV: Next.js, MERN Stack, Docker, React Native, C/C++',
        'SCRIPTING: Python, JavaScript, Bash, PowerShell',
      ],
      projects: [
        'TREK CONNECT       DEPLOYED          AI-powered travel network',
        'XPLOITVERSE        IN_TESTING        Security lab universe and guided cyber arena',
        'SOCIAL TRACER      MISSION_CRITICAL  OSINT username investigation',
      ],
      certs: [
        '13 VERIFIED RECORDS FOUND',
        'Quick Heal Academy, Cisco Networking Academy, APIsec University, Udemy, SecOps Group',
      ],
      contact: [
        'EMAIL: ETHICALROBO06@GMAIL.COM',
        'LINKEDIN: linkedin.com/in/chandansemwal',
      ],
      scan: [
        'Scanning interface entropy...',
        'Interactive terminal: ONLINE',
        'Project dossiers: INDEXED',
        'Skill matrix: MAPPED',
        'Recommendation: recruit for DFIR + OSINT + full-stack missions',
      ],
    }),
    [],
  )

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const command = value.trim().toLowerCase()
    if (!command) return

    if (command === 'clear') {
      setEntries([{ kind: 'system', text: 'TERMINAL_BUFFER_RESET' }])
      setValue('')
      return
    }

    const response = commands[command] ?? [
      `UNKNOWN_COMMAND: ${command}`,
      'TYPE "help" TO VIEW AVAILABLE COMMANDS',
    ]

    setEntries((current) => [
      ...current,
      { kind: 'command', text: command },
      ...response.map((text) => ({ kind: 'response' as const, text })),
    ])
    setValue('')
  }

  return (
    <div
      className="relative w-full max-w-3xl overflow-hidden border border-paper/12 bg-ink/90 font-mono text-sm shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-red to-transparent" />
      <div className="flex items-center justify-between border-b border-paper/12 bg-paper/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <TerminalSquare className="h-4 w-4 text-signal-red" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-signal-red">
              dossier shell v5.5
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-paper-muted">
              interactive command shell
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setEntries([{ kind: 'system', text: 'TERMINAL_BUFFER_RESET' }])
          }}
          className="grid h-8 w-8 place-items-center border border-paper/15 text-paper-muted transition hover:border-signal-red hover:text-paper"
          aria-label="Reset terminal"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="max-h-[430px] min-h-[360px] overflow-y-auto p-4">
        {entries.map((entry, index) => (
          <motion.div
            key={`${entry.text}-${index}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className={`mb-1.5 flex gap-2 ${
              entry.kind === 'command' ? 'text-paper' : 'text-signal-red/90'
            }`}
          >
            <span
              className={
                entry.kind === 'response'
                  ? 'text-oxide'
                  : 'text-signal-red'
              }
            >
              {entry.kind === 'command' ? '$' : '>'}
            </span>
            <span className="leading-relaxed">{entry.text}</span>
          </motion.div>
        ))}

        <form onSubmit={submitCommand} className="mt-4 flex items-center gap-2">
          <span className="text-signal-red">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-paper caret-signal-red outline-none placeholder:text-paper-muted/45"
            placeholder="type help, scan, projects..."
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="grid h-8 w-8 place-items-center border border-paper/15 text-signal-red transition hover:border-signal-red hover:bg-signal-red hover:text-ink"
            aria-label="Run command"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
