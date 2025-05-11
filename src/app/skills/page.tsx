'use client'

import React, { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const skills = [
  { name: 'VAPT', logo: '/images/skills/vapt.png' },
  { name: 'Network Analysis', logo: '/images/skills/network.png' },
  { name: 'OSINT', logo: '/images/skills/osint.png' },
  { name: 'Security Auditing', logo: '/images/skills/auditing.png' },
  { name: 'Incident Response', logo: '/images/skills/response.png' },
  { name: 'Cloud Security', logo: '/images/skills/cloud.png' },
  { name: 'Prompt Engineering', logo: '/images/skills/prompt.png' },
]

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skillsListRef = useRef<HTMLUListElement>(null)

  // Memoize animation callbacks
  const handleMouseEnter = useCallback(
    (item: HTMLElement, icon: HTMLImageElement, text: HTMLSpanElement) => {
      gsap.to(item, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        force3D: true,
      })

      gsap.to(icon, {
        rotation: 360,
        duration: 0.6,
        ease: 'power2.out',
        force3D: true,
      })

      gsap.to(text, {
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      })
    },
    []
  )

  const handleMouseLeave = useCallback(
    (item: HTMLElement, icon: HTMLImageElement, text: HTMLSpanElement) => {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: 'transparent',
        force3D: true,
      })

      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      })

      gsap.to(text, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      })
    },
    []
  )

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      // Optimize GSAP defaults
      gsap.defaults({
        ease: 'power2.out',
        force3D: true,
      })

      // Card animation with rotation
      if (cardRef.current && sectionRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            y: 100,
            opacity: 0,
            rotation: -5,
            scale: 0.95,
            willChange: 'transform, opacity',
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
              fastScrollEnd: true,
            },
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            clearProps: 'willChange',
          }
        )
      }

      // Header animation with split text effect
      if (cardRef.current) {
        const headerElements = [
          cardRef.current.querySelector('h2'),
          cardRef.current.querySelector('p'),
        ].filter(Boolean)

        if (headerElements.length) {
          gsap.fromTo(
            headerElements,
            {
              y: 30,
              opacity: 0,
              scale: 0.9,
              rotationX: 45,
              willChange: 'transform, opacity',
            },
            {
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                fastScrollEnd: true,
              },
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 1,
              stagger: 0.3,
              ease: 'back.out(1.7)',
              clearProps: 'willChange',
            }
          )
        }
      }

      // Skills grid animation with 3D effect
      if (skillsListRef.current?.children) {
        const skillItems = Array.from(skillsListRef.current.children)

        // Initial animation
        gsap.fromTo(
          skillItems,
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
            transformPerspective: 1000,
            willChange: 'transform, opacity',
          },
          {
            scrollTrigger: {
              trigger: skillsListRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              fastScrollEnd: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: {
              amount: 1,
              grid: [3, 3],
              from: 'center',
            },
            ease: 'back.out(1.7)',
            clearProps: 'willChange',
          }
        )

        // Add hover animations for each skill item
        skillItems.forEach((skillItem: Element) => {
          const item = skillItem as HTMLElement
          const icon = item.querySelector('img')
          const text = item.querySelector('span')

          if (icon && text) {
            item.addEventListener('mouseenter', () =>
              handleMouseEnter(
                item,
                icon as HTMLImageElement,
                text as HTMLSpanElement
              )
            )
            item.addEventListener('mouseleave', () =>
              handleMouseLeave(
                item,
                icon as HTMLImageElement,
                text as HTMLSpanElement
              )
            )
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [handleMouseEnter, handleMouseLeave])

  return (
    <section ref={sectionRef} id="skills" className="py-6 md:py-12">
      <Card ref={cardRef} className="transform-gpu will-change-transform">
        <CardHeader>
          <CardTitle className="text-2xl">Skills</CardTitle>
          <CardDescription>My arsenal of tools and techniques.</CardDescription>
        </CardHeader>
        <CardContent ref={contentRef}>
          <ul
            ref={skillsListRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 bg-card rounded-md shadow-md transition-all cursor-pointer hover:bg-card/80 transform-gpu will-change-transform"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="h-6 w-6 md:h-8 md:w-8 transition-transform will-change-transform"
                  loading="lazy"
                />
                <span className="text-base md:text-lg transition-transform will-change-transform">
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

export default SkillsSection
