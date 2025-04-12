'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Terminal as TerminalIcon,
  Command,
  User,
  Book,
  Mail,
  HelpCircle,
} from 'lucide-react'

const commands = [
  {
    cmd: 'whoami',
    response: 'chandan-semwal',
    icon: <User className="w-4 h-4 text-blue-400" />,
  },
  {
    cmd: 'skills',
    response: `
    Technical Skills:
    ├── Penetration Testing
    │   ├── Metasploit
    │   ├── Burp Suite
    │   └── OWASP ZAP
    ├── Network Analysis
    │   ├── Wireshark
    │   ├── Nmap
    │   └── TCPdump
    ├── Programming
    │   ├── Python
    │   ├── Bash
    │   └── JavaScript
    └── Other Tools
        ├── Linux
        ├── CTF
        └── IDS/IPS
    `,
    icon: <Command className="w-4 h-4 text-green-400" />,
  },
  {
    cmd: 'education',
    response: `
    🎓 Parul University
    ├── Degree: B.Tech IEP Quick Heal
    ├── Year: 2nd Year
    ├── GPA: 3.8/4.0
    └── Key Courses:
        ├── Network Security
        ├── Ethical Hacking
        ├── Digital Forensics
        └── Cloud Security
    `,
    icon: <Book className="w-4 h-4 text-yellow-400" />,
  },
  {
    cmd: 'contact',
    response: `
    📧 Email: ethicalrobo06@gmail.com
    🐦 Twitter: @t_shelby
    💼 LinkedIn: /in/chandansemwal
    🔐 HackTheBox: /thomas_shelby
    `,
    icon: <Mail className="w-4 h-4 text-purple-400" />,
  },
  {
    cmd: 'help',
    response: `Available commands:
    ├── whoami   - Display user information
    ├── skills   - List technical skills
    ├── education- Show academic background
    ├── contact  - Display contact information
    ├── clear    - Clear terminal
    └── banner   - Display welcome banner
    `,
    icon: <HelpCircle className="w-4 h-4 text-red-400" />,
  },
]

const banner = `
███████╗██╗  ██╗███████╗██╗     ██████╗ ██╗   ██╗
██╔════╝██║  ██║██╔════╝██║     ██╔══██╗╚██╗ ██╔╝
███████╗███████║█████╗  ██║     ██████╔╝ ╚████╔╝ 
╚════██║██╔══██║██╔══╝  ██║     ██╔══██╗  ╚██╔╝  
███████║██║  ██║███████╗███████╗██████╔╝   ██║   
╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝    ╚═╝   
                                                  
Type 'help' for available commands
`

export default function Terminal() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<
    { cmd: string; response: string; icon?: JSX.Element }[]
  >([{ cmd: 'banner', response: banner }])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorBlink, setCursorBlink] = useState(true)

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.toLowerCase()
    let response = 'Command not found. Type "help" for available commands.'
    let icon = undefined

    if (cmd === 'clear') {
      setOutput([])
    } else if (cmd === 'banner') {
      setOutput([...output, { cmd: input, response: banner }])
    } else {
      const foundCmd = commands.find((c) => c.cmd === cmd)
      if (foundCmd) {
        response = foundCmd.response
        icon = foundCmd.icon
      }

      setOutput([...output, { cmd: input, response, icon }])
    }

    setHistory([...history, input])
    setHistoryIndex(-1)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault()
      const newIndex =
        historyIndex < history.length - 1
          ? historyIndex + 1
          : history.length - 1
      setHistoryIndex(newIndex)
      setInput(history[history.length - 1 - newIndex])
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault()
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setInput(newIndex >= 0 ? history[history.length - 1 - newIndex] : '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matchingCommands = commands
        .map((c) => c.cmd)
        .filter((c) => c.startsWith(input.toLowerCase()))

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      }
    }
  }

  return (
    <section className="py-16 px-4" id="terminal">
      <motion.div
        className="max-w-3xl mx-auto bg-[#1A1A1A] border border-[#00FF00] rounded-lg overflow-hidden shadow-lg shadow-[#00FF00]/20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-[#0D0D0D] border-b border-[#00FF00]">
          <div className="flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center text-sm text-[#00FF00]">
              <TerminalIcon className="w-4 h-4 mr-2" />
              shelby@terminal:~$
            </div>
          </div>
          <div className="text-xs text-[#00FF00] opacity-50">
            {new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
        </div>
        <div className="p-4 font-mono h-[480px] overflow-y-auto">
          {output.map((item, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-center text-[#00FF00]">
                <span className="mr-2">$</span>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span className="text-[#00D4FF]">{item.cmd}</span>
              </div>
              <div className="text-[#FFFFFF] whitespace-pre-wrap ml-6">
                {item.response}
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center group">
            <span className="text-[#00FF00] mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#00D4FF] outline-none group-focus-within:caret-[#00FF00]"
              autoFocus
              spellCheck="false"
            />
            <span
              className={`w-2 h-5 ml-1 bg-[#00FF00] ${
                cursorBlink ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </form>
        </div>
      </motion.div>
    </section>
  )
}
