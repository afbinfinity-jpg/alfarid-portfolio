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
    desc: 'AI handles incoming website and WhatsApp inquiries 24/7, answers approved questions about your services, qualifies leads, and books appointments.',
    tools: [
      'AI website assistant',
      'WhatsApp conversations',
      'Lead qualification & appointment booking',
      'Service FAQs & pricing',
      'Human handoff when needed',
    ],
  },
  {
    n: '02',
    title: 'Lead Follow-Up & Recovery',
    desc: "Automatically follows up with leads your team didn't reach, missed calls, and people who showed interest but never booked.",
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
    title: 'Client Retention & Rebooking',
    desc: "Keeps existing clients engaged after their appointment and brings them back when they're due for another visit.",
    tools: [
      'Appointment reminders',
      'No-show recovery',
      'Post-appointment follow-up',
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
    image:    '/screenshots/luna/live-demos-desktop.png',
    // 3:2 plate in a 16:9 frame — anchoring low keeps the laptop in shot and
    // takes the crop out of the empty wall above it instead.
    imagePos: '62%',
    // Rows rather than a flat list, so the rhythm — full bleed, a pair, a
    // small detail — is declared here instead of inferred by the renderer.
    // Intrinsic w/h travel with each image so the browser reserves the right
    // box and nothing is ever stretched to fit.
    gallery: [
      {
        kind: 'full',
        items: [{
          src: '/screenshots/luna/live-demos-desktop.png', w: 1536, h: 1024,
          label: 'Live Demos',
          caption: 'Six scenarios run start to finish — each one plays on its own and updates the dashboard as it goes.',
        }],
      },
      {
        kind: 'pair',
        items: [
          {
            src: '/screenshots/luna/live-demos-mobile.png', w: 1024, h: 1536,
            label: 'On mobile',
            caption: 'The same system in the owner’s hand.',
          },
          {
            src: '/screenshots/luna/identity.png', w: 1254, h: 1254,
            label: 'Identity',
            caption: 'A clinic-facing mark, kept deliberately plain so the data stays the loudest thing on screen.',
          },
        ],
      },
      {
        // A small plate on the left, with the two result charts stacked into
        // the space beside it — the row the case study closes on.
        kind: 'detail',
        items: [{
          src: '/screenshots/luna/navigation.png', w: 502, h: 710,
          label: 'Navigation',
          caption: 'Five destinations, no sub-menus. Everything the front desk needs is one click from anywhere.',
        }],
        stack: [
          {
            src: '/screenshots/luna/performance-trend.png', w: 922, h: 786,
            label: 'Performance',
            caption: 'Leads against appointments over six months.',
          },
          {
            src: '/screenshots/luna/appointments-by-source.png', w: 622, h: 624,
            label: 'Appointments by source',
            caption: 'Where the bookings actually came from.',
          },
        ],
      },
    ],
  },
  {
    id:       5,
    title:    'Med Spa Website & AI Lead Acquisition System',
    subtitle: 'Website design, lead capture & automated patient acquisition',
    problem:  'Aesthetic clinics can generate significant website traffic, but many potential clients leave without booking. Visitors may be interested in a treatment but not ready to schedule a consultation immediately, resulting in valuable leads being lost with no way for the clinic to follow up.',
    solution: [
      'Designed and built a premium, conversion-focused med spa website with an integrated lead acquisition system. Visitors can book directly, contact the clinic through WhatsApp, interact with the AI assistant, or submit their name, phone number, email, and treatment interest through a low-friction lead capture form.',
      "The captured enquiry can then enter the clinic's lead pipeline for qualification and automated follow-up rather than disappearing after the visitor leaves the website.",
    ],
    result:   "Created a complete digital acquisition experience that combines the clinic's website, lead capture, AI assistance, WhatsApp, and appointment booking into one connected system — giving the clinic multiple opportunities to convert website traffic into qualified enquiries and consultations.",
    tools:    ['Website Design', 'AI Assistant', 'WhatsApp', 'Lead Capture', 'Booking'],
    accent:   'primary',
    image:    '/screenshots/luna-site/website.png',
    gallery: [
      {
        kind: 'full',
        items: [{
          src: '/screenshots/luna-site/website.png', w: 1536, h: 1024,
          label: 'The website',
          caption: 'A consultation-first homepage — booking, WhatsApp and the AI assistant all reachable without scrolling.',
        }],
      },
      {
        // Both plates are portrait, so the taller ratio takes the narrower
        // track and the two land at roughly the same height.
        kind: 'pair',
        items: [
          {
            src: '/screenshots/luna-site/ai-assistant.png', w: 864, h: 1570,
            label: 'AI assistant',
            caption: 'Answers from approved clinic information, with a route to WhatsApp or a consultation at any point.',
          },
          {
            src: '/screenshots/luna-site/lead-capture.png', w: 1024, h: 1536,
            label: 'Lead capture',
            caption: 'The low-friction path for visitors who are interested but not ready to book — name, number, email, treatment interest.',
          },
        ],
      },
      {
        kind: 'full',
        items: [{
          src: '/screenshots/luna-site/acquisition-flow.png', w: 1536, h: 1024,
          label: 'Acquisition flow',
          caption: 'Website enquiry into the pipeline and on to follow-up — so an interested visitor is still reachable after they leave.',
        }],
      },
    ],
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
    image:    '/screenshots/invoice/upload.png',
    // Same 3:2-in-16:9 crop as the other laptop plates.
    imagePos: '62%',
    gallery: [
      {
        kind: 'full',
        items: [{
          src: '/screenshots/invoice/upload.png', w: 1536, h: 1024,
          label: 'Upload',
          caption: 'Invoices are dropped in and queued for extraction — the only manual step in the pipeline.',
        }],
      },
    ],
  },
  {
    id:       6,
    title:    'Business Sales & Payment Management System',
    subtitle: 'Website design, business management & custom SaaS development',
    problem:  'Small businesses often manage sales, customer debts, inventory, employee activity, and payments across spreadsheets, paper records, and messaging apps. This makes it difficult for owners to maintain visibility over transactions, control employee access, and ensure that payments have actually been received before customer balances are updated.',
    solution: [
      'Designed and built a centralized business management platform that connects sales, inventory, customers, employees, outstanding payments, and financial approvals in one system.',
      'Employees can quickly record and edit sales, manage customer information, and communicate privately with administrators, while administrators maintain control over payment approvals and business-wide financial information.',
      'The system also includes role-based access, employee performance tracking, Telegram integration, multilingual support, audit history, notifications, and automated customer/account management — creating a tailored internal SaaS experience rather than a simple website.',
    ],
    result: [
      'Created a complete operational system that gives the business a single place to manage its day-to-day activity, while giving the owner greater visibility and control over sales, payments, employees, inventory, and customer accounts.',
      'The platform turns fragmented business operations into a connected digital workflow, with the flexibility to be customized and deployed for other businesses with similar operational needs.',
    ],
    tools:    ['Custom SaaS', 'Role-Based Access', 'Payments', 'Telegram', 'Multilingual'],
    accent:   'primary',
    image:    '/screenshots/sala/dashboard.png',
    gallery: [
      {
        kind: 'full',
        items: [{
          src: '/screenshots/sala/dashboard.png', w: 1536, h: 1024,
          label: 'The dashboard',
          caption: 'Sales, outstanding balances and recent activity in one view — what the owner opens to see where the business stands.',
        }],
      },
      {
        kind: 'full',
        items: [{
          src: '/screenshots/sala/platform.png', w: 1448, h: 1086,
          label: 'The platform',
          caption: 'Outstanding balance, collections and unpaid invoices on one screen — the owner’s view of where the money actually stands.',
        }],
      },
      {
        // Navigation on the left, the other two stacked beside it. The lead
        // takes the wider track here because the pair on the right is two
        // tall plates — it keeps the two columns close in height.
        kind: 'detail',
        wideLead: true,
        items: [{
          src: '/screenshots/sala/navigation.png', w: 570, h: 1094,
          label: 'Navigation',
          caption: 'Split between day-to-day work and the management surfaces behind it — what an employee touches, and what only an administrator does.',
        }],
        stack: [
          {
            src: '/screenshots/sala/ask-your-shop.png', w: 852, h: 900,
            label: 'Ask about your shop',
            caption: 'Plain-language questions answered from the business’s own records, without anything leaving the system.',
          },
          {
            src: '/screenshots/sala/mobile-signin.png', w: 853, h: 1844,
            label: 'On mobile',
            caption: 'Role-based sign-in with language selected up front — the same platform from the shop floor.',
          },
        ],
      },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alfarid-bulbula-91a7032a7/', Icon: LinkedinIcon },
  { label: 'GitHub',   href: 'https://github.com/afbinfinity-jpg',                     Icon: GithubIcon   },
]

const CONTACT_EMAIL = 'afbinfinity@gmail.com'

// The booking link. The nav CTAs go straight here; the hero and the contact
// form stay on the page, so someone not ready to commit to a call still has
// somewhere to land.
const CALENDLY_URL = 'https://calendly.com/afbinfinity/ai-audit'

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
        {/* The closing clause is a line break, not a colour change — it stays
            in the heading's own cream. The orange is left to the eyebrow and
            the small marks around it. */}
        {serif && <span className="block sm:inline">{serif}</span>}
      </h2>
      {lede && <p className="reveal lede mt-4 text-[14px] max-w-[62ch]">{lede}</p>}
    </div>
  )
}

