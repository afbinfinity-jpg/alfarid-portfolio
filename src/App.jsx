import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowDown, Menu, X, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TextScramble } from './components/ui/TextScramble'
import { Analytics } from '@vercel/analytics/react'

function LinkedinIcon({ className, strokeWidth = 1.8 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GithubIcon({ className, strokeWidth = 1.8 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}
gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

// PLACEHOLDER — replace end values with your real metrics before launch
const PILLARS = [
  { eyebrow: 'AUTOMATIONS BUILT',   end: 20,  suffix: '+', desc: 'workflows shipped to production'          },
  { eyebrow: 'HOURS SAVED / MONTH', end: 300, suffix: '+', desc: 'of manual work eliminated across clients' },
  { eyebrow: 'TOOLS INTEGRATED',    end: 40,  suffix: '+', desc: 'APIs and platforms connected'             },
]

const PROJECTS = [
  {
    id:       1,
    title:    'AI Lead Generation & Qualification Platform',
    subtitle: 'Multi-tenant platform for capturing, scoring, and converting leads',
    problem:  'Businesses were managing leads across multiple tools, manually qualifying prospects, following up through email and phone, and losing opportunities due to slow response times and fragmented workflows.',
    solution: 'Built a multi-tenant AI-powered platform that captures, scores, nurtures, and qualifies leads through chat, email, and AI voice calls. The system combines CRM pipeline management, automated outreach, appointment booking, and an AI copilot that helps teams manage and act on leads more efficiently.',
    result:   'Created a complete lead-to-appointment automation system with AI voice calling, automated email campaigns, intelligent lead scoring, appointment scheduling, and centralized pipeline management within a single platform.',
    tools:    ['Next.js 16', 'Supabase', 'n8n', 'Claude', 'Vapi', 'Cal.com'],
    accent:   'primary',
    image:    '/screenshots/project-1.png',
  },
  {
    id:       2,
    title:    'AI Receptionist & Appointment Booking System',
    subtitle: 'AI-powered receptionist across web chat and Telegram',
    problem:  'Businesses were spending valuable time answering repetitive inquiries, collecting customer information manually, and managing appointment bookings across multiple channels.',
    solution: 'Built an AI-powered receptionist that engages with customers through web chat and Telegram, answers questions naturally, captures lead information, syncs data to CRM systems automatically, and guides prospects to book appointments without human intervention.',
    result:   'Created a fully automated lead capture and appointment booking workflow that streamlines customer interactions, centralizes lead management, and reduces administrative workload while maintaining a seamless customer experience.',
    tools:    ['Next.js', 'OpenAI', 'MongoDB', 'Google Sheets', 'Calendly', 'Telegram', 'Vercel'],
    accent:   'accent',
    image:    '/screenshots/project-2.png',
  },
  {
    id:       3,
    title:    'AI Lead Discovery & Outreach Engine',
    subtitle: 'Automated prospect discovery, scoring, and personalized outreach at scale',
    problem:  'Finding qualified prospects and creating personalized outreach at scale is time-consuming, repetitive, and difficult to manage across multiple tools and workflows.',
    solution: 'Built an AI-powered lead generation and outreach platform that discovers prospects, enriches and scores leads, generates personalized messaging, orchestrates automated outreach campaigns, and manages background processing through a scalable workflow engine.',
    result:   'Created a streamlined lead acquisition system that automates prospect discovery, prioritization, personalization, and outreach, enabling businesses to scale growth efforts while reducing manual research and campaign management.',
    tools:    ['Trigger.dev', 'Apify', 'OpenAI', 'MongoDB', 'Email Automation', 'AI Scoring'],
    accent:   'primary',
    image:    '/screenshots/project-3.png',
  },
  {
    id:       4,
    title:    'AI Invoice Processing & Data Extraction System',
    subtitle: 'End-to-end pipeline from PDF ingestion to structured business data',
    problem:  'Organizations often spend significant time manually reviewing invoices, extracting information, and entering data into spreadsheets, accounting systems, or internal databases.',
    solution: 'Built an AI-powered document processing pipeline that automatically ingests invoice PDFs, converts and processes each page, extracts key information using GPT-4o Vision, validates the results, and transforms unstructured documents into structured business data.',
    result:   'Created an end-to-end automation workflow that eliminates manual invoice processing, centralizes extracted information, and provides teams with searchable, structured records through a unified dashboard.',
    tools:    ['GPT-4o Vision', 'Queue Processing', 'PDF Automation', 'MongoDB', 'Google Sheets', 'Workflow Orchestration'],
    accent:   'accent',
    image:    '/screenshots/project-4.png',
  },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alfarid-bulbula-91a7032a7/', Icon: LinkedinIcon },
  { label: 'GitHub',   href: 'https://github.com/afbinfinity-jpg',                     Icon: GithubIcon   },
]

const CONTACT_EMAIL = 'afbinfinity@gmail.com'

// ─────────────────────────────────────────────────────────────────────────────
// Utility components
// ─────────────────────────────────────────────────────────────────────────────

function useInView(ref, options) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    if (prefersReducedMotion()) { setInView(true); return }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect() }
    }, options ?? { threshold: 0.3 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, options])
  return inView
}

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null), started = useRef(false)
  useEffect(() => {
    if (prefersReducedMotion()) { setValue(end); return }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - t0) / duration)
          setValue(Math.round(end * (1 - Math.pow(1 - t, 3))))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])
  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

