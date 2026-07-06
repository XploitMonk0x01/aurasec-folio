import React from 'react'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'split'
}

type ActionLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: LucideIcon
  tone?: 'primary' | 'quiet' | 'danger'
}

type MetricCardProps = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'split',
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === 'split'
          ? 'mb-12 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end'
          : 'mb-12 max-w-3xl'
      }
    >
      <div>
        {/* contour-line style label */}
        <p className="font-mono text-xs uppercase tracking-[0.36em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-5xl leading-none text-foreground md:text-7xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function ActionLink({
  children,
  className = '',
  icon: Icon = ArrowUpRight,
  tone = 'quiet',
  ...props
}: ActionLinkProps) {
  const tones = {
    primary:
      'bg-gradient-to-r from-violet to-purple-600 text-white shadow-lg shadow-violet/30 hover:shadow-xl hover:shadow-violet/40 hover:-translate-y-0.5 border-transparent',
    quiet:
      'border-white/10 text-paper-muted hover:border-violet/50 hover:text-paper hover:-translate-y-0.5 backdrop-blur-sm',
    danger:
      'border-red-500/50 text-red-400 hover:border-red-500 hover:bg-red-500/10 hover:-translate-y-0.5',
  }

  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
      <Icon className="h-4 w-4" />
    </a>
  )
}

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: MetricCardProps) {
  return (
    <article className="min-h-36 border border-white/10 bg-foreground/5 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-6 text-4xl leading-none text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
    </article>
  )
}

export function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="border border-dashed border-paper/18 bg-paper/5 p-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-paper">
        {title}
      </p>
      <p className="mt-3 text-sm leading-6 text-paper-muted">{description}</p>
    </div>
  )
}
