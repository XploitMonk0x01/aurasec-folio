export interface Project {
  id: string
  title: string
  description: string
  toolType: 'recon' | 'exploit' | 'forensics' | 'osint' | 'none'
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  command: string
}

export const projects: Project[] = [
  {
    id: 'socialtracer',
    title: 'SocialTracer [BETA]',
    description: 'Advanced OSINT Username Investigation Platform',
    toolType: 'osint',
    tags: ['React', 'FastAPI', 'Tailwind CSS', 'Python'],
    demoUrl: 'https://socialtracer.demo.com',
    repoUrl: 'https://github.com/XploitMonk0x01/SocialTracer',
    command: 'open project:',
  },
  {
    id: 'trekconnect',
    title: 'Trek Connect',
    description:
      'A modern, AI-powered travel application connecting trekkers worldwide',
    toolType: 'none',
    tags: ['Next.js', 'Firebase', 'Gemini', 'TailwindCSS'],
    demoUrl: 'https://trekconnect.vercel.app/',
    repoUrl: 'https://github.com/XploitMonk0x01/TrekConnect',
    command: 'open project:trekconnect-site',
  },
]
