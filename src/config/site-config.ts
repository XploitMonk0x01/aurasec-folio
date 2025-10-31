export interface SiteConfig {
  name: string
  title: string
  role: string
  description: string
  socialLinks: {
    github: string
    twitter: string
    linkedin: string
  }
  themes: {
    [key: string]: {
      background: string
      foreground: string
      accent: string
    }
  }
  hotkeys: {
    [key: string]: {
      key: string
      description: string
    }
  }
}

export const siteConfig: SiteConfig = {
  name: 'Thomas Shelby',
  title: 'Offensive Security | Blue Team | Bug Hunter',
  role: 'Security Researcher',
  description:
    'Cybersecurity portfolio showcasing offensive security research, blue team operations, and bug hunting achievements.',
  socialLinks: {
    github: 'https://github.com/XploitMonk0x01',
    twitter: 'https://twitter.com/t_shelby',
    linkedin: 'https://linkedin.com/in/your-profile',
  },
  themes: {
    kali: {
      background: '#0b0f10',
      foreground: '#bfeecf',
      accent: '#00ff7a',
    },
    parrot: {
      background: '#0a0e27',
      foreground: '#e6eef3',
      accent: '#00d7ff',
    },
    default: {
      background: '#0b0f10',
      foreground: '#e6eef3',
      accent: '#00ff7a',
    },
  },
  hotkeys: {
    terminal: {
      key: '~',
      description: 'Toggle terminal',
    },
    help: {
      key: '?',
      description: 'Show keyboard shortcuts',
    },
    escape: {
      key: 'Esc',
      description: 'Close current overlay/modal',
    },
    command: {
      key: 'Ctrl+K',
      description: 'Open command palette',
    },
  },
}
