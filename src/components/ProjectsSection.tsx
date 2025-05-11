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

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const projectListRef = useRef<HTMLUListElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      // Card animation
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

      // Header animation
      const headerElements = [
        cardRef.current?.querySelector('h2'),
        cardRef.current?.querySelector('p'),
      ].filter(Boolean)

      if (headerElements.length) {
        gsap.fromTo(
          headerElements,
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

      // Project list items animation
      if (projectListRef.current?.children) {
        gsap.fromTo(
          projectListRef.current.children,
          { x: -50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: projectListRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-6 md:py-12">
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle className="text-2xl">Projects</CardTitle>
          <CardDescription>
            A selection of projects I've worked on.
          </CardDescription>
        </CardHeader>
        <CardContent ref={contentRef} className="p-4 md:p-6">
          <p>Here are some of the projects I've been involved in:</p>
          <ul ref={projectListRef} className="mt-4 space-y-2">
            <li>
              - <b>A Netflix clone:</b> built using MERN stack and TMDB API.
              Users can sign in, view trailers, and watch movies
            </li>
            <li>
              - <b>Iphone Website Clone:</b> A clone of the official Apple
              website for Iphone 13. Stack: React, Tailwind CSS, Three js, GSAP
            </li>
            <li>
              - <b>Alumni Website:</b> A website for the alumni of a university.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

export default ProjectsSection
