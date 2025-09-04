# 🔐 Hacker's Portfolio

A cutting-edge cybersecurity portfolio featuring advanced animations, Matrix-style effects, and a sleek hacker-themed design. Built with Next.js 15 and modern web technologies.

![Hacker's Portfolio](screenshot.png)

## ⚡ Features

- **Hacker-Themed Design**: Cyberpunk aesthetics with Matrix rain effects
- **Advanced Animations**: Powered by Motion library with smooth transitions
- **Interactive Matrix Background**: Real-time animated code rain effect
- **Scroll-Based Content Hiding**: Content dynamically shows/hides during navigation
- **Responsive Sidebar**: Collapsible navigation with animated icons
- **Glassmorphism Effects**: Modern backdrop blur and transparency effects
- **Terminal Interface**: Hidden `/terminal` route with CLI functionality
- **Optimized Performance**: React 18 with enhanced compatibility

## 🎯 Core Sections

- **Hero Section**: Dynamic landing with animated hacker-style introductions
- **About**: Professional cybersecurity background and expertise
- **Projects**: Showcase of penetration testing and security projects
- **Skills**: Interactive skill displays with animated progress indicators
- **Contact**: Professional contact information with social links
- **Certificates**: Security certifications and achievements
- **Terminal**: Interactive command-line interface experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6
- **React**: v18.3.1 (Optimized for deployment compatibility)
- **Animations**: Motion v12.23.12 (Advanced animation library)
- **Styling**: Tailwind CSS with custom hacker theme
- **UI Components**: Radix UI + shadcn/ui
- **Matrix Effects**: Three.js + GSAP for 3D animations
- **Icons**: Lucide React + Custom hacker icons
- **Fonts**: Inter + JetBrains Mono (Hacker aesthetic)
- **Type Safety**: TypeScript 5.3.2
- **Deployment**: Vercel with optimized build configuration

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/XploitMonk0x01/aurasec-folio.git
```

2. Install dependencies:

```bash
cd aurasec-folio
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the hacker portfolio

## 🎮 Special Effects

### Matrix Rain Animation

- Real-time canvas-based Matrix code rain
- Performance-optimized with requestAnimationFrame
- Customizable character sets and falling speed

### Motion Animations

- Staggered navigation item reveals
- Rotating shield icon with glow effects
- Scan line effects on hover
- Smooth scroll-based content transitions

### Hacker Theme Elements

- Terminal-style cursor blinking
- Data stream visualizations
- Glassmorphism header effects
- Green glow and shadow effects

## 🔧 Terminal Commands

The interactive terminal interface (`/terminal`) supports these hacker-style commands:

- `whoami` - Display hacker profile information
- `skills` - List penetration testing and security skills
- `exploits` - Show security project portfolio
- `education` - Display cybersecurity education background
- `contact` - Retrieve secure contact information
- `help` - Show all available commands
- `clear` - Clear terminal screen
- `banner` - Display ASCII art welcome banner
- `scan` - Simulate network scanning (easter egg)
- `hack` - Fun hacker simulation command

## 🎨 Customization

### Theme Customization

1. **Colors**: Modify the hacker green theme in `tailwind.config.ts`
2. **Matrix Effect**: Adjust canvas animation in the layout component
3. **Animations**: Customize Motion variants for different effects

### Content Updates

1. **Personal Info**: Update contact details in Header component
2. **Skills**: Modify skills data in the Skills section
3. **Projects**: Add your cybersecurity projects
4. **Certificates**: Update with your security certifications

### Performance Optimization

- Animations are optimized with `will-change` CSS properties
- Matrix effect uses efficient canvas rendering
- Scroll listeners use passive event handlers
- Debounced scroll detection prevents excessive re-renders

## 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Collapsible Sidebar**: Smart navigation that adapts to screen size
- **Touch Interactions**: Enhanced mobile gesture support
- **Performance**: Optimized animations for mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🔐 Security & Performance Features

- **Type Safety**: Full TypeScript implementation
- **Secure Links**: All external links properly secured
- **XSS Prevention**: Sanitized content rendering
- **Performance Monitoring**: Vercel Analytics integration
- **SEO Optimized**: Proper meta tags and structured data
- **Bundle Optimization**: Tree-shaking and code splitting

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Create a `.env.local` file for any required environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🧪 Development

### Project Structure

```
src/
├── app/                 # Next.js 15 App Router
├── components/         # Reusable React components
│   ├── ui/            # shadcn/ui components
│   └── sections/      # Page sections
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── services/          # API services
```

### Code Quality

- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (optional)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- LinkedIn: [chandansemwal](https://www.linkedin.com/in/chandansemwal)
- GitHub: [XploitMonk0x01](https://github.com/XploitMonk0x01)
- Email: ethicalrobo06@gmail.com

## 🙏 Acknowledgments

- **[Motion](https://motion.dev/)** - Next-generation animation library
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible UI components
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Three.js](https://threejs.org/)** - 3D graphics and Matrix effects
- **[GSAP](https://greensock.com/gsap/)** - Professional animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

---
