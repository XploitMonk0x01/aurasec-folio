'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Wait a frame to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Card animation
      if (cardRef.current && sectionRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }
        )
      }

      // Content animation
      if (
        contentRef.current?.children &&
        contentRef.current.children.length > 0
      ) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          }
        )
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-6 md:py-12">
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle className="text-2xl text-green-400">About Me</CardTitle>
          <CardDescription className="text-cyan-300">
            A brief overview of my background and interests.
          </CardDescription>
        </CardHeader>
        <CardContent ref={contentRef} className="p-4 md:p-6 text-green-100">
          <p className="text-cyan-200">
            I am a cybersecurity student at Parul University (3rd year). I'm
            passionate about network security, ethical hacking, and protecting
            digital assets. I also build web and Android apps.
          </p>
          <br />
          <p className="text-green-300">My technical skills include:</p>
          <ul className="text-green-200">
            <li>- Digital Forensics</li>
            <li>- Cloud Security</li>
            <li>- OSINT</li>
            <li>- VAPT</li>
            <li>- Network Analysis</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

export default AboutSection