// Accessible form field wrapper
function Field({ label, id, type = 'text', value, onChange, placeholder, required, rows }) {
  const cls = 'w-full bg-background border border-divider rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/35 font-body focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-colors duration-200'
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{label}</label>
      {type === 'textarea'
        ? <textarea id={id} className={cls + ' resize-none'} rows={rows} value={value} onChange={onChange} placeholder={placeholder} required={required} />
        : <input    id={id} type={type}  className={cls}             value={value} onChange={onChange} placeholder={placeholder} required={required} />
      }
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature card interactive components
// ─────────────────────────────────────────────────────────────────────────────

function WorkflowShuffler() {
  const STEPS = [
    { num:'01', label:'TRIGGER', title:'Event fires',      desc:'Webhook, schedule, or form submission kicks off the automation.', border:'border-primary/20', bg:'bg-primary/[0.055]' },
    { num:'02', label:'PROCESS', title:'AI applies logic', desc:'Model classifies, generates, or routes the data intelligently.',   border:'border-accent/20',  bg:'bg-accent/[0.055]'  },
    { num:'03', label:'ACTION',  title:'System updates',   desc:'CRM updated, message sent, or document created automatically.',    border:'border-primary-light/15', bg:'bg-surface'    },
  ]
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setActive(v => (v+1)%STEPS.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-44">
      {STEPS.map((step, i) => {
        const offset = (i - active + STEPS.length) % STEPS.length
        return (
          <div key={step.num} className={`absolute inset-x-0 rounded-2xl border px-4 py-3.5 transition-all duration-700 ease-in-out ${step.border} ${step.bg}`}
            style={{ top:`${offset*9}px`, zIndex:STEPS.length-offset, transform:`scale(${1-offset*0.04})`, transformOrigin:'top center', opacity:offset===0?1:offset===1?0.55:0.22, filter:offset===0?'none':`blur(${offset*1.5}px)` }}>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted">{step.num} · {step.label}</p>
            <p className="font-display font-semibold text-ink text-sm mt-1.5">{step.title}</p>
            <p className="text-muted text-xs leading-relaxed mt-1">{step.desc}</p>
          </div>
        )
      })}
    </div>
  )
}

function AISignatureAnim() {
  const STATUSES = ['Processing request…','Intent recognized','Response generated','Delivered ✓']
  const [statusIdx, setStatusIdx] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setStatusIdx(v => (v+1)%STATUSES.length), 2300)
    return () => clearInterval(id)
  }, [])
  const PARTICLES = [
    {left:'10%',delay:'0s',dur:'2.1s'},{left:'24%',delay:'0.55s',dur:'1.85s'},{left:'38%',delay:'1.05s',dur:'2.3s'},
    {left:'52%',delay:'0.3s',dur:'1.95s'},{left:'65%',delay:'1.45s',dur:'2.05s'},{left:'78%',delay:'0.8s',dur:'2.25s'},{left:'90%',delay:'1.75s',dur:'1.75s'},
  ]
  return (
    <div className="relative h-44 rounded-2xl overflow-hidden select-none" style={{background:'linear-gradient(180deg,#090720 0%,#110A2C 65%,#090720 100%)'}}>
      <style>{`
        @keyframes code-fall{0%{transform:translate(-50%,0);opacity:0}10%{opacity:.85}85%{opacity:.85}100%{transform:translate(-50%,95px);opacity:0}}
        @keyframes scan-ripple{0%{transform:translateX(-50%) scaleX(.2);opacity:.65}80%{transform:translateX(-50%) scaleX(4.5);opacity:0}100%{transform:translateX(-50%) scaleX(4.5);opacity:0}}
        @keyframes cur-blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>
      <div className="absolute top-3 left-1/4 w-20 h-20 rounded-full bg-primary/15 blur-2xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-5 right-1/4 w-14 h-14 rounded-full bg-accent/20 blur-xl pointer-events-none"  aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 px-3 py-2 flex items-center justify-between border-b border-white/[0.07]">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-primary/60">API ENDPOINT</span>
        <span className="font-mono text-[8px] text-muted/60">7 active</span>
      </div>
      <div className="absolute inset-x-3" style={{top:'30px'}}>
        <svg viewBox="0 0 200 14" className="w-full" fill="none" aria-hidden="true">
          <rect x="0" y="2" width="200" height="10" rx="2" fill="rgba(0,194,255,0.055)" stroke="rgba(0,194,255,0.18)" strokeWidth="0.5"/>
          {[18,46,74,102,130,158].map((x,i)=><rect key={i} x={x} y="4.5" width="12" height="5" rx="1" fill="rgba(0,194,255,0.12)"/>)}
          {[8,32,58,86,116,144,174].map((x,i)=><circle key={i} cx={x} cy="7" r="1.5" fill={i%2===0?'#00C2FF':'#7B61FF'} opacity="0.65"/>)}
        </svg>
      </div>
      {PARTICLES.map((p,i)=>(
        <div key={i} className="absolute font-mono text-primary/80 pointer-events-none" aria-hidden="true"
          style={{left:p.left,top:'22px',fontSize:'9px',animation:`code-fall ${p.dur} ${p.delay} linear infinite`}}>{'</>'}</div>
      ))}
      <div className="absolute inset-x-3 flex items-center gap-1.5" style={{bottom:'32px'}}>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/25 via-primary/12 to-transparent"/>
        <span className="font-mono text-primary/40" style={{fontSize:'9px',animation:'cur-blink 1s step-end infinite'}} aria-hidden="true">_</span>
      </div>
      {[0,1,2].map(i=>(
        <div key={i} className="absolute h-px w-10 bg-primary/22 rounded-full pointer-events-none" aria-hidden="true"
          style={{bottom:'32px',left:'18%',animation:`scan-ripple 2.2s ${i*0.73}s ease-out infinite`}}/>
      ))}
      <div className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-center gap-2 border-t border-white/[0.07]">
        <div className="h-1.5 w-1.5 rounded-full bg-primary ring-pulse shrink-0"/>
        <span className="font-mono text-[8px] text-primary/65 transition-all duration-500">{STATUSES[statusIdx]}</span>
        <span className="font-mono text-[8px] text-muted/45 ml-auto">LIVE</span>
      </div>
    </div>
  )
}

function AutomationScheduler() {
  const TASKS = [{id:0,label:'Extract source data'},{id:1,label:'AI classifies records'},{id:2,label:'Update CRM entries'},{id:3,label:'Dispatch notifications'}]
  const [cursorStep,setCursorStep]=useState(0),[checked,setChecked]=useState(new Set()),[clicking,setClicking]=useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) return
    let step=0,cancelled=false
    const timers=[]
    const advance=()=>{
      if(cancelled)return
      setCursorStep(step)
      const t1=setTimeout(()=>{
        if(cancelled)return
        setClicking(true)
        const t2=setTimeout(()=>{
          if(cancelled)return
          setClicking(false)
          const done=step
          setChecked(prev=>new Set([...prev,done]))
          step=(step+1)%TASKS.length
          const t3=setTimeout(()=>{ if(cancelled)return; if(step===0)setChecked(new Set()); advance() },step===0?750:320)
          timers.push(t3)
        },220)
        timers.push(t2)
      },850)
      timers.push(t1)
    }
    const start=setTimeout(advance,700); timers.push(start)
    return ()=>{ cancelled=true; timers.forEach(clearTimeout) }
  },[])
  const ROW_H=33, cursorTop=36+cursorStep*ROW_H
  return (
    <div className="relative h-44 rounded-2xl overflow-hidden bg-surface border border-divider">
      <div className="px-4 py-2 border-b border-divider flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary ring-pulse shrink-0"/>
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">AUTOMATION RUNNING</span>
        <span className="font-mono text-[8px] text-muted/55 ml-auto">live</span>
      </div>
      <div className="px-4 pt-1">
        {TASKS.map(task=>(
          <div key={task.id} className="flex items-center gap-3" style={{height:ROW_H}}>
            <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 transition-all duration-300 ${checked.has(task.id)?'bg-primary border-primary':'border-divider'}`}>
              {checked.has(task.id)&&<svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="#07070C" strokeWidth={3.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <span className={`font-mono text-[10px] transition-all duration-300 ${checked.has(task.id)?'text-muted/40 line-through':'text-ink/70'}`}>{task.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute right-5 transition-all duration-[500ms] ease-out pointer-events-none" style={{top:cursorTop}} aria-hidden="true">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" className={`transition-transform duration-100 ${clicking?'scale-75':'scale-100'}`}>
          <path d="M1 1.5L11.5 8L6.5 9.5L4.5 15L1 1.5Z" fill="#00C2FF" stroke="#00C2FF" strokeWidth="0.8" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false)
  useEffect(()=>{ const f=()=>setScrolled(window.scrollY>80); window.addEventListener('scroll',f,{passive:true}); return()=>window.removeEventListener('scroll',f) },[])
  useEffect(()=>{ document.body.style.overflow=open?'hidden':''; return()=>{ document.body.style.overflow='' } },[open])
  const close=()=>setOpen(false)
  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${scrolled?'glass':''}`}>
        <a href="#home" className="flex items-center gap-2.5 lift-on-hover" aria-label="Home">
          <img src="/logo-icon.png" alt="" className="h-8 w-8 rounded-xl object-contain bg-black p-0.5 shrink-0" aria-hidden="true" />
          <span className="font-display font-bold text-sm text-ink tracking-tight">Alfarid B</span>
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({label,href})=>(
            <a key={label} href={href} className="lift-on-hover px-4 py-2 text-sm font-medium text-muted hover:text-ink transition-colors duration-200 rounded-full hover:bg-white/5">{label}</a>
          ))}
        </div>
        <a href="#contact" className="magnetic-btn hidden lg:inline-flex items-center gap-1.5 bg-primary text-deep px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/20">
          Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5"/>
        </a>
        <button onClick={()=>setOpen(v=>!v)} className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors text-ink" aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>
          {open?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}
        </button>
      </nav>
      <div className={`lg:hidden fixed inset-x-0 top-0 z-40 bg-deep/96 backdrop-blur-2xl rounded-b-[40px] transition-transform duration-500 ease-in-out ${open?'translate-y-0':'-translate-y-full'}`}>
        <div className="flex flex-col min-h-[65vh] px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({label,href},i)=>(
              <a key={label} href={href} onClick={close} className="flex items-center justify-between py-4 border-b border-divider font-display text-2xl font-semibold text-ink hover:text-primary transition-colors duration-200" style={{transitionDelay:open?`${i*40}ms`:'0ms'}}>
                {label} <ArrowUpRight className="h-5 w-5 text-muted"/>
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <a href="#contact" onClick={close} className="magnetic-btn w-full flex items-center justify-center gap-2 bg-primary text-deep py-4 rounded-2xl font-semibold">
              Let&apos;s talk <ArrowUpRight className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </div>
      {open&&<div className="lg:hidden fixed inset-0 z-30" onClick={close} aria-hidden="true"/>}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-rise', { y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
      gsap.from('.hero-graph', { opacity: 0, duration: 1.6, ease: 'power2.out', delay: 0.2 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden flex items-center bg-background">

      {/* Ambient brand glows — same palette used across the site */}
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{ top: '6%', left: '8%', width: '44rem', height: '44rem', background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 62%)' }} />
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{ bottom: '0%', left: '0%', width: '36rem', height: '36rem', background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 62%)' }} />

      {/* Shared fine grid — fades out toward the bottom so it bleeds into the next section */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 50%, transparent 88%)', maskImage: 'linear-gradient(to bottom, #000 0%, #000 50%, transparent 88%)' }} />

      {/* Atmospheric liquid-particle video — layered for a progressive left→right melt.
          Outer mask handles the vertical fade so top/bottom edges dissolve into the page. */}
      <div className="hero-graph absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, #000 14%, #000 82%, transparent 100%)' }}>

        {/* Crisp detail layer — vibrant, sharp motion on the LEFT, fades out by center */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] lg:opacity-[0.52]"
          style={{ objectPosition: '20% 50%', filter: 'saturate(1.12) contrast(1.08)',
            WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.45) 48%, transparent 66%)',
            maskImage: 'linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.45) 48%, transparent 66%)' }}
          src="/video/hero-liquid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Diffused glow layer — heavily blurred atmosphere that melts behind the headline */}
        <video
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-[0.24] hidden lg:block"
          style={{ objectPosition: '58% 50%', filter: 'blur(46px) saturate(1.25)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 26%, #000 52%, rgba(0,0,0,0.5) 80%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 26%, #000 52%, rgba(0,0,0,0.5) 80%, transparent 100%)' }}
          src="/video/hero-liquid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Readability scrim — keeps the headline on near-black while letting a faint glow survive behind it */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true"
        style={{ background: 'linear-gradient(to right, transparent 0%, transparent 32%, rgba(10,10,15,0.32) 54%, rgba(10,10,15,0.7) 82%, rgba(10,10,15,0.84) 100%)' }} />

      {/* Seamless fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none" aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #0A0A0F 92%)' }} />

      {/* Content — right half on desktop, left-aligned on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-0 min-h-[100dvh] flex items-center">
        <div className="lg:ml-auto lg:w-[50%] flex flex-col gap-6">

          <p className="hero-rise font-mono text-[10px] sm:text-xs uppercase tracking-[.28em] text-primary/65 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-primary/35" aria-hidden="true" />
            AI Automation Builder
          </p>

          <h1 className="hero-rise">
            <span className="block font-display text-5xl sm:text-6xl lg:text-[76px] font-bold text-ink tracking-tighter leading-[.93]">
              Stop doing repetitive work.
            </span>
            <span className="block font-serif italic text-5xl sm:text-6xl lg:text-[76px] font-medium tracking-tighter leading-[1.05] gradient-text mt-1 sm:mt-2">
              Let AI handle it.
            </span>
          </h1>

          <p className="hero-rise max-w-md text-muted text-base sm:text-lg leading-relaxed">
            I build AI agents, automations, and voice AI systems that eliminate repetitive work so your team can focus on customers, growth, and high-value decisions.
          </p>

          <div className="hero-rise flex flex-wrap gap-3 mt-2">
            <a href="#about" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep px-7 py-3.5 rounded-full font-semibold text-sm shadow-xl shadow-primary/20">
              About me <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#work" className="magnetic-btn inline-flex items-center gap-2 glass-dark text-ink px-7 py-3.5 rounded-full font-semibold text-sm">
              See my work
            </a>
          </div>

        </div>
      </div>

      {/* Bottom status bar — hairline fades at both ends, no hard separating border */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" aria-hidden="true" />
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 ring-pulse-green" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Available for projects</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted hidden sm:block">Alfarid Bulbula · 2026</span>
        </div>
      </div>

    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Features section
// ─────────────────────────────────────────────────────────────────────────────

function Features() {
  const sectionRef=useRef(null)
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const ctx=gsap.context(()=>{
      gsap.from('.feature-card',{scrollTrigger:{trigger:sectionRef.current,start:'top 78%',once:true},y:40,opacity:0,duration:.8,stagger:.16,ease:'power3.out'})
    },sectionRef)
    return()=>ctx.revert()
  },[])
  return (
    <section id="services" ref={sectionRef} className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-primary/60 mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true"/> WHAT I BUILD
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tighter leading-[1.02] text-balance">
            Systems that run
            <span className="block font-serif italic font-medium gradient-text mt-1">while you sleep.</span>
          </h2>
          <p className="text-muted text-base leading-relaxed mt-5 max-w-lg">
            Three capability areas — each built to eliminate manual work so your team can focus on decisions that actually require humans.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="feature-card flex flex-col gap-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted mb-2">CAPABILITY · 01</p>
              <h3 className="font-display text-xl font-bold text-ink">AI Agents &amp; Workflows</h3>
            </div>
            <WorkflowShuffler/>
            <div>
              <p className="text-muted text-sm leading-relaxed">End-to-end automations that trigger on events, apply intelligence, and take action — no human required.</p>
              <ul className="mt-3 space-y-1.5">
                {['n8n, Make, Zapier','OpenAI & Claude APIs','Custom webhook integrations'].map(t=>(
                  <li key={t} className="flex items-center gap-2 text-xs text-muted"><span className="h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden="true"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="feature-card flex flex-col gap-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted mb-2">CAPABILITY · 02</p>
              <h3 className="font-display text-xl font-bold text-ink">Voice AI Systems</h3>
            </div>
            <AISignatureAnim/>
            <div>
              <p className="text-muted text-sm leading-relaxed">AI voice agents and conversational systems that handle inbound calls, qualify leads, and respond 24/7.</p>
              <ul className="mt-3 space-y-1.5">
                {['Twilio, VAPI, ElevenLabs','LLM intent recognition','CRM handoff & logging'].map(t=>(
                  <li key={t} className="flex items-center gap-2 text-xs text-muted"><span className="h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="feature-card flex flex-col gap-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted mb-2">CAPABILITY · 03</p>
              <h3 className="font-display text-xl font-bold text-ink">Business Automations</h3>
            </div>
            <AutomationScheduler/>
            <div>
              <p className="text-muted text-sm leading-relaxed">Internal tools and cross-platform syncs that cut repetitive work — data entry, reporting, multi-step pipelines.</p>
              <ul className="mt-3 space-y-1.5">
                {['Airtable, Notion, Sheets','API-to-API connectors','Automated reporting pipelines'].map(t=>(
                  <li key={t} className="flex items-center gap-2 text-xs text-muted"><span className="h-1 w-1 rounded-full bg-primary-light shrink-0" aria-hidden="true"/>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pillars
// ─────────────────────────────────────────────────────────────────────────────

function Pillars() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden border-y border-divider" style={{background:'rgba(7,7,12,.55)'}}>
      <div className="absolute top-1/2 left-1/4  -translate-y-1/2 w-80 h-80 rounded-full bg-primary/[.05] blur-[100px] pointer-events-none" aria-hidden="true"/>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/[.04]  blur-[90px]  pointer-events-none" aria-hidden="true"/>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-divider">
          {PILLARS.map(p=>(
            <div key={p.eyebrow} className="px-0 sm:px-10 lg:px-14 py-10 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <p className="font-mono text-[9px] uppercase tracking-[.22em] text-muted mb-4">{p.eyebrow}</p>
              <div className="font-display text-6xl sm:text-7xl font-bold gradient-text leading-none"><CountUp end={p.end} suffix={p.suffix}/></div>
              <p className="text-muted text-sm leading-relaxed mt-3 max-w-[200px]">{p.desc}</p>
              <div className="mt-6 h-px w-20 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" style={{animation:'pillar-sweep 3s ease-in-out infinite'}} aria-hidden="true"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects (3D carousel + case-study modal)
// ─────────────────────────────────────────────────────────────────────────────

function ProjectImage({ accent, image, alt }) {
  const p = accent === 'primary'

  if (image) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-divider bg-deep group" style={{ aspectRatio: '16/9' }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Bottom gradient blends the screenshot into the card */}
        <div
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(19,19,26,0.65) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        {/* Accent tint on the top edge */}
        <div
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: p ? 'rgba(0,194,255,0.2)' : 'rgba(123,97,255,0.2)' }}
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-deep border border-divider" style={{ aspectRatio: '4/3' }}>
      <div className="absolute inset-0" aria-hidden="true"
        style={{ backgroundImage: `linear-gradient(${p?'rgba(0,194,255,.04)':'rgba(123,97,255,.04)'} 1px,transparent 1px),linear-gradient(90deg,${p?'rgba(0,194,255,.04)':'rgba(123,97,255,.04)'} 1px,transparent 1px)`, backgroundSize: '28px 28px' }}/>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: p ? 'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(0,194,255,.05) 0%,transparent 70%)' : 'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(123,97,255,.06) 0%,transparent 70%)' }}/>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 rounded-xl border flex items-center justify-center"
          style={{ borderColor: p?'rgba(0,194,255,.2)':'rgba(123,97,255,.2)', background: p?'rgba(0,194,255,.07)':'rgba(123,97,255,.07)' }}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke={p?'#00C2FF':'#7B61FF'} strokeWidth="1.5" strokeOpacity=".5" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
        </div>
        <p className="font-mono text-[8px] uppercase tracking-[.22em] text-muted/40">Add screenshot</p>
      </div>
    </div>
  )
}

// Single carousel card — title, one-line description, screenshot, tags, CTA
function ProjectCard({ project, active, onOpen }) {
  const p = project.accent === 'primary'
  const extra = project.tools.length - 4
  return (
    <div className="relative select-none">
      {/* Glow behind the active card */}
      <div
        className="absolute -inset-4 rounded-[2.25rem] blur-2xl pointer-events-none transition-opacity duration-500"
        aria-hidden="true"
        style={{
          opacity: active ? 1 : 0,
          background: p
            ? 'radial-gradient(ellipse 70% 70% at 50% 40%, rgba(0,194,255,0.22), transparent 70%)'
            : 'radial-gradient(ellipse 70% 70% at 50% 40%, rgba(123,97,255,0.22), transparent 70%)',
        }}
      />
      <div className={`relative rounded-3xl border bg-surface p-5 sm:p-6 transition-colors duration-300 ${active ? 'border-primary/25' : 'border-divider'}`}>
        <ProjectImage accent={project.accent} image={project.image} alt={project.title} />
        <div className="mt-5">
          <p className="font-mono text-[9px] uppercase tracking-[.22em] text-muted mb-2">
            {String(project.id).padStart(2, '0')} · PROJECT
          </p>
          <h3 className="font-display text-lg sm:text-xl font-bold text-ink tracking-tight leading-snug">{project.title}</h3>
          <p className="text-muted text-sm mt-2 leading-relaxed line-clamp-2">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tools.slice(0, 4).map(tool => (
              <span key={tool} className="font-mono text-[9px] uppercase tracking-[.1em] text-muted/70 px-2.5 py-1 rounded-full border border-divider bg-background">{tool}</span>
            ))}
            {extra > 0 && (
              <span className="font-mono text-[9px] uppercase tracking-[.1em] text-muted/50 px-2.5 py-1 rounded-full border border-divider bg-background">+{extra}</span>
            )}
          </div>

          <button
            type="button"
            onClick={onOpen}
            disabled={!active}
            tabIndex={active ? 0 : -1}
            className={`magnetic-btn mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-deep py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20 ${active ? '' : 'pointer-events-none'}`}
          >
            View Case Study <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Full case-study modal — Problem / Solution / Result
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-deep/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog" aria-modal="true" aria-label={project.title}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-surface rounded-3xl border border-divider shadow-2xl"
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <button
          type="button" onClick={onClose} aria-label="Close case study"
          className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full glass-dark border border-white/[0.08] flex items-center justify-center text-ink hover:border-primary/30 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-7"><ProjectImage accent={project.accent} image={project.image} alt={project.title} /></div>
          <p className="font-mono text-[9px] uppercase tracking-[.22em] text-muted mb-3">
            {String(project.id).padStart(2, '0')} · CASE STUDY
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-tight">{project.title}</h3>
          <p className="text-muted text-sm mt-2 leading-relaxed">{project.subtitle}</p>

          <div className="space-y-5 mt-7">
            {[{ key: 'problem', label: 'PROBLEM' }, { key: 'solution', label: 'SOLUTION' }, { key: 'result', label: 'RESULT' }].map(({ key, label }) => (
              <div key={key}>
                <p className="font-mono text-[8px] uppercase tracking-[.22em] text-primary/55 mb-1.5">{label}</p>
                <p className="text-muted text-sm leading-relaxed">{project[key]}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-7">
            {project.tools.map(tool => (
              <span key={tool} className="font-mono text-[9px] uppercase tracking-[.1em] text-muted/70 px-3 py-1.5 rounded-full border border-divider bg-background">{tool}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [openId, setOpenId] = useState(null)
  const [layout, setLayout] = useState({ spacing: 420, rot: 20 })
  const n = PROJECTS.length
  const reduce = prefersReducedMotion()

  // Responsive spacing / rotation for the 3D stage
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setLayout({ spacing: Math.min(w * 0.62, 250), rot: 0 })
      else if (w < 1024) setLayout({ spacing: 360, rot: 16 })
      else setLayout({ spacing: 440, rot: 22 })
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Heading reveal (matches the other sections)
  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.projects-heading', { scrollTrigger: { trigger: '.projects-heading', start: 'top 82%', once: true }, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduce])

  const go = (dir) => setActive(a => (a + dir + n) % n)
  const openProject = PROJECTS.find(p => p.id === openId)

  return (
    <section id="work" ref={sectionRef} className="py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="projects-heading max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-14 sm:mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[.25em] text-primary/60 mb-5 flex items-center gap-3">
          <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true"/> MY WORK
        </p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tighter leading-[1.02] text-balance">
          The work,
          <span className="block font-serif italic font-medium gradient-text mt-1">in context.</span>
        </h2>
        <p className="text-muted text-base leading-relaxed mt-5 max-w-lg">
          Four projects — swipe through, then open any one for the full problem, solution, and result.
        </p>
      </div>

      {/* 3D carousel stage */}
      <div className="relative" style={{ perspective: 1800 }}>
        <motion.div
          className="relative h-[540px] sm:h-[560px] mx-auto max-w-7xl"
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
        >
          {PROJECTS.map((project, i) => {
            let offset = i - active
            if (offset > n / 2) offset -= n
            if (offset < -n / 2) offset += n
            const abs = Math.abs(offset)
            const isActive = offset === 0
            const visible = abs <= 1
            return (
              <motion.div
                key={project.id}
                className="absolute top-0 left-0 right-0 mx-auto w-[86vw] max-w-[430px] sm:max-w-[460px]"
                animate={{
                  x: offset * layout.spacing,
                  rotateY: -offset * layout.rot,
                  scale: isActive ? 1 : 0.82,
                  opacity: visible ? (isActive ? 1 : 0.42) : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(2.5px)',
                }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 30 }}
                style={{ transformStyle: 'preserve-3d', zIndex: 20 - abs, pointerEvents: visible ? 'auto' : 'none' }}
                onClick={() => { if (!isActive) setActive(i) }}
              >
                <ProjectCard project={project} active={isActive} onOpen={() => setOpenId(project.id)} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Nav arrows */}
        <button type="button" onClick={() => go(-1)} aria-label="Previous project"
          className="absolute left-3 sm:left-8 top-[42%] z-30 h-11 w-11 rounded-full glass-dark border border-white/[0.08] flex items-center justify-center text-ink hover:border-primary/30 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next project"
          className="absolute right-3 sm:right-8 top-[42%] z-30 h-11 w-11 rounded-full glass-dark border border-white/[0.08] flex items-center justify-center text-ink hover:border-primary/30 transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id} type="button" onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-primary' : 'w-1.5 bg-divider hover:bg-muted/50'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && <ProjectModal project={openProject} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// About Me
// ─────────────────────────────────────────────────────────────────────────────

const Emph = ({ children }) => <span className="text-ink font-medium">{children}</span>

const ABOUT_POINTS = [
  { emoji: '🤖', text: (<>I&apos;m an <Emph>AI Automation Builder</Emph> and <Emph>AI Auditor</Emph> focused on designing systems that eliminate repetitive work and help businesses operate more efficiently.</>) },
  { emoji: '🎓', text: (<>Currently studying at <Emph>Zayed University</Emph> while building AI agents, automation workflows, voice AI systems, SaaS platforms, and business process automation solutions.</>) },
  { emoji: '⚙️', text: (<>My toolkit revolves around <Emph>Claude Code</Emph>, <Emph>OpenAI</Emph>, <Emph>n8n</Emph>, <Emph>Next.js</Emph>, and <Emph>Supabase</Emph> — modern AI infrastructure for building real-world production systems.</>) },
  { emoji: '🚀', text: (<>I&apos;ve built <Emph>lead generation platforms</Emph>, <Emph>AI receptionists</Emph>, <Emph>document processing systems</Emph>, <Emph>voice AI agents</Emph>, and internal business tools that automate complex workflows from end to end.</>) },
  { emoji: '🔍', text: (<>As an <Emph>AI Auditor</Emph>, I enjoy analyzing business operations, identifying inefficiencies, and designing practical AI solutions that deliver measurable value.</>) },
  { emoji: '💡', text: (<>I&apos;m constantly exploring new ways to combine <Emph>AI</Emph>, <Emph>automation</Emph>, and <Emph>software engineering</Emph> to solve real business problems and create systems that scale.</>) },
]

function About() {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.about-rise', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Photo + social */}
          <div className="about-rise lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Cyan accent glow (replaces the reference's purple) */}
              <div className="absolute -inset-5 rounded-[2.2rem] bg-primary/20 blur-3xl opacity-60 pointer-events-none" aria-hidden="true" />
              <div className="absolute -inset-px rounded-[1.85rem] bg-gradient-to-b from-primary/35 via-primary/5 to-transparent pointer-events-none" aria-hidden="true" />

              <div className="relative rounded-[1.8rem] overflow-hidden border border-divider bg-surface">
                <img
                  src="/profile.jpg"
                  alt="Alfarid Bulbula — AI Automation Builder"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" aria-hidden="true"
                  style={{ background: 'linear-gradient(to top, rgba(7,7,12,0.55), transparent)' }} />
                <div className="absolute top-0 inset-x-0 h-px pointer-events-none" aria-hidden="true"
                  style={{ background: 'rgba(0,194,255,0.25)' }} />
              </div>

              <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="magnetic-btn inline-flex items-center justify-center gap-2 glass-dark text-ink rounded-2xl py-3.5 text-sm font-semibold border border-white/[0.08] hover:border-primary/30 transition-colors duration-200">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                ))}
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=afbinfinity@gmail.com" target="_blank" rel="noopener noreferrer"
                  className="magnetic-btn col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 glass-dark text-ink rounded-2xl py-3.5 text-sm font-semibold border border-white/[0.08] hover:border-primary/30 transition-colors duration-200">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p className="about-rise font-mono text-[10px] uppercase tracking-[.25em] text-primary/60 mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true" /> ABOUT ME
            </p>
            <h2 className="about-rise font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-ink tracking-tighter leading-[1.05] mb-9">
              AI Automation Builder
              <span className="block font-serif italic font-medium gradient-text mt-1">&amp; AI Auditor.</span>
            </h2>

            <ul className="space-y-5 sm:space-y-6">
              {ABOUT_POINTS.map((pt, i) => (
                <li key={i} className="about-rise flex gap-4">
                  <span className="shrink-0 h-9 w-9 rounded-xl bg-surface border border-divider flex items-center justify-center text-base leading-none" aria-hidden="true">
                    {pt.emoji}
                  </span>
                  <p className="text-muted text-[15px] sm:text-base leading-relaxed pt-1">{pt.text}</p>
                </li>
              ))}
            </ul>

            <div className="about-rise flex items-center gap-3 pt-9">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-pulse-green shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[.2em] text-muted">Available for new projects · 2026</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────────────────

function SentState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 className="font-display text-xl font-bold text-ink mb-2">Message sent.</h3>
      <p className="text-muted text-sm leading-relaxed max-w-[220px]">
        I'll read it and reply within one business day.
      </p>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [form,   setForm]   = useState({ name:'', email:'', message:'' })
  const set = (k) => (e) => setForm(f=>({...f,[k]:e.target.value}))
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: replace setTimeout with a real submission (Resend, Formspree, etc.)
    setTimeout(()=>setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section heading — wide, dominant, occupies the full section width */}
        <div ref={headingRef} className="mb-14 sm:mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-primary/60 mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true"/>
            <TextScramble as="span" trigger={headingInView} duration={0.5} speed={0.025}>GET IN TOUCH</TextScramble>
          </p>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[84px] font-bold text-ink tracking-tighter leading-[0.98] max-w-5xl">
            Let&apos;s build{' '}
            <TextScramble
              as="span"
              trigger={headingInView}
              duration={1.1}
              speed={0.03}
              className="font-serif italic font-medium gradient-text"
            >
              something real.
            </TextScramble>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: pitch + GIF accent */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="text-muted text-base leading-relaxed max-w-sm">
              If you have a repetitive process you want automated, or an idea for an AI system — send a message. I read everything and reply directly, even if the project isn't a fit.
            </p>

            {/* GIF accent — tilted, shakes playfully on hover */}
            <div className="relative group max-w-[340px]">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-accent/15 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
              <div className="shake-on-hover relative rounded-2xl overflow-hidden border border-white/[0.08] bg-surface glass-dark origin-center transition-transform duration-300 ease-out">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none z-10" aria-hidden="true" />
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDV3YXl1cDZzbHJhbmtsMGRteXpia2MxdXN5ZDA1MTAzcThtNHhocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SpopD7IQN2gK3qN4jS/giphy.gif"
                  alt="Animated illustration of someone working at a laptop"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-surface/80 to-transparent pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted/45">
              Typical response within 24 hours
            </p>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl border border-divider p-8 sm:p-10">
              {status==='sent' ? <SentState/> : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Name"  id="f-name"  type="text"  value={form.name}    onChange={set('name')}    placeholder="Your name"        required/>
                    <Field label="Email" id="f-email" type="email" value={form.email}   onChange={set('email')}   placeholder="you@company.com"  required/>
                  </div>
                  <Field
                    label="What do you want to automate?"
                    id="f-message" type="textarea" rows={5}
                    value={form.message} onChange={set('message')}
                    placeholder="Describe the repetitive process, the tools you use, and what outcome you're after…"
                    required
                  />
                  <button
                    type="submit"
                    disabled={status==='sending'}
                    className="magnetic-btn mt-1 w-full flex items-center justify-center gap-2 bg-primary text-deep py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status==='sending' ? 'Sending…' : (<>Send message <ArrowUpRight className="h-4 w-4"/></>)}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-deep border-t border-white/[0.07]">

      {/* Main link grid */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand block */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo-icon.png" alt="" className="h-8 w-8 rounded-xl object-contain bg-black p-0.5 shrink-0" aria-hidden="true" />
                <span className="font-display font-bold text-sm text-ink tracking-tight">Alfarid B</span>
              </div>
              <p className="text-muted/70 text-sm leading-relaxed max-w-[220px]">
                Building AI systems that handle the repetitive work — so you don't have to.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-pulse-green shrink-0"/>
                <span className="font-mono text-[9px] uppercase tracking-[.18em] text-muted/55">Available for projects</span>
              </div>
            </div>

            {/* Work links */}
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted/55 mb-5">Work</p>
              <ul className="space-y-3">
                {[{label:'Services',href:'#services'},{label:'Projects',href:'#work'},{label:'About',href:'#about'}].map(({label,href})=>(
                  <li key={label}>
                    <a href={href} className="text-sm text-muted/65 hover:text-ink transition-colors duration-200 lift-on-hover inline-block py-1">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + social */}
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-muted/55 mb-5">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted/65 hover:text-ink transition-colors duration-200 lift-on-hover inline-block break-all py-1">{CONTACT_EMAIL}</a>
                </li>
                {SOCIAL_LINKS.map(({label,href,Icon})=>(
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted/65 hover:text-ink transition-colors duration-200 group py-1">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted/40 group-hover:text-primary transition-colors duration-200" strokeWidth={1.8}/>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-white/[0.06] py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="font-mono text-[9px] text-muted/35">© 2026 Alfarid Bulbula. All rights reserved.</p>
          <p className="font-mono text-[9px] text-muted/25">AI Automation Builder</p>
        </div>
      </div>

    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App root
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(()=>{
    const id=setTimeout(()=>ScrollTrigger.refresh(),200)
    return()=>clearTimeout(id)
  },[])
  return (
    <div className="relative">
      <div className="noise-overlay" aria-hidden="true"/>
      <Navbar/>
      <main>
        <Hero/>
        <Features/>
        <Pillars/>
        <Projects/>
        <About/>
        <ContactForm/>
      </main>
      <Footer/>
      <Analytics />
    </div>
  )
}
