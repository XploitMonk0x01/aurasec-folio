'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/use-app-store'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  toolType: 'recon' | 'exploit' | 'forensics' | 'osint' | 'none'
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  command: string
}

const toolTypeColors = {
  recon: 'border-cyan text-cyan',
  exploit: 'border-neon text-neon',
  forensics: 'border-amber text-amber',
  osint: 'border-blue-500 text-blue-500',
  none: 'border-gray-500 text-gray-500',
}

export function ProjectCard({
  id,
  title,
  description,
  toolType,
  tags,
  demoUrl,
  repoUrl,
  command,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toggleTerminal } = useAppStore()

  const handleRunCommand = () => {
    // Copy command to clipboard
    navigator.clipboard.writeText(command)
    // Open terminal
    toggleTerminal()
  }

  return (
    <motion.div
      className={`relative p-4 rounded-lg border bg-panel/80 backdrop-blur-sm ${toolTypeColors[toolType]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Tool Type Badge */}
      <div className="absolute -top-3 left-4 px-2 py-1 text-xs font-mono rounded-md bg-bg900">
        [{toolType.toUpperCase()}]
      </div>

      {/* Title Bar */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-mono">{title}</h3>
        <div className="flex gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-primary transition-colors"
            >
              [demo]
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-primary transition-colors"
            >
              [repo]
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-subtle mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-bg900 text-subtle"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Command Bar */}
      <div className="flex items-center gap-2 font-mono text-sm">
        <code className="px-2 py-1 rounded bg-bg900 flex-1">{command}</code>
        <button
          onClick={handleRunCommand}
          className="px-3 py-1 rounded-md hover:bg-neon/10 text-neon transition-colors"
        >
          [RUN]
        </button>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-current"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
