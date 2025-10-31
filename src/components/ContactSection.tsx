'use client'

import React, { useRef, useState } from 'react'
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
import { PGPKeyDisplay } from '@/components/PGPKeyDisplay'
import { pgpPublicKey } from '@/config/security'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contactListRef = useRef<HTMLUListElement>(null)
  const [showPGP, setShowPGP] = useState(false)

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

          {/* PGP Key Section */}
          <div className="mt-8 pt-6 border-t border-green-500/20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => setShowPGP(!showPGP)}
                variant="outline"
                className="w-full sm:w-auto font-mono text-green-400 border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
              >
                <span className="mr-2">🔐</span>
                {showPGP ? '[ HIDE PGP KEY ]' : '[ SHOW PGP PUBLIC KEY ]'}
                <span className="ml-2 inline-block animate-pulse">_</span>
              </Button>

              <AnimatePresence>
                {showPGP && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="relative">
                      {/* Cyberpunk border effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 blur-sm" />
                      <div className="relative">
                        <PGPKeyDisplay pgpKey={pgpPublicKey} />
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 text-xs text-gray-500 font-mono"
                    >
                      💡 Use this key to send me encrypted messages
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default ContactSection
