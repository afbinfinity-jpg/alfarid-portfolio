import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Mail } from 'lucide-react'
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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

const CAPABILITIES = [
  {
    n: '01',
    title: 'AI Reception & Booking',
    desc: 'AI handles incoming website and WhatsApp enquiries 24/7, answers approved treatment questions, qualifies leads, and books appointments.',
    tools: [
      'AI website assistant',
      'WhatsApp conversations',
      'Lead qualification & appointment booking',
      'Treatment FAQs & pricing',
      'Human handoff when needed',
    ],
  },
  {
    n: '02',
    title: 'Lead Follow-Up & Recovery',
    desc: "Automatically follows up with leads your front desk didn't reach, missed calls, and people who showed interest but never booked.",
    tools: [
      'Uncontacted lead follow-up',
      'Missed-call SMS/WhatsApp recovery',
      'Multi-step follow-up sequences',
      'Lead reactivation',
      'Automatic stop when the lead replies or books',
    ],
  },
  {
    n: '03',
    title: 'Patient Retention & Rebooking',
    desc: "Keeps existing clients engaged after their appointment and brings them back when they're due for another treatment.",
    tools: [
      'Appointment reminders',
      'No-show recovery',
      'Post-treatment follow-up',
      'Review requests',
      'Rebooking reminders',
      'Membership/package follow-up',
    ],
  },
]

const PROJECTS = [
  {
    id:       3,
    title:    'AI Med Spa Lead & Booking System',
    subtitle: 'AI-powered lead capture, qualification, follow-up, and appointment booking — built specifically for aesthetic clinics.',
    problem:  'Aesthetic clinics lose enquiries to timing. Messages arrive after hours and over the weekend, the front desk is busy with clients in the room, missed calls go unreturned, and people who asked about a treatment but never booked are quietly forgotten.',
    solution: 'Built an AI system that answers website and WhatsApp enquiries around the clock, handles approved treatment and pricing questions, qualifies the lead, and books the appointment straight into the clinic calendar. Missed calls trigger an immediate text back, unbooked leads move into multi-step follow-up, and every sequence stops the moment the lead replies or books. Anything outside its remit is handed to a human.',
    result:   'Enquiries get answered in seconds instead of hours, missed calls are recovered the same day, and follow-up runs without anyone remembering to do it — so the calendar stays full without adding front-desk hours.',
    tools:    ['WhatsApp', 'AI Agent', 'n8n', 'Calendar', 'CRM'],
    accent:   'primary',
    image:    '/screenshots/med-spa-dashboard.png',
  },
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

const Emph = ({ children }) => <span className="text-ink font-medium">{children}</span>

const ABOUT_POINTS = [
  { k: 'Role',     text: (<>I&apos;m an <Emph>AI Automation Builder</Emph> and <Emph>AI Auditor</Emph> focused on designing systems that eliminate repetitive work and help businesses operate more efficiently.</>) },
  { k: 'Studying', text: (<>Currently studying at <Emph>Zayed University</Emph> while building AI agents, automation workflows, voice AI systems, SaaS platforms, and business process automation solutions.</>) },
  { k: 'Built',    text: (<>I&apos;ve built <Emph>lead generation platforms</Emph>, <Emph>AI receptionists</Emph>, <Emph>document processing systems</Emph>, <Emph>voice AI agents</Emph>, and internal business tools that automate complex workflows from end to end.</>) },
]

// ─────────────────────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────────────────────

/* One reveal, used for every section. Cheaper and calmer than per-section
   GSAP timelines, and it degrades to "just visible" under reduced motion. */
function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.querySelectorAll('.reveal').forEach(n => n.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    const nodes = document.querySelectorAll('.reveal:not(.in)')
    nodes.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])
}

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

function Eyebrow({ children, className = '' }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-6 bg-primary/45" aria-hidden="true" />
      {children}
    </p>
  )
}

/* Every section opens the same way: eyebrow, statement, one line of lede.
   The repetition is the point — it's what makes the page feel authored. */