function Field({ label, id, type = 'text', value, onChange, placeholder, required, rows }) {
  const cls = 'w-full bg-background border border-divider rounded-lg px-4 py-2.5 text-[13.5px] text-ink placeholder:text-faint font-body focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/15 transition-colors duration-200'
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">{label}</label>
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
               className={`hidden lg:inline-flex items-center gap-2 transition-all duration-500 ${
                 scrolled
                   ? 'btn btn-solid !py-2.5 !px-5'
                   : 'text-[11px] uppercase tracking-[0.2em] text-ink-2/80 hover:text-ink font-display'}`}>
              Book a call
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={close}
               className="btn btn-solid w-full !py-4">
              Book a call <ArrowUpRight className="h-4 w-4"/>
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
        {/* Dropped a couple of vh from the original: the eyebrow was landing on
            the bright cable running across the plate, which cut the tracked caps
            in half. Lower, it sits on the dark floor. */}
        <div className="shell w-full pb-[8vh] sm:pb-[4vh] lg:pb-[4.5vh]">

          <p className={`hero-rise ${lit ? 'in' : ''} font-display text-[10px] sm:text-[11.5px] uppercase`}
             style={{ letterSpacing: '0.32em', color: HERO_ACCENT, transitionDelay: '400ms',
                      textShadow: '0 1px 20px rgba(23,19,16,0.9)' }}>
            Alfarid Worakie <span className="opacity-60 mx-1.5">·</span> Abu Dhabi
          </p>

          <h1 className={`hero-rise ${lit ? 'in' : ''} font-display font-extrabold text-ink mt-4 sm:mt-6
                          text-[46px] sm:text-[80px] lg:text-[108px] xl:text-[124px]`}
              style={{ letterSpacing: '-0.042em', lineHeight: 0.92, transitionDelay: '540ms',
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
            {/* Points down because the link scrolls the page, not away from it.
                The hover nudge follows the arrow. */}
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1.5"/>
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

// One capability, collapsed to a single line until asked. Clicking opens the
// full detail; hovering only reports the row upward, since the preview card
// itself is owned by the parent. Both the open row and the previewed row are
// parent state, so only one of each can ever exist.
function CapabilityRow({ cap, Visual, open, onToggle, onPeek, onPeekEnd }) {
  const panelId = `cap-panel-${cap.n}`
  const rowRef = useRef(null)

  // Hand the element up so the parent can align the preview to this row.
  // Reported on enter rather than on mount, so the measurement is always
  // against current layout rather than a cached value.
  const peek = () => onPeek(rowRef.current)

  return (
    <div ref={rowRef}
         className={`cap-row ${open ? 'open' : ''} relative border-b border-divider-2`}
         onMouseEnter={peek}
         onFocusCapture={peek}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          onBlur={onPeekEnd}
          aria-expanded={open}
          aria-controls={panelId}
          className="group w-full flex items-center gap-6 sm:gap-10 py-7 sm:py-9 lg:py-10 text-left
                     transition-colors duration-300"
        >
          <span className="font-mono text-[10px] sm:text-[11px] text-faint group-hover:text-primary
                           transition-colors duration-300 shrink-0"
                style={{ letterSpacing: '0.22em' }}>
            {cap.n}
          </span>

          <span className={`flex-1 font-display text-[19px] sm:text-[24px] lg:text-[28px] font-semibold
                            tracking-tight transition-colors duration-300
                            ${open ? 'text-ink' : 'text-ink-2 group-hover:text-ink'}`}>
            {cap.title}
          </span>

          {/* Two hairlines crossed into a plus, rotating to an × when open.
              Drawn rather than an icon so it inherits the row's weight. */}
          <span className={`cap-mark relative h-3.5 w-3.5 shrink-0 transition-colors duration-300
                            ${open ? 'text-primary' : 'text-faint group-hover:text-primary'}`}
                aria-hidden="true">
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current"/>
            <span className="absolute top-0 left-1/2 w-px h-full -translate-x-1/2 bg-current"/>
          </span>
        </button>
      </h3>

      {/* Full detail. Always in the DOM so the height has something to animate
          to; hidden from assistive tech while collapsed. Nothing inside is
          focusable, so aria-hidden alone is enough to keep it out of the way. */}
      <div id={panelId} className="cap-body" role="region" aria-hidden={!open}>
        <div>
          <div className="cap-inner pb-10 sm:pb-12 pl-10 sm:pl-[70px] pr-2">
            <div className="cap-rule h-px bg-divider mb-8" aria-hidden="true"/>

            <div className="grid gap-8 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div>
                <p className="lede text-[14px] sm:text-[15px] max-w-[54ch]">{cap.desc}</p>

                <ul className="mt-7 space-y-3.5">
                  {cap.tools.map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[13px] text-ink-2/85">
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0 mt-[7px]" aria-hidden="true"/>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The live visual keeps its place, now only for the row being
                  read rather than all three at once. */}
              <div className="w-full">
                <Visual/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Features() {
  // Null until asked — the section opens fully collapsed.
  const [openCap, setOpenCap] = useState(null)

  // The single previewed row: which capability, and where to sit vertically.
  // One piece of state for the whole list is what guarantees one card.
  const [peek, setPeek] = useState(null)

  const gridRef = useRef(null)

  // Only a real cursor gets previews. Touch reports no usable hover, and a
  // card it cannot dismiss would sit there stranded.
  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  // Measure against the grid rather than reading offsetTop, so the number is
  // correct regardless of which ancestor happens to be positioned.
  const showPeek = (i, el) => {
    if (!canHover() || !el || !gridRef.current) return
    const row = el.getBoundingClientRect()
    const grid = gridRef.current.getBoundingClientRect()
    setPeek({ i, top: row.top - grid.top + row.height / 2 })
  }

  const active = peek && openCap !== peek.i ? peek : null

  return (
    <section id="services" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="What we do"
          title="We build AI systems that turn inquiries into"
          serif="booked appointments."
          lede="We take the repetitive work off your team — answering questions, following up with leads, recovering missed calls, and keeping your calendar full. Built around your business, your services, and the way your team already works."
        />

        {/* A stack of rows rather than three filled cards. Collapsed, each row
            is number / name / mark; the detail is one click away and only one
            row holds it at a time. The preview lives in its own column to the
            right, so it can never overlap or displace a row. */}
        <div
          ref={gridRef}
          className="reveal mt-12 sm:mt-16 relative border-t border-divider-2"
          onMouseLeave={() => setPeek(null)}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityRow
              key={cap.n}
              cap={cap}
              Visual={CAP_VISUALS[i]}
              open={openCap === i}
              onToggle={() => setOpenCap(openCap === i ? null : i)}
              onPeek={el => showPeek(i, el)}
              onPeekEnd={() => setPeek(null)}
            />
          ))}

          {/* The preview floats over the right end of the row it belongs to —
              the rows keep the full width, and this is inert to pointers so
              covering them costs nothing. Held clear of the right edge so the
              row's own mark stays visible under it. Hidden below lg, where
              tap-to-expand is the whole interaction. */}
          <div className="hidden lg:block" aria-hidden="true">
            <div
              className={`cap-preview absolute z-30 right-12 w-[340px] ${active ? 'shown' : 'hidden-state'}`}
              style={{ top: active ? active.top : (peek?.top ?? 0) }}
            >
              <div className="panel glass rounded-xl px-5 py-4">
                <p className="font-mono text-[9px] uppercase text-primary/90 mb-2"
                   style={{ letterSpacing: '0.22em' }}>
                  {active ? CAPABILITIES[active.i].n : ''}
                </p>
                <p className="text-[12.5px] leading-relaxed text-ink-2/90">
                  {active ? CAPABILITIES[active.i].desc : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Work
// ─────────────────────────────────────────────────────────────────────────────

// `pos` is the vertical crop anchor. Defaults to the top, which suits a flat
// screenshot; a mockup with the subject low in the frame wants it further down
// so the object itself is not the part that gets cut.
function ProjectImage({ image, alt, ratio = '16/9', pos = 'top' }) {
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
      {/* Held at a standing scale above 1 so the frame crops into the plate
          rather than sitting back from it — the interface inside a mockup is
          the subject, not the desk around it. Hover pushes it a little
          further from that resting point. */}
      <img src={image} alt={alt} loading="lazy" onError={() => setFailed(true)}
        style={{ objectPosition: `center ${pos}` }}
        className="w-full h-full object-cover scale-[1.13] transition-transform duration-[900ms] ease-out group-hover:scale-[1.17]"/>
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
      <ProjectImage image={project.image} alt={project.title} pos={project.imagePos}/>

      <div className="px-1.5 pt-4 pb-0.5">
        <p className="font-mono text-[9.5px] uppercase text-primary/60" style={{ letterSpacing: '0.22em' }}>
          {String(index + 1).padStart(2, '0')} · Project
        </p>

        <h3 className="font-display text-[16px] sm:text-[18px] font-semibold text-ink tracking-tight leading-snug mt-2">
          {project.title}
        </h3>

        <p className="lede mt-2 text-[12.5px]">{project.subtitle}</p>

        {/* The stack sits inside the case study, not on the card — the card
            stays title, one line, and the way in. */}
        <button type="button" onClick={onOpen} tabIndex={active ? 0 : -1}
          className="btn btn-solid w-full mt-5 !py-3 !text-[12.5px]">
          View Case Study <ArrowUpRight className="h-3.5 w-3.5"/>
        </button>
      </div>
    </article>
  )
}

// Hoisted so its identity is stable — useInView keys its effect on this, and
// a fresh object each render would rebuild the observer every time.
const PLATE_IO = { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }

// One plate in the case study. Reveals itself rather than relying on the
// page-level useReveal sweep, which runs before a modal exists. Intrinsic
// width/height keep the aspect ratio exact and stop the layout jumping as
// each image lands.
function Plate({ item, delay = 0, priority = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, PLATE_IO)

  return (
    <figure ref={ref} className="reveal-plate" data-in={inView || undefined}
            style={{ transitionDelay: `${delay}ms` }}>
      {/* A standing scale inside the clipped frame. The box keeps the image's
          own proportions — the transform is visual only, so nothing reflows —
          while the margin around the subject is cropped away and the screen
          inside the mockup comes forward. */}
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-divider bg-deep">
        <img
          src={item.src}
          alt={item.label}
          width={item.w}
          height={item.h}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block w-full h-auto scale-[1.08] origin-center"
        />
      </div>
      {(item.label || item.caption) && (
        <figcaption className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          {item.label && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/70 shrink-0">
              {item.label}
            </span>
          )}
          {item.caption && (
            <span className="text-[12.5px] leading-relaxed text-muted max-w-[52ch]">
              {item.caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

// The image story: a wide plate, then a pair, then a small detail held against
// open space. Rows carry their own shape so the rhythm stays varied rather
// than collapsing into an even grid.
function CaseStudyGallery({ gallery }) {
  if (!gallery?.length) return null

  return (
    <section className="mt-14 sm:mt-20 border-t border-divider pt-10 sm:pt-14">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/60 mb-8 sm:mb-12">
        Inside the system
      </p>

      <div className="space-y-14 sm:space-y-20 lg:space-y-28">
        {gallery.map((row, r) => {
          if (row.kind === 'pair') {
            return (
              // Weighted 5/7 rather than even halves: the taller portrait gets
              // the narrower track, so the two plates land at roughly the same
              // height without either being cropped.
              <div key={r} className="grid gap-8 sm:gap-10 lg:gap-14
                                      lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
                {row.items.map((item, i) => (
                  <Plate key={item.src} item={item} delay={i * 110}/>
                ))}
              </div>
            )
          }

          if (row.kind === 'detail') {
            return (
              // A small plate on the left. Anything in `stack` fills the space
              // beside it, one above the other, offset to leave a gutter
              // between the two columns rather than butting them together.
              // `wideLead` gives the left plate the wider track — worth it when
              // the stack beside it is tall enough to run away in height.
              // Class strings stay literal so Tailwind can see them.
              <div key={r} className="grid gap-10 sm:gap-12 lg:gap-0 lg:grid-cols-12 lg:items-start">
                <div className={row.wideLead ? 'lg:col-span-6' : 'lg:col-span-5'}>
                  {row.items.map(item => <Plate key={item.src} item={item}/>)}
                </div>

                {row.stack?.length ? (
                  <div className={`space-y-10 sm:space-y-12 ${
                    row.wideLead ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-6 lg:col-start-7'
                  }`}>
                    {row.stack.map((item, i) => (
                      <Plate key={item.src} item={item} delay={(i + 1) * 110}/>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          }

          return (
            <div key={r}>
              {row.items.map(item => <Plate key={item.src} item={item}/>)}
            </div>
          )
        })}
      </div>
    </section>
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
        className="relative w-full max-w-3xl lg:max-w-6xl max-h-[88vh] overflow-y-auto bg-surface rounded-2xl border border-divider"
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
          {/* A case study with its own gallery opens on the writing — the
              images tell the story further down. Everything else keeps the
              single framed plate up top. */}
          {!project.gallery && (
            <div className="mb-8"><ProjectImage image={project.image} alt={project.title}/></div>
          )}
          <p className="eyebrow mb-4">{String(project.id).padStart(2, '0')} · Case study</p>
          <h3 className="font-display text-[20px] sm:text-[24px] font-medium text-ink tracking-tight leading-tight">{project.title}</h3>
          <p className="lede text-[14.5px] mt-3">{project.subtitle}</p>

          <div className="mt-9">
            {[{ key:'problem', label:'Problem' }, { key:'solution', label:'Solution' }, { key:'result', label:'Result' }].map(({ key, label }) => (
              <div key={key} className="border-t border-divider py-6 grid sm:grid-cols-12 gap-3 sm:gap-6">
                <p className="sm:col-span-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/60 pt-1">{label}</p>
                {/* A field may be a single string or several paragraphs. */}
                <div className="sm:col-span-9 space-y-4">
                  {(Array.isArray(project[key]) ? project[key] : [project[key]]).map((para, i) => (
                    <p key={i} className="text-ink-2 text-[14.5px] leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <CaseStudyGallery gallery={project.gallery}/>

          <div className="flex flex-wrap gap-2 mt-14 sm:mt-20 pt-6 border-t border-divider">
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
          lede="Open any one for the full problem, solution, and result."
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

// The engagement, end to end: what happens in each phase and what the client
// is left holding at the end of it. One list rather than a process section
// followed by a deliverables section saying the same thing twice.
const PHASES = [
  {
    n: '01',
    title: 'Audit & Strategy',
    desc:  'Map your business, identify repetitive work, and find the highest-impact opportunities for automation.',
  },
  {
    n: '02',
    title: 'Build & Connect',
    desc:  'Build the AI agents and workflows, then connect them to the tools your business already uses.',
  },
  {
    n: '03',
    title: 'Test & Activate',
    desc:  'Test everything in real scenarios, refine the systems, and launch them into your day-to-day operations.',
  },
  {
    n: '04',
    title: 'Handover & Support',
    desc:  'Train your team, document the systems, and provide ongoing optimization when you need it.',
  },
]

function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead
          eyebrow="How it works"
          title="From audit to"
          serif="automation."
        />

        {/* Numeral rail on the left, the phase and what it leaves behind on the
            right. The rows are the same hairline-separated rhythm as before,
            opened up so four of them still read as a journey rather than a
            list to get through. */}
        <div className="mt-12 sm:mt-16">
          {PHASES.map(p => (
            <div key={p.n}
                 className="reveal border-t border-divider py-7 sm:py-9
                            grid grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start">
              <span className="font-display text-[24px] sm:text-[30px] font-light text-primary/75
                               leading-none tracking-tight tabular-nums pt-0.5">
                {p.n}
              </span>
              <div>
                <h3 className="font-display text-[16px] sm:text-[18px] font-medium text-ink tracking-tight">
                  {p.title}
                </h3>
                <p className="lede mt-2 text-[13.5px] sm:text-[14px] max-w-[58ch]">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="rule"/>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Audience
// ─────────────────────────────────────────────────────────────────────────────

const AUDIENCE = [
  {
    n: '01',
    lead: 'You run a growing business.',
    rest: 'Your team is spending too much time on repetitive work, follow-ups, and admin.',
  },
  {
    n: '02',
    lead: 'You want your time back.',
    rest: 'You want systems that handle the work without adding another tool for your team to manage.',
  },
  {
    n: '03',
    lead: 'You want to move faster.',
    rest: 'You have ideas for improving your business and want someone to turn them into working systems.',
  },
]

function Audience() {
  return (
    <section id="who" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">
        <SectionHead eyebrow="Who this is for" title="Built for businesses" serif="ready to automate."/>

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

        {/* Heading top-left, portrait filling the right and spanning both rows,
            the labelled copy beneath the heading. Explicit row placement keeps
            the desktop composition while letting the single column stack as
            heading → portrait → copy, rather than stranding the portrait at
            the bottom of the section. */}
        <div className="grid gap-10 lg:gap-x-16 lg:gap-y-10 lg:grid-cols-12 lg:items-start">

          <SectionHead
            eyebrow="About me"
            title="AI Automation Builder"
            serif="& AI Auditor."
            className="lg:col-span-6 lg:col-start-1 lg:row-start-1"
          />

          {/* Square source cropped to a portrait frame — the crop is what makes
              it read as close rather than distant. Centre holds the subject. */}
          <div className="reveal lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-divider bg-surface">
              <img
                src="/profile.jpg"
                alt="Alfarid Bulbula — AI Automation Builder"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover object-center
                           transition-transform duration-[900ms] ease-out hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" aria-hidden="true"
                style={{ background:'linear-gradient(to top, rgba(16,12,10,0.55), transparent)' }}/>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
            {/* Label above its paragraph, hairline between each — the same
                mono label and muted body used everywhere else. */}
            {ABOUT_POINTS.map((pt, i) => (
              <div key={i} className="reveal border-t border-divider first:border-t-0 py-6 sm:py-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/70">{pt.k}</p>
                <p className="text-muted text-[13.5px] sm:text-[14px] leading-relaxed mt-2.5 max-w-[52ch]">
                  {pt.text}
                </p>
              </div>
            ))}

            <div className="reveal flex flex-wrap gap-2.5 sm:gap-3 pt-8 border-t border-divider">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost !py-3 !text-[12.5px]" aria-label={label}>
                  <Icon className="h-3.5 w-3.5"/> {label}
                </a>
              ))}
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost !py-3 !text-[12.5px]" aria-label="Email">
                <Mail className="h-3.5 w-3.5"/> Email
              </a>
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
    <section id="contact" className="scroll-mt-24 py-12 sm:py-14 lg:py-16">
      <div className="shell">

        {/* The divider belongs to the page column, not the viewport, so it
            lines up with every other rule on the site. */}
        <div className="rule mb-12 sm:mb-14"/>

        {/* Heading sits in the left column rather than above the grid, so the
            form panel starts level with the eyebrow and the two halves read
            as one composition. */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          <div ref={headingRef} className="reveal lg:col-span-5 flex flex-col gap-7">
            <div>
              <p className="eyebrow flex items-center gap-3 mb-6">
                <span className="inline-block h-px w-6 bg-primary/30" aria-hidden="true"/>
                <TextScramble as="span" trigger={headingInView} duration={0.5} speed={0.025}>GET IN TOUCH</TextScramble>
              </p>
              <h2 className="h-statement text-[32px] sm:text-[42px] lg:text-[50px]">
                Let&apos;s build{' '}
                <span>something real.</span>
              </h2>
            </div>

            <p className="lede text-[13.5px] max-w-[46ch]">
              If you have a repetitive process you want automated, or an idea for an AI system —
              send a message. I read everything and reply directly, even if the project isn&apos;t a fit.
            </p>

            {/* Full column width — it is the visual anchor of this half, not a
                thumbnail beside the copy. */}
            <div className="relative group mt-1">
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

            {/* Availability and response time on one line, sat directly under
                the illustration. */}
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CAF7A] ring-pulse-green shrink-0"/>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                Available for new projects <span className="text-faint mx-0.5">•</span> 24h response
              </span>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="panel p-6 sm:p-8 lg:p-10 rounded-2xl">
              {status === 'sent' ? <SentState/> : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
                  {/* One field per row, each running the full width of the
                      panel — a long, shallow field rather than two short ones
                      sharing the line. */}
                  <Field label="Name"  id="f-name"  type="text"  value={form.name}  onChange={set('name')}  placeholder="Your name"       required/>
                  <Field label="Email" id="f-email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required/>
                  <Field
                    label="What do you want to automate?"
                    id="f-message" type="textarea" rows={7}
                    value={form.message} onChange={set('message')}
                    placeholder="Describe the repetitive process, the tools you use, and what outcome you're after…"
                    required
                  />
                  <button type="submit" disabled={status === 'sending'}
                    className="btn btn-solid w-full !py-4 !text-[14px] mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
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
    <footer className="py-14">
      <div className="shell">
        {/* Inside the page column, matching every other rule on the site. */}
        <div className="rule mb-12 sm:mb-14"/>

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
        <Audience/>
        <About/>
        <ContactForm/>
      </main>
      <Footer/>
      <Analytics />
    </div>
  )
}
