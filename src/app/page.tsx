import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import SocialLinks from '@/components/SocialLinks'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: "AuraSec - Hacker's Portfolio",
  description:
    "Professional hacker's portfolio showcasing ethical hacking skills, penetration testing, and security auditing expertise.",
  keywords: [
    'cybersecurity',
    'ethical hacking',
    'penetration testing',
    'VAPT',
    'security auditing',
  ],
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
