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

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contactListRef = useRef<HTMLUListElement>(null)

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

      // Header animation
      if (cardRef.current) {
        const headerElements = [
          cardRef.current.querySelector('h2'),
          cardRef.current.querySelector('p'),
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
      }

      // Contact list items animation
      if (contactListRef.current?.children) {
        gsap.fromTo(
          contactListRef.current.children,
          { x: -50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: contactListRef.current,
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

      // Link hover animations
      if (contentRef.current) {
        const links = contentRef.current.querySelectorAll('a')
        links.forEach((link) => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            })
          })
          link.addEventListener('mouseleave', () => {
            gsap.to(link, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-6 md:py-12">
      <Card ref={cardRef}>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Me</CardTitle>
          <CardDescription>How to get in touch with me.</CardDescription>
        </CardHeader>
        <CardContent ref={contentRef} className="p-4 md:p-6">
          <p>Feel free to reach out to me through the following channels:</p>
          <ul ref={contactListRef} className="mt-4 space-y-2">
            <li>
              - <b>Email:</b>{' '}
              <a
                href="mailto:ethicalrobo06@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ethicalrobo06@gmail.com
              </a>
            </li>
            <li>
              - <b>LinkedIn:</b>{' '}
              <a
                href="https://www.linkedin.com/in/chandansemwal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                linkedin.com/in/chandansemwal
              </a>
            </li>
            <li>
              - <b>GitHub:</b>{' '}
              <a
                href="https://github.com/XploitMonk0x01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                github.com/XploitMonk0x01
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

export default ContactSection
