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
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

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
      if (contentRef.current?.children) {
        gsap.fromTo(
          contentRef.current.children,
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
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-6 md:py-12">
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle className="text-2xl">About Me</CardTitle>
          <CardDescription>
            A brief overview of my background and interests.
          </CardDescription>
        </CardHeader>
        <CardContent ref={contentRef} className="p-4 md:p-6">
          <p>
            I am a cybersecurity student at Parul University, currently in my
            3rd year. I am passionate about network security, ethical hacking,
            and protecting digital assets.
          </p>
          <br />
          <p>My technical skills include:</p>
          <ul>
            <li>- Penetration Testing</li>
            <li>- Network Analysis</li>
            <li>- Cloud Security</li>
            <li>- OSINT</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

export default AboutSection