function SectionHead({ eyebrow, title, serif, lede, className = '' }) {
  return (
    <div className={`col ${className}`}>
      <Eyebrow className="reveal mb-5 sm:mb-6">{eyebrow}</Eyebrow>
      <h2 className="reveal h-section text-[28px] sm:text-[34px] lg:text-[42px]">
        {title}{' '}
        {serif && <span className="h-statement italic text-primary block sm:inline">{serif}</span>}
      </h2>
      {lede && <p className="reveal lede mt-4 text-[14px] max-w-[62ch]">{lede}</p>}
    </div>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required, rows }) {
  const cls = 'w-full bg-background border border-divider rounded-lg px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-faint font-body focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-colors duration-200'
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-muted">{label}</label>
      {type === 'textarea'
        ? <textarea id={id} className={cls + ' resize-none'} rows={rows} value={value} onChange={onChange} placeholder={placeholder} required={required} />
        : <input    id={id} type={type}  className={cls}             value={value} onChange={onChange} placeholder={placeholder} required={required} />
      }
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Capability visuals — unchanged behaviour, retuned to the new palette
// ─────────────────────────────────────────────────────────────────────────────

function WorkflowShuffler() {
  const STEPS = [
    { num:'01', label:'ENQUIRY', title:'Enquiry arrives',     desc:'A website chat or WhatsApp message comes in — any hour, any day.' },
    { num:'02', label:'QUALIFY', title:'AI answers & qualifies', desc:'Treatment questions handled, budget and intent established.'   },
    { num:'03', label:'BOOKED',  title:'Appointment booked',  desc:'Slot confirmed on the calendar and the front desk is notified.'   },
  ]
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setActive(v => (v+1)%STEPS.length), 3200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-[124px]">
      {STEPS.map((step, i) => {
        const offset = (i - active + STEPS.length) % STEPS.length
        return (
          <div key={step.num}
            className="absolute inset-x-0 rounded-xl border border-divider bg-raised px-4 py-3 transition-all duration-700 ease-in-out"
            style={{ top:`${offset*9}px`, height:'106px', zIndex:STEPS.length-offset, transform:`scale(${1-offset*0.035})`, transformOrigin:'top center', opacity:offset===0?1:offset===1?0.5:0.2, filter:offset===0?'none':`blur(${offset*1.5}px)` }}>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary/85">{step.num} · {step.label}</p>
            <p className="font-display font-medium text-ink text-sm mt-1.5">{step.title}</p>
            <p className="text-muted text-xs leading-relaxed mt-1">{step.desc}</p>
          </div>
        )
      })}
    </div>
  )
}

