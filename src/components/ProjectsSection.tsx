'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/config/projects'

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
      <div className="container mx-auto">
        <h2 className="text-3xl font-mono text-neon mb-8">Projects.run</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
