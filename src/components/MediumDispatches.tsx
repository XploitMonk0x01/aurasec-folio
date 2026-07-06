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
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              field writing
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">
              Medium Dispatches
            </h2>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-all hover:border-violet/40 hover:bg-white/10"
          >
            <Newspaper className="h-4 w-4 text-violet-bright transition-transform group-hover:scale-110" />
            Open Medium
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="void-glass group relative overflow-hidden rounded-3xl p-8 transition-all hover:border-white/15 md:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: 'radial-gradient(ellipse at bottom left, rgba(124,58,237,0.12) 0%, transparent 60%)' }}
            />
            
            <div className="relative flex h-full flex-col">
              <div className="mb-8 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-violet-bright">
                  <BookOpenText className="h-3.5 w-3.5" />
                  latest indexed dispatch
                </span>
                <span className="hidden h-px flex-1 bg-white/10 sm:block" />
                <span className="text-foreground/70">{featuredPost.date}</span>
              </div>

              <h3 className="max-w-2xl font-display text-4xl leading-[1.1] text-foreground md:text-6xl">
                {featuredPost.title}
              </h3>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.26em] text-teal-bright">
                {featuredPost.subtitle}
              </p>
              
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {featuredPost.summary}
              </p>

              <div className="mt-auto pt-10">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <Clock3 className="h-4 w-4 text-violet-bright" />
                    {featuredPost.readTime}
                  </span>
                  
                  <a
                    href={featuredPost.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn ml-auto inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet to-purple-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet/20 transition-all hover:shadow-violet/40 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Read Writeup
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Signals */}
          <div className="flex flex-col gap-4">
            {writingSignals.map((signal, index) => (
              <motion.div
                key={signal}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="void-glass flex flex-1 flex-col justify-center rounded-3xl p-8"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Tags className="h-5 w-5 text-teal-bright" />
                  <span className="font-mono text-[10px] text-muted-foreground/40">
                    0{index + 1}
                  </span>
                </div>
                <p className="font-mono text-sm uppercase leading-relaxed tracking-widest text-foreground/80">
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
