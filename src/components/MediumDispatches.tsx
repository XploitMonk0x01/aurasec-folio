'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpenText, Clock3, Newspaper, Tags } from 'lucide-react'

const profileUrl = 'https://medium.com/@xploitmonk0x01'

const featuredPost = {
  title: 'From Zero to Cloud: A Complete AWS CTF Writeup',
  subtitle: 'HiveCTF Cloud Challenges',
  url: 'https://medium.com/@xploitmonk0x01/from-zero-to-cloud-a-complete-aws-ctf-writeup-hivectf-cloud-challenges-b047b3b0c552',
  summary:
    'A practical AWS security walkthrough covering cloud CTF thinking, exposed configuration, IAM paths, Cognito behavior, DynamoDB extraction, and remediation lessons.',
  date: 'Apr 2026',
  readTime: '12 min read',
  tags: ['AWS', 'CTF', 'Cloud Security', 'Writeup'],
}

const writingSignals = [
  'Cloud misconfiguration analysis',
  'Step-by-step security learning',
  'Defensive takeaways after exploitation',
]

export function MediumDispatches() {
  return (
    <section id="blog" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal-red">
              field writing
            </p>
            <h2 className="mt-3 text-5xl text-paper md:text-7xl">
              Medium Dispatches
            </h2>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 border border-paper/20 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-paper transition hover:border-signal-red hover:bg-signal-red hover:text-ink"
          >
            <Newspaper className="h-4 w-4" />
            Open Medium
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden border border-paper/12 paper-panel p-6 md:p-8"
          >
            <div className="absolute inset-0 dossier-grid opacity-35" />
            <div className="relative">
              <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">
                <span className="inline-flex items-center gap-2 text-signal-red">
                  <BookOpenText className="h-4 w-4" />
                  latest indexed dispatch
                </span>
                <span className="h-px flex-1 bg-paper/15" />
                <span>{featuredPost.date}</span>
              </div>

              <h3 className="max-w-4xl text-5xl text-paper md:text-7xl">
                {featuredPost.title}
              </h3>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.26em] text-oxide">
                {featuredPost.subtitle}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-paper-muted">
                {featuredPost.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-paper/12 bg-paper/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-paper/12 pt-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
                  <Clock3 className="h-4 w-4 text-signal-red" />
                  {featuredPost.readTime}
                </span>
                <a
                  href={featuredPost.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-paper px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-signal-red"
                >
                  Read Writeup
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-4">
            {writingSignals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="border border-paper/12 paper-light p-5 text-ink"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Tags className="h-5 w-5 text-signal-red" />
                  <span className="font-mono text-[10px] text-ink/45">
                    0{index + 1}
                  </span>
                </div>
                <p className="font-mono text-sm uppercase leading-relaxed tracking-[0.18em] text-ink/75">
                  {signal}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