function AISignatureAnim() {
  const STATUSES = ['Missed call detected','Sending WhatsApp…','Lead replied','Appointment booked ✓']
  const [statusIdx, setStatusIdx] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setStatusIdx(v => (v+1)%STATUSES.length), 2400)
    return () => clearInterval(id)
  }, [])
  const PARTICLES = [
    {left:'10%',delay:'0s',dur:'2.1s'},{left:'24%',delay:'0.55s',dur:'1.85s'},{left:'38%',delay:'1.05s',dur:'2.3s'},
    {left:'52%',delay:'0.3s',dur:'1.95s'},{left:'65%',delay:'1.45s',dur:'2.05s'},{left:'78%',delay:'0.8s',dur:'2.25s'},{left:'90%',delay:'1.75s',dur:'1.75s'},
  ]
  return (
    <div className="relative h-[124px] rounded-xl overflow-hidden select-none border border-divider"
      style={{background:'linear-gradient(180deg,#14100D 0%,#1B1611 65%,#14100D 100%)'}}>
      <style>{`
        @keyframes code-fall{0%{transform:translate(-50%,0);opacity:0}10%{opacity:.8}85%{opacity:.8}100%{transform:translate(-50%,88px);opacity:0}}
        @keyframes scan-ripple{0%{transform:translateX(-50%) scaleX(.2);opacity:.6}80%{transform:translateX(-50%) scaleX(4.5);opacity:0}100%{transform:translateX(-50%) scaleX(4.5);opacity:0}}
        @keyframes cur-blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>
      <div className="absolute top-3 left-1/4 w-20 h-20 rounded-full bg-primary/[0.07] blur-2xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 px-3 py-2 flex items-center justify-between border-b border-divider">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-primary/70">Follow-up engine</span>
        <span className="font-mono text-[8px] text-faint">12 in queue</span>
      </div>
      <div className="absolute inset-x-3" style={{top:'28px'}}>
        <svg viewBox="0 0 200 14" className="w-full" fill="none" aria-hidden="true">
          <rect x="0" y="2" width="200" height="10" rx="2" fill="rgba(196,116,76,0.07)" stroke="rgba(196,116,76,0.26)" strokeWidth="0.5"/>
          {[18,46,74,102,130,158].map((x,i)=><rect key={i} x={x} y="4.5" width="12" height="5" rx="1" fill="rgba(196,116,76,0.18)"/>)}
          {[8,32,58,86,116,144,174].map((x,i)=><circle key={i} cx={x} cy="7" r="1.5" fill="#C4744C" opacity={i%2===0?'0.7':'0.35'}/>)}
        </svg>
      </div>
      {PARTICLES.map((p,i)=>(
        <div key={i} className="absolute font-mono text-primary/60 pointer-events-none" aria-hidden="true"
          style={{left:p.left,top:'20px',fontSize:'9px',animation:`code-fall ${p.dur} ${p.delay} linear infinite`}}>{'</>'}</div>
      ))}
      <div className="absolute inset-x-3 flex items-center gap-1.5" style={{bottom:'30px'}}>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/35 via-primary/15 to-transparent"/>
        <span className="font-mono text-primary/40" style={{fontSize:'9px',animation:'cur-blink 1s step-end infinite'}} aria-hidden="true">_</span>
      </div>
      {[0,1,2].map(i=>(
        <div key={i} className="absolute h-px w-10 bg-primary/30 rounded-full pointer-events-none" aria-hidden="true"
          style={{bottom:'30px',left:'18%',animation:`scan-ripple 2.2s ${i*0.73}s ease-out infinite`}}/>
      ))}
      <div className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-center gap-2 border-t border-divider">
        <div className="h-1.5 w-1.5 rounded-full bg-primary ring-pulse shrink-0"/>
        <span className="font-mono text-[8px] text-primary/85 transition-all duration-500">{STATUSES[statusIdx]}</span>
        <span className="font-mono text-[8px] text-faint ml-auto">LIVE</span>
      </div>
    </div>
  )
}

function AutomationScheduler() {
  const TASKS = [{id:0,label:'Send appointment reminder'},{id:1,label:'Follow up after treatment'},{id:2,label:'Request a review'},{id:3,label:'Send rebooking reminder'}]
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
  // Row pitch is sized so all four tasks clear the 124px frame.
  const ROW_H=22, cursorTop=30+cursorStep*ROW_H
  return (
    <div className="relative h-[124px] rounded-xl overflow-hidden bg-raised border border-divider">
      <div className="px-4 py-2 border-b border-divider flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary ring-pulse shrink-0"/>
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">Retention sequence</span>
        <span className="font-mono text-[8px] text-faint ml-auto">live</span>
      </div>
      <div className="px-4 pt-1">
        {TASKS.map(task=>(
          <div key={task.id} className="flex items-center gap-3" style={{height:ROW_H}}>
            <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 transition-all duration-300 ${checked.has(task.id)?'bg-primary border-primary':'border-divider'}`}>
              {checked.has(task.id)&&<svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="#17120F" strokeWidth={3.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </div>
            <span className={`font-mono text-[10px] transition-all duration-300 ${checked.has(task.id)?'text-faint line-through':'text-ink-2'}`}>{task.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute right-5 transition-all duration-[500ms] ease-out pointer-events-none" style={{top:cursorTop}} aria-hidden="true">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" className={`transition-transform duration-100 ${clicking?'scale-75':'scale-100'}`}>
          <path d="M1 1.5L11.5 8L6.5 9.5L4.5 15L1 1.5Z" fill="#DB9068" stroke="#DB9068" strokeWidth="0.8" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

const CAP_VISUALS = [WorkflowShuffler, AISignatureAnim, AutomationScheduler]

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const close = () => setOpen(false)

  return (
    <>
      {/* Full-width hairline bar — no floating pill, no border until you scroll */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass' : 'bg-transparent'}`}>
        <div className="shell flex items-center justify-between h-[68px]">
          <a href="#home" className="flex items-center gap-2.5 group" aria-label="Home">
            <img src="/logo-icon.png" alt="" className="h-7 w-7 rounded-lg object-contain bg-black shrink-0" aria-hidden="true" />
            <span className="font-display font-medium text-[14px] text-ink tracking-tight">Alfarid Bulbula</span>
          </a>

          {/* Over the hero the nav goes editorial — uppercase, tracked, no
              chrome. It only returns to the compact UI style once you scroll
              past the photograph. */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                className={`relative transition-all duration-500 py-1 hover:text-ink
                            after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary
                            after:transition-all after:duration-300 hover:after:w-full
                            ${scrolled
                              ? 'text-[13.5px] text-muted tracking-normal uppercase-none'
                              : 'text-[11px] uppercase text-ink-2/80 tracking-[0.2em]'}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact"
               className={`hidden lg:inline-flex items-center gap-2 transition-all duration-500 ${
                 scrolled
                   ? 'btn btn-solid !py-2.5 !px-5'
                   : 'text-[11px] uppercase tracking-[0.2em] text-ink-2/80 hover:text-ink font-display'}`}>
              {scrolled ? "Let's talk" : 'Book a call'}
              <ArrowUpRight className="h-3.5 w-3.5"/>
            </a>
            <button onClick={() => setOpen(v => !v)}
              className="lg:hidden p-2 -mr-2 text-ink" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-background transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full px-6 pt-24 pb-10">
          <nav className="flex flex-col">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a key={label} href={href} onClick={close}
                className="flex items-center justify-between py-5 border-b border-divider font-display text-[26px] font-medium text-ink"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}>
                {label} <ArrowUpRight className="h-5 w-5 text-faint"/>
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <a href="#contact" onClick={close} className="btn btn-solid w-full !py-4">
              Let&apos;s talk <ArrowUpRight className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

// Sampled from the lamp light in hero-bg.jpg. Scoped to the hero only — the
// rest of the site keeps its cyan.
const HERO_ACCENT = '#D08A5E'

function Hero() {
  const [lit, setLit] = useState(false)
  const mediaRef = useRef(null)

  // Mount the entrance on the next frame so the transition actually plays.
  useEffect(() => {
    const t = requestAnimationFrame(() => setLit(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Parallax — the photograph falls slower than the page. rAF-throttled and
  // skipped entirely for reduced-motion and for touch, where it costs more
  // than it gives.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const el = mediaRef.current
        if (!el) return
        const y = Math.min(window.scrollY, window.innerHeight)
        el.style.transform = `translate3d(0, ${y * 0.18}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="home" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-deep">

      {/* ── The plate ───────────────────────────────────────────────────
          Full-bleed and uncropped on desktop. On a portrait phone a 16:9
          frame can only ever show a slice, so the framing shifts to the
          notebook and the workflow nodes — the parts worth keeping. */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <div className={`absolute -inset-[2%] hero-media ${lit ? 'in' : ''}`}>
          <img
            src="/hero-bg.jpg"
            alt=""
            className="hero-drift h-full w-full object-cover object-[57%_46%] sm:object-center"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      {/* ── Grade ───────────────────────────────────────────────────────
          The plate is already dark and already lit, so this is restraint,
          not correction: a bottom fall-off and a lower-left pool to seat
          the type, plus a whisper at the top for the nav. Nothing that
          flattens the lamp or buries the desk. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(23,19,16,0.55) 0%, rgba(23,19,16,0.12) 14%, rgba(23,19,16,0) 26%)' }}/>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 78% 68% at 22% 88%, rgba(23,19,16,0.88) 0%, rgba(23,19,16,0.45) 45%, rgba(23,19,16,0) 72%)' }}/>
      <div className="absolute inset-x-0 bottom-0 h-[46%] pointer-events-none" aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(23,19,16,0) 0%, rgba(23,19,16,0.35) 38%, rgba(23,18,15,0.82) 68%, rgba(23,18,15,0.97) 88%, #17120F 100%)' }}/>
      {/* A phone crops out most of the dark floor, so the type needs its own
          ground. Desktop never sees this. */}
      <div className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none sm:hidden" aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(23,19,16,0) 0%, rgba(23,19,16,0.55) 42%, rgba(23,18,15,0.92) 72%, #17120F 100%)' }}/>

      {/* ── Type ────────────────────────────────────────────────────────
          Lower-left, sitting straight on the photograph — no card, no panel.
          The accent is sampled from the plate's own lamp rather than the
          site's cyan, which would fight the warm light. */}
      <div className="relative z-10 h-full flex items-end">
        {/* Sits low on purpose: the plate's desk edge runs across the middle,
            and the type belongs in the dark floor beneath it, not on top of
            the notebook. */}
        <div className="shell w-full pb-[11vh] sm:pb-[6vh] lg:pb-[7vh]">

          <p className={`hero-rise ${lit ? 'in' : ''} font-display text-[10px] sm:text-[11.5px] uppercase`}
             style={{ letterSpacing: '0.32em', color: HERO_ACCENT, transitionDelay: '400ms' }}>
            Alfarid Worakie <span className="opacity-60 mx-1.5">·</span> Abu Dhabi
          </p>

          <h1 className={`hero-rise ${lit ? 'in' : ''} font-serif font-normal text-ink mt-4 sm:mt-6
                          text-[46px] sm:text-[80px] lg:text-[108px] xl:text-[124px]`}
              style={{ letterSpacing: '-0.03em', lineHeight: 0.94, transitionDelay: '540ms',
                       textShadow: '0 2px 44px rgba(23,19,16,0.65)' }}>
            Rawna Automation<span style={{ color: HERO_ACCENT }}>.</span>
          </h1>

          <p className={`hero-rise ${lit ? 'in' : ''} mt-5 sm:mt-7 text-[14.5px] sm:text-[16px]
                         leading-relaxed text-ink-2/90 max-w-[30ch] sm:max-w-[46ch]`}
             style={{ transitionDelay: '680ms', textShadow: '0 1px 24px rgba(23,19,16,0.85)' }}>
            I build AI automation systems and workflows for businesses — replacing manual
            work with systems that run themselves.
          </p>

          {/* A rule that draws itself on hover. No pill, no fill. */}
          <a href="#contact"
             className={`hero-rise ${lit ? 'in' : ''} hero-cta group mt-8 sm:mt-10 inline-flex items-center gap-3
                         font-display text-[11px] sm:text-[12px] uppercase text-ink`}
             style={{ letterSpacing: '0.24em', transitionDelay: '820ms' }}>
            Let&apos;s talk
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"/>
          </a>

        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────
          The only other mark on the screen. */}
      <a href="#services" aria-label="Scroll to content"
         className={`hero-rise ${lit ? 'in' : ''} absolute z-10 bottom-7 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-2
                     text-faint hover:text-ink-2 transition-colors duration-300`}
         style={{ transitionDelay: '900ms' }}>
        <span className="font-display text-[9.5px] uppercase" style={{ letterSpacing: '0.26em', writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <ArrowDown className="hero-cue h-3.5 w-3.5" aria-hidden="true"/>
      </a>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Capabilities
// ─────────────────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section id="services" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="What we do"
          title="We build AI systems that turn med spa enquiries into"
          serif="booked appointments."
          lede="We take the repetitive work off your front desk — answering questions, following up with leads, recovering missed calls, and keeping your calendar full. Built around your clinic, your treatments, and the way your team already works."
        />

        {/* Three panels, side by side on desktop and stacked on a phone.
            Each one runs label → title → live visual → copy → list, and the
            visual block is a fixed height so the three descriptions line up
            across the row however long the titles run. */}
        <div className="mt-10 sm:mt-12 grid gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Visual = CAP_VISUALS[i]
            return (
              <div key={cap.n}
                   className="reveal panel panel-hover flex flex-col p-5 rounded-2xl">
                <p className="font-mono text-[9.5px] uppercase text-muted/80" style={{ letterSpacing: '0.22em' }}>
                  Capability · {cap.n}
                </p>

                {/* Reserved for two lines once the cards sit side by side, so
                    a title that wraps doesn't shove its visual out of line
                    with the other two. */}
                <h3 className="font-display text-[16px] sm:text-[17px] font-semibold text-ink tracking-tight mt-2.5
                               lg:min-h-[46px]">
                  {cap.title}
                </h3>

                <div className="mt-4">
                  <Visual/>
                </div>

                <p className="lede mt-3.5 text-[13px]">{cap.desc}</p>

                <ul className="mt-4 space-y-2">
                  {cap.tools.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[12.5px] text-ink-2/85">
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0 mt-[6px]" aria-hidden="true"/>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Work
// ─────────────────────────────────────────────────────────────────────────────

function ProjectImage({ image, alt, ratio = '16/9' }) {
  // A file that 404s falls back to the same placeholder as no file at all,
  // rather than leaving a broken-image icon in the layout.
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <div className="w-full rounded-xl border border-divider bg-raised flex items-center justify-center"
        style={{ aspectRatio: ratio }}>
        <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-faint">Add screenshot</p>
      </div>
    )
  }
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-divider bg-deep"
      style={{ aspectRatio: ratio }}>
      <img src={image} alt={alt} loading="lazy" onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to top, rgba(16,12,10,0.55) 0%, transparent 45%)' }} aria-hidden="true"/>
    </div>
  )
}

/* Case studies read as an index, not a carousel: all of them visible, scannable,
   each opening the same full case-study modal as before. */
/* One slide. The active one is fully lit and interactive; the neighbours sit
   back — scaled down, dimmed and softly blurred — and clicking one brings it
   to the centre rather than opening it. */
function ProjectCard({ project, index, active, onOpen, onFocus }) {
  return (
    <article
      className={`shrink-0 w-[82vw] sm:w-[56vw] lg:w-[430px] rounded-2xl border p-3.5
                  transition-all duration-700 ease-out
                  ${active ? 'border-primary/25 bg-surface' : 'border-divider bg-surface/50 cursor-pointer'}`}
      style={{
        transform: `scale(${active ? 1 : 0.9})`,
        opacity: active ? 1 : 0.4,
        filter: active ? 'none' : 'blur(2px)',
        boxShadow: active ? '0 28px 80px -40px rgba(196,116,76,0.28)' : 'none',
      }}
      onClick={active ? undefined : onFocus}
      aria-hidden={!active}
    >
      <ProjectImage image={project.image} alt={project.title}/>

      <div className="px-1.5 pt-4 pb-0.5">
        <p className="font-mono text-[9.5px] uppercase text-primary/60" style={{ letterSpacing: '0.22em' }}>
          {String(index + 1).padStart(2, '0')} · Project
        </p>

        <h3 className="font-display text-[16px] sm:text-[18px] font-semibold text-ink tracking-tight leading-snug mt-2">
          {project.title}
        </h3>

        <p className="lede mt-2 text-[12.5px]">{project.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {project.tools.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
          {project.tools.length > 4 && <span className="tag !text-faint">+{project.tools.length - 4}</span>}
        </div>

        <button type="button" onClick={onOpen} tabIndex={active ? 0 : -1}
          className="btn btn-solid w-full mt-4 !py-3 !text-[12.5px]">
          View Case Study <ArrowUpRight className="h-3.5 w-3.5"/>
        </button>
      </div>
    </article>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-deep/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog" aria-modal="true" aria-label={project.title}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-surface rounded-2xl border border-divider"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 22, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <button type="button" onClick={onClose} aria-label="Close case study"
          className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full glass-dark flex items-center justify-center text-ink hover:border-primary/30 transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-10">
          <div className="mb-8"><ProjectImage image={project.image} alt={project.title}/></div>
          <p className="eyebrow mb-4">{String(project.id).padStart(2, '0')} · Case study</p>
          <h3 className="font-display text-[20px] sm:text-[24px] font-medium text-ink tracking-tight leading-tight">{project.title}</h3>
          <p className="lede text-[14.5px] mt-3">{project.subtitle}</p>

          <div className="mt-9">
            {[{ key:'problem', label:'Problem' }, { key:'solution', label:'Solution' }, { key:'result', label:'Result' }].map(({ key, label }) => (
              <div key={key} className="border-t border-divider py-6 grid sm:grid-cols-12 gap-3 sm:gap-6">
                <p className="sm:col-span-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/60 pt-1">{label}</p>
                <p className="sm:col-span-9 text-ink-2 text-[14.5px] leading-relaxed">{project[key]}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-divider">
            {project.tools.map(tool => <span key={tool} className="tag">{tool}</span>)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects() {
  const [openId, setOpenId] = useState(null)
  const [active, setActive] = useState(0)
  const openProject = PROJECTS.find(p => p.id === openId)

  const N = PROJECTS.length
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const [layout, setLayout] = useState({ card: 0, height: 0 })

  // Cards are stacked absolutely so the carousel can wrap, which means the
  // stage needs an explicit height and each card needs its measured width to
  // sit a full step to the side. Both are viewport-dependent, so measure.
  useEffect(() => {
    const measure = () => {
      const cards = cardRefs.current.filter(Boolean)
      if (!cards.length) return
      setLayout({
        card: cards[0].offsetWidth,
        height: Math.max(...cards.map(c => c.offsetHeight)),
      })
    }
    measure()
    window.addEventListener('resize', measure)
    // Re-measure once webfonts land, since they change how titles wrap.
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener('resize', measure)
  }, [])

  const go = (dir) => setActive(v => (v + dir + N) % N)

  // Signed distance from the active card, wrapped so the ends meet: with three
  // projects every card is always -1, 0 or +1 away.
  const distanceFrom = (i) => {
    let d = (((i - active) % N) + N) % N
    if (d > N / 2) d -= N
    return d
  }

  const GAP = 26

  return (
    <section id="work" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="Selected work"
          title="The work,"
          serif="in context."
          lede="Three systems built end to end. Open any one for the full problem, solution, and result."
        />
      </div>

      {/* Full-bleed so the neighbouring cards stay visible past the shell. */}
      <div className="relative mt-10 sm:mt-12">
        <div ref={stageRef} className="relative overflow-hidden"
             style={{ height: layout.height ? layout.height + 48 : undefined }}>
          {PROJECTS.map((p, i) => {
            const d = distanceFrom(i)
            const isActive = d === 0
            const shown = Math.abs(d) <= 1
            return (
              <div key={p.id}
                   ref={el => { cardRefs.current[i] = el }}
                   className="absolute top-1/2 left-1/2 transition-all duration-700 ease-out"
                   style={{
                     transform: `translate(-50%, -50%) translateX(${d * (layout.card + GAP)}px)`,
                     zIndex: isActive ? 2 : 1,
                     visibility: shown ? 'visible' : 'hidden',
                     pointerEvents: shown ? 'auto' : 'none',
                   }}>
                <ProjectCard project={p} index={i} active={isActive}
                  onOpen={() => setOpenId(p.id)} onFocus={() => setActive(i)}/>
              </div>
            )
          })}
        </div>

        {/* Arrows sit outside the cards. The carousel wraps, so both always show. */}
        <button type="button" onClick={() => go(-1)} aria-label="Previous project"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full
                     border border-divider bg-background/80 backdrop-blur flex items-center justify-center
                     text-ink-2 hover:text-ink hover:border-primary/30 transition-colors duration-300">
          <ArrowRight className="h-4 w-4 rotate-180"/>
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next project"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full
                     border border-divider bg-background/80 backdrop-blur flex items-center justify-center
                     text-ink-2 hover:text-ink hover:border-primary/30 transition-colors duration-300">
          <ArrowRight className="h-4 w-4"/>
        </button>

        {/* Position readout */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {PROJECTS.map((p, i) => (
            <button key={p.id} type="button" onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`} aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-500
                          ${i === active ? 'w-7 bg-primary' : 'w-1.5 bg-divider hover:bg-faint'}`}/>
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
// About
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Process
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = [
  { n: '01', lead: 'Create the container.', rest: 'The full audit, with your team.' },
  { n: '02', lead: 'Lay the foundation.',   rest: 'Build on your tools. Guardrails on anything touching money.' },
  { n: '03', lead: 'Activation.',           rest: 'Switch on, test live, tune it to sound like you.' },
  { n: '04', lead: 'Integration.',          rest: 'Hand over, train your team, refine as you grow.' },
]

function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="How it works"
          title="Four phases."
          lede="One install. We run it the same way every time."
        />

        {/* Numeral rail on the left, one flowing line of copy on the right —
            the bold lead-in and the rest read as a single sentence. */}
        <div className="mt-10 sm:mt-12">
          {PHASES.map(p => (
            <div key={p.n}
                 className="reveal border-t border-divider py-5 sm:py-6
                            grid grid-cols-[auto_1fr] gap-5 sm:gap-8 items-baseline">
              <span className="font-display text-[22px] sm:text-[26px] font-light text-ink-2/70
                               leading-none tracking-tight tabular-nums">
                {p.n}
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">{p.lead}</span>{' '}{p.rest}
              </p>
            </div>
          ))}
          <div className="rule"/>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// The install
// ─────────────────────────────────────────────────────────────────────────────

const DELIVERABLES = [
  {
    title: 'The full audit',
    desc:  'I map your business with your team and find what to take off your plate first',
  },
  {
    title: 'Every system built and tuned',
    desc:  'Sales, support, content, and operations, built on your tools and tuned to sound like you',
  },
  {
    title: 'Your team trained',
    desc:  'I hand it over and upskill your people so it runs without me',
  },
  {
    title: 'Ongoing support',
    desc:  'Upkeep and staying ahead of every update. Flexible, pause whenever things are running smoothly',
  },
]

function Install() {
  return (
    <section id="install" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="The install"
          title="What you get."
          lede="One engagement. Everything built, tuned, and handed over."
        />

        {/* The whole deliverable list sits inside one panel — it reads as a
            single scope of work rather than four separate offers. */}
        <div className="reveal panel rounded-3xl mt-9 sm:mt-10 px-6 sm:px-8 py-2 sm:py-3 max-w-prose">
          {DELIVERABLES.map(d => (
            <div key={d.title} className="border-t border-divider first:border-t-0 py-5 sm:py-6">
              <h3 className="font-display text-[15px] sm:text-[16px] font-medium text-ink tracking-tight">
                {d.title}
              </h3>
              <p className="lede mt-1.5 text-[13px] sm:text-[13.5px]">{d.desc}</p>
            </div>
          ))}

          <p className="text-muted text-[13px] sm:text-[13.5px] leading-relaxed border-t border-divider pt-5 pb-6">
            We scope it on the call, to exactly what your business needs. Then we start.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Audience
// ─────────────────────────────────────────────────────────────────────────────

const AUDIENCE = [
  { n: '01', lead: 'You run a real company.',   rest: 'Business operations are eating you alive.' },
  { n: '02', lead: 'You want your time back.',  rest: 'Not another tool to manage. A system that runs without you.' },
  { n: '03', lead: 'You move fast.',            rest: 'You can describe what you want in plain English and let me build it live.' },
]

function Audience() {
  return (
    <section id="who" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead eyebrow="Who this is for" title="Operators, not beginners."/>

        {/* Same numeral-and-sentence rhythm as the phases above, but the
            numerals sit at body size here — these are qualifiers, not steps. */}
        <div className="mt-9 sm:mt-10">
          {AUDIENCE.map(a => (
            <div key={a.n}
                 className="reveal border-t border-divider first:border-t-0 py-5 sm:py-6
                            grid grid-cols-[auto_1fr] gap-4 sm:gap-6 items-baseline">
              <span className="text-[13px] sm:text-[14px] leading-relaxed text-muted tabular-nums">
                {a.n}
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">{a.lead}</span>{' '}{a.rest}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead eyebrow="About me" title="AI Automation Builder" serif="& AI Auditor."/>

        <div className="mt-10 sm:mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Portrait */}
          <div className="reveal lg:col-span-4 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-divider bg-surface">
              <img src="/profile.jpg" alt="Alfarid Bulbula — AI Automation Builder" loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.02]"/>
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" aria-hidden="true"
                style={{ background:'linear-gradient(to top, rgba(16,12,10,0.6), transparent)' }}/>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost !px-0 !py-3 !text-[12.5px]" aria-label={label}>
                  <Icon className="h-3.5 w-3.5"/> {label}
                </a>
              ))}
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`} target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost !px-0 !py-3 !text-[12.5px]" aria-label="Email">
                <Mail className="h-3.5 w-3.5"/> Email
              </a>
            </div>
          </div>

          {/* Points — a labelled index rather than a bulleted list */}
          <div className="lg:col-span-8">
            {ABOUT_POINTS.map((pt, i) => (
              <div key={i} className="reveal border-t border-divider py-5 sm:py-6 grid sm:grid-cols-12 gap-2 sm:gap-5">
                <p className="sm:col-span-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/55 pt-1.5">{pt.k}</p>
                <p className="sm:col-span-9 text-muted text-[13.5px] leading-relaxed">{pt.text}</p>
              </div>
            ))}
            <div className="rule"/>
            <div className="reveal flex items-center gap-2.5 pt-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CAF7A] ring-pulse-green shrink-0"/>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">Available for new projects · 2026</span>
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
      <div className="h-14 w-14 rounded-full border border-primary/25 bg-primary/[0.07] flex items-center justify-center mb-6">
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 className="font-display text-[19px] font-medium text-ink mb-2">Message sent.</h3>
      <p className="lede text-[14px] max-w-[240px]">I&apos;ll read it and reply within one business day.</p>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: replace setTimeout with a real submission (Resend, Formspree, etc.)
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="scroll-mt-24 py-12 sm:py-14 lg:py-16 border-t border-divider">
      <div className="shell">

        <div ref={headingRef} className="col">
          <p className="eyebrow flex items-center gap-3 mb-6">
            <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true"/>
            <TextScramble as="span" trigger={headingInView} duration={0.5} speed={0.025}>GET IN TOUCH</TextScramble>
          </p>
          <h2 className="h-statement text-[32px] sm:text-[42px] lg:text-[50px]">
            Let&apos;s build{' '}
            <TextScramble as="span" trigger={headingInView} duration={1.1} speed={0.03} className="italic text-primary">
              something real.
            </TextScramble>
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          <div className="reveal lg:col-span-5 flex flex-col gap-8">
            <p className="lede text-[13.5px] max-w-[42ch]">
              If you have a repetitive process you want automated, or an idea for an AI system —
              send a message. I read everything and reply directly, even if the project isn&apos;t a fit.
            </p>

            <div className="relative group max-w-[300px] mt-2">
              <div className="shake-on-hover relative rounded-xl overflow-hidden border border-divider bg-surface">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDV3YXl1cDZzbHJhbmtsMGRteXpia2MxdXN5ZDA1MTAzcThtNHhocSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SpopD7IQN2gK3qN4jS/giphy.gif"
                  alt="Animated illustration of someone working at a laptop"
                  className="w-full h-auto object-cover opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                  style={{ background:'linear-gradient(to top, rgba(14,16,20,0.6), transparent 55%)' }}/>
              </div>
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
              Typical response within 24 hours
            </p>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="panel p-5 sm:p-6 rounded-2xl">
              {status === 'sent' ? <SentState/> : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name"  id="f-name"  type="text"  value={form.name}  onChange={set('name')}  placeholder="Your name"       required/>
                    <Field label="Email" id="f-email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required/>
                  </div>
                  <Field
                    label="What do you want to automate?"
                    id="f-message" type="textarea" rows={4}
                    value={form.message} onChange={set('message')}
                    placeholder="Describe the repetitive process, the tools you use, and what outcome you're after…"
                    required
                  />
                  <button type="submit" disabled={status === 'sending'}
                    className="btn btn-solid w-full !py-3 !text-[13px] mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'sending' ? 'Sending…' : (<>Send message <ArrowUpRight className="h-4 w-4"/></>)}
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
    <footer className="border-t border-divider py-14">
      <div className="shell">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <img src="/logo-icon.png" alt="" className="h-7 w-7 rounded-lg object-contain bg-black shrink-0" aria-hidden="true"/>
            <div>
              <p className="font-display text-[13.5px] font-medium text-ink tracking-tight">Alfarid Bulbula</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint mt-0.5">AI Automation Builder</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Footer">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="text-[13px] text-muted hover:text-ink transition-colors duration-200">{label}</a>
            ))}
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-[13px] text-muted hover:text-ink transition-colors duration-200">{label}</a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// App root
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  useReveal()
  return (
    <div className="relative">
      <div className="noise-overlay" aria-hidden="true"/>
      <Navbar/>
      <main>
        <Hero/>
        <Features/>
        <Projects/>
        <Process/>
        <Install/>
        <Audience/>
        <About/>
        <ContactForm/>
      </main>
      <Footer/>
      <Analytics />
    </div>
  )
}
