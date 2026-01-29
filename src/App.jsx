import './App.css'
import heroBg from '../assets/BG/Hero-Section-BG.gif'
import logo from '../assets/Logo & Fav Icon/logo.png'
import mcImg from '../assets/BG/minecraft.jpg'
import vpsImg from '../assets/BG/vps.jpg'
import domainImg from '../assets/BG/domain.jpg'
import discordImg from '../assets/BG/discord.jpg'
import mapSvg from '../assets/SVGs/map.svg'
import featureBg from '../assets/BG/Feature-Section-BG.gif'
import consoleImg from '../assets/IMG/Console.png'
import backupsImg from '../assets/IMG/Backups.png'
import fileManagerImg from '../assets/IMG/File_manager.png'
import usersImg from '../assets/IMG/Users.png'

function Header({ route = '/', onNavigate }) {
  const go = (path) => {
    if (onNavigate) onNavigate(path)
  }
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
        </div>
        <nav className="nav">
          <a
            href="/"
            className={`nav-link ${route === '/' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); go('/') }}
          >Home</a>
          <a
            href="/about"
            className={`nav-link ${route === '/about' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); go('/about') }}
          >About</a>
          <a
            href="/services"
            className={`nav-link ${route === '/services' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); go('/services') }}
          >Services</a>
        </nav>
      </div>
    </header>
  )
}

function Advantages() {
  return (
    <section className="platform">
      <div className="platform-inner">
        <div className="platform-header">
          <span className="pill">Control Panel</span>
          <h2 className="platform-title">Experience Our Platform</h2>
          <p className="platform-subtitle">
            A fast, clean, and powerful control panel designed for Minecraft hosting — built to
            make server management effortless.
          </p>
        </div>
        <PlatformRotator />
      </div>
    </section>
  )
}
function PlatformRotator() {
  const items = [
    {
      title: 'Console Screen',
      desc: 'Manage your server, resources, and user access from one centralized dashboard.',
      img: consoleImg,
    },
    {
      title: 'Backups Screen',
      desc: 'Create and restore backups to protect your server data.',
      img: backupsImg,
    },
    {
      title: 'File Manager Screen',
      desc: 'Manage your server files securely. Upload, edit, or organize directories with ease.',
      img: fileManagerImg,
    },
    {
      title: 'Users / Sub-Users',
      desc: 'Manage users with access to this server and control their permissions.',
      img: usersImg,
    },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length)
    }, 5000)
    return () => clearInterval(id)
  }, [items.length])
  return (
    <div className="platform-layout">
      <div className="platform-left reveal">
        {items.map((it, i) => (
          <div
            key={it.title}
            className={`p-card ${idx === i ? 'active' : ''}`}
            onMouseEnter={() => setIdx(i)}
            onFocus={() => setIdx(i)}
            tabIndex={0}
          >
              <div className="p-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="3"></rect>
                  <path d="M3 9h18"></path>
                </svg>
              </div>
              <div className="p-body">
              <div className="p-title">{it.title}</div>
              <div className="p-desc">{it.desc}</div>
              </div>
            </div>
        ))}
      </div>
      <div className="platform-right reveal">
        <div className="platform-shot" style={{ backgroundImage: `url(${items[idx].img})` }} />
      </div>
    </div>
  )
}
import { useEffect, useState, useRef } from 'react'
function RotatingWords({ words = [], interval = 2000 }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words, interval])
  return <span key={index} className="rotating-word">{words[index]}</span>
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    els.forEach((el, i) => {
      el.style.setProperty('--d', `${(i % 12) * 60}ms`)
    })
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function CountUp({ end, duration = 1500, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    let started = false
    let raf = 0
    let startTs = 0
    const step = (ts) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      const current = end * p
      setVal(current)
      if (p < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!started && entry.isIntersecting) {
          started = true
          raf = requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => {
      obs.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [end, duration])
  const display = `${prefix}${decimals ? val.toFixed(decimals) : Math.round(val)}${suffix}`
  return <div ref={ref} className="stat-value">{display}</div>
}

function Home() {
  return (
    <main className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="hero-title-line">Host your own</span>
            <span className="hero-title-line hero-rotate">
              <RotatingWords
                words={[
                  'VPS',
                  'Minecraft server',
                  'Domain',
                  'Discord bot',
                ]}
                interval={2000}
              />
            </span>
          </h1>
          <div className="hero-subtitle">⚡ POWER BEYOND LIMITS</div>
          <p className="hero-desc">
            Redefining performance limits. The next generation of high‑frequency hosting
            for Minecraft, VPS, and Bots. Experience future‑grade latency.
          </p>
          <div className="hero-ctas">
            <a href="/services" className="btn btn-primary">View Plans</a>
          </div>
        </div>
        <div className="hero-right">
          <a href="#" className="service-card accent-blue reveal" style={{ backgroundImage: `url(${mcImg})` }}>
            <span className="service-card-overlay" />
            <span className="service-card-content">
              <span className="service-card-text">
                <span className="service-card-title">Premium MC</span>
                <span className="service-card-subtitle">Ryzen 9 Performance</span>
              </span>
              <span className="service-card-arrow">→</span>
            </span>
          </a>
          <a href="#" className="service-card accent-green reveal" style={{ backgroundImage: `url(${mcImg})` }}>
            <span className="service-card-overlay" />
            <span className="service-card-content">
              <span className="service-card-text">
                <span className="service-card-title">Budget MC</span>
                <span className="service-card-subtitle">Affordable & Reliable</span>
              </span>
              <span className="service-card-arrow">→</span>
            </span>
          </a>
          <a href="#" className="service-card accent-cyan reveal" style={{ backgroundImage: `url(${vpsImg})` }}>
            <span className="service-card-overlay" />
            <span className="service-card-content">
              <span className="service-card-text">
                <span className="service-card-title">Cloud VPS</span>
                <span className="service-card-subtitle">Full Root Access</span>
              </span>
              <span className="service-card-arrow">→</span>
            </span>
          </a>
          <a href="#" className="service-card accent-gold reveal" style={{ backgroundImage: `url(${domainImg})` }}>
            <span className="service-card-overlay" />
            <span className="service-card-content">
              <span className="service-card-text">
                <span className="service-card-title">Web Hosting</span>
                <span className="service-card-subtitle">LiteSpeed NVMe</span>
              </span>
              <span className="service-card-arrow">→</span>
            </span>
          </a>
          <a href="#" className="service-card accent-purple reveal" style={{ backgroundImage: `url(${discordImg})` }}>
            <span className="service-card-overlay" />
            <span className="service-card-content">
              <span className="service-card-text">
                <span className="service-card-title">Discord Bot</span>
                <span className="service-card-subtitle">24/7 Uptime</span>
              </span>
              <span className="service-card-arrow">→</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="stats-inner">
        <div className="stat reveal">
          <CountUp end={200} suffix="+" />
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat reveal">
          <CountUp end={99.9} decimals={1} suffix="%" />
          <div className="stat-label">Network Uptime</div>
        </div>
        <div className="stat reveal">
          <CountUp end={10} suffix="Tbps" />
          <div className="stat-label">DDoS Protection</div>
        </div>
        <div className="stat reveal">
          <CountUp end={24} suffix="/7" />
          <div className="stat-label">Expert Support</div>
        </div>
      </div>
    </section>
  )
}

function Deploy() {
  return (
    <section className="deploy">
      <div className="deploy-inner">
        <div className="deploy-header">
          <span className="pill">Our Infrastructure</span>
          <h2 className="deploy-title">Deploy in seconds</h2>
        </div>
        <div className="deploy-grid">
          <div className="product-card reveal">
            <div className="product-thumb" style={{ backgroundImage: `url(${discordImg})` }} />
            <div className="product-body">
              <div className="product-title">Bot Hosting</div>
              <div className="product-sub">Starting from</div>
              <div className="product-price">₹100 <span className="per">/month</span></div>
              <ul className="product-list">
                <li>High performance nodes</li>
                <li>Low latency networking</li>
                <li>Managed services</li>
              </ul>
              <a href="/services" className="product-btn product-btn-secondary">View Plans</a>
            </div>
          </div>

          <div className="product-card reveal">
            <div className="product-thumb" style={{ backgroundImage: `url(${mcImg})` }} />
            <div className="product-body">
              <div className="product-title">Minecraft Hosting</div>
              <div className="product-sub">Starting from</div>
              <div className="product-price">₹40 <span className="per">/month</span></div>
              <ul className="product-list">
                <li>Instant deployment</li>
                <li>DDoS protection</li>
                <li>Full control panel</li>
              </ul>
              <a href="/services" className="product-btn product-btn-primary">View Plans</a>
            </div>
          </div>

          <div className="product-card reveal">
            <div className="product-thumb" style={{ backgroundImage: `url(${vpsImg})` }} />
            <div className="product-body">
              <div className="product-title">VPS Hosting</div>
              <div className="product-sub">Starting from</div>
              <div className="product-price">₹350 <span className="per">/month</span></div>
              <ul className="product-list">
                <li>Full root access</li>
                <li>N storage</li>
                <li>Automated backups</li>
              </ul>
              <a href="/services" className="product-btn product-btn-secondary">View Plans</a>
            </div>
          </div>

          <div className="product-card reveal">
            <div className="product-thumb" style={{ backgroundImage: `url(${domainImg})` }} />
            <div className="product-body">
              <div className="product-title">Domain Hosting</div>
              <div className="product-sub">Starting from</div>
              <div className="product-price">₹99 <span className="per">/month</span></div>
              <ul className="product-list">
                <li>Managed DNS & records</li>
                <li>WHOIS privacy included</li>
                <li>One-click SSL via ACME</li>
              </ul>
              <a href="/services" className="product-btn product-btn-primary">View Plans</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  const founders = [
    {
      name: 'Samarth!',
      role: 'System Operator',
      avatarUrl: 'https://cdn.discordapp.com/avatars/1443614856597999656/a97a698132ae6764c860aee53573c669.webp',
    },
    {
      name: 'RoyalPlayz',
      role: 'System Operator',
      avatarUrl: 'https://cdn.discordapp.com/avatars/1325822924527108116/a3014225c2f57eb88359478020e834ac.webp?size=96',
    },
    {
      name: 'Smarty',
      role: 'System Operator',
      avatarUrl: 'https://cdn.discordapp.com/avatars/1322837516931301457/8e0f896075b1aff64ba931c7d3a39ffb.webp?size=22',
    },
  ]
  return (
    <section className="about">
      <div className="about-inner">
        <div className="about-header">
          <span className="pill">About</span>
          <h2 className="about-title">Meet Our <span className="accent">Founders</span></h2>
        </div>
        <div className="founders-grid">
          {founders.map((f) => (
            <div key={f.name} className="founder-card reveal">
              <div className="founder-avatar" style={{ backgroundImage: `url(${f.avatarUrl})` }} />
              <div className="founder-info">
                <div className="founder-name">{f.name}</div>
                <div className="founder-role">{f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
      setRoute(path)
    }
  }
  useRevealOnScroll()
  if (route === '/about') {
    return (
      <div className="app">
        <Header route={route} onNavigate={navigate} />
        <AboutPage />
        <Footer />
      </div>
    )
  }
  if (route === '/services') {
    return (
      <div className="app">
        <Header route={route} onNavigate={navigate} />
        <ServicesPage />
        <Footer />
      </div>
    )
  }
  return (
    <div className="app">
      <Header route={route} onNavigate={navigate} />
      <Home />
      <Stats />
      <Deploy />
      <Features />
      <Locations />
      <AdvancedFeatures />
      <Hardware />
      <Advantages />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

function Features() {
  return (
    <section className="features">
      <div className="features-inner">
        <div className="feature-row reveal">
          <div className="feature-info">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 className="feature-title">Global Anycast Network</h3>
            <p className="feature-desc">
              We utilize advanced Anycast technology to route your traffic through the nearest data center automatically.
              Experience ultra‑low latency across the globe.
            </p>
            <ul className="feature-list">
              <li>24+ Global Locations</li>
              <li>Sub‑50ms Latency</li>
            </ul>
          </div>
          <div className="feature-media">
            <div className="feature-image" style={{ backgroundImage: `url(${domainImg})` }} />
          </div>
        </div>

        <div className="feature-row reverse reveal">
          <div className="feature-media">
            <div className="feature-image" style={{ backgroundImage: `url(${vpsImg})` }} />
          </div>
          <div className="feature-info">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="feature-title">Military‑Grade DDoS Shield</h3>
            <p className="feature-desc">
              Our custom mitigation pipelines absorb attacks up to 10Tbps without dropping legitimate traffic.
              Your server stays online, no matter what.
            </p>
            <ul className="feature-list">
              <li>Advanced Hardware Filter</li>
              <li>Real‑time Mitigation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="AtrixNodes" className="footer-logo" />
            <div className="footer-tagline">Premium hosting for Minecraft servers, Discord bots, and VPS — built for performance, stability, and serious creators.</div>
          </div>
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-title">Products</div>
              <a href="/services" className="footer-link">Minecraft Hosting</a>
              <a href="/services" className="footer-link">VPS Hosting</a>
              <a href="/services" className="footer-link">Bot Hosting</a>
              <a
                href="https://paid.atrixnodes.site/"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Game Panel
              </a>
            </div>
            <div className="footer-col">
              <div className="footer-title">More</div>
              <a href="https://discord.gg/R377FyeAvm" className="footer-link">Policies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} AtrixNodes. All rights reserved.</div>
          <div className="footer-social"></div>
        </div>
      </div>
    </footer>
  )
}
function ServicesPage() {
  const [category, setCategory] = useState('mc')
  const [currency, setCurrency] = useState('inr')
  const currencySymbol = currency === 'inr' ? '₹' : '₨'
  const [showModal, setShowModal] = useState(false)
  const categories = [
    { key: 'mc', label: 'Minecraft Hosting' },
    { key: 'vps', label: 'VPS Hosting' },
    { key: 'web', label: 'Domain Hosting' },
    { key: 'bot', label: 'Bot Hosting' }
  ]
  const catalog = {
    mc: [
      { name: 'Meteor', badge: '', ram: '4GB DDR4 ', cpu: '1 vCore ', storage: '10GB ', backups: 1, db: 1, ports: 1, price: 160, unit: '/mo', loc: 'Singapore & Germany', accent: 'green' },
      { name: 'Nova', badge: '', ram: '6GB DDR4 ', cpu: '1.5 vCores ', storage: '15GB ', backups: 1, db: 1, ports: 1, price: 240, unit: '/mo', loc: 'Singapore & Germany', accent: 'blue' },
      { name: 'Eclipse', badge: '', ram: '8GB DDR4 ', cpu: '2 vCores ', storage: '20GB ', backups: 1, db: 1, ports: 1, price: 320, unit: '/mo', loc: 'Singapore & Germany', accent: 'teal' },
      { name: 'Comet', badge: '', ram: '12GB DDR4 ', cpu: '2.5 vCores ', storage: '30GB ', backups: 1, db: 1, ports: 1, price: 480, unit: '/mo', loc: 'Singapore & Germany', accent: 'purple' },
      { name: 'Nebula', badge: '', ram: '16GB DDR4 ', cpu: '3 vCores ', storage: '40GB  ', backups: 1, db: 1, ports: 1, price: 640, unit: '/mo', loc: 'Singapore & Germany', accent: 'cyan' },
      { name: 'Plasma', badge: '', ram: '24GB DDR4 ', cpu: '3.5 vCores ', storage: '40GB  ', backups: 1, db: 1, ports: 1, price: 960, unit: '/mo', loc: 'Singapore & Germany', accent: 'indigo' },
      { name: 'SuperNova', badge: '', ram: '32GB DDR4 ', cpu: '4 vCores ', storage: '60GB  ', backups: 1, db: 1, ports: 1, price: 1280, unit: '/mo', loc: 'Singapore & Germany', accent: 'gold' }
    ],
    vps: [
      { name: 'Micro', badge: '', ram: '2GB', cpu: '1 vCPU', storage: '20GB NVMe', backups: 1, db: 0, ports: 1, price: 299, unit: '/mo', loc: 'Any Region', accent: 'green' },
      { name: 'Standard', badge: '', ram: '4GB', cpu: '2 vCPU', storage: '40GB NVMe', backups: 2, db: 0, ports: 1, price: 599, unit: '/mo', loc: 'Any Region', accent: 'blue' },
      { name: 'Power', badge: 'Popular', ram: '8GB', cpu: '4 vCPU', storage: '120GB NVMe', backups: 4, db: 0, ports: 2, price: 1299, unit: '/mo', loc: 'Any Region', accent: 'purple' }
    ],
    web: [
      { name: '.fun', extension: '.fun', price: 145, unit: '/yr', accent: 'green' },
      { name: '.com', extension: '.com', price: 620, unit: '/yr', accent: 'blue' },
      { name: '.tech', extension: '.tech', price: 940, unit: '/yr', accent: 'cyan' },
      { name: '.in', extension: '.in', price: 499, unit: '/yr', accent: 'purple' },
      { name: '.xyz', extension: '.xyz', price: 295, unit: '/yr', accent: 'teal' },
      { name: '.net', extension: '.net', price: 1560, unit: '/yr', accent: 'indigo' },
      { name: '.online', extension: '.online', price: 435, unit: '/yr', accent: 'gold' }
    ],
    bot: [
      { name: 'Beginner', badge: '', ram: '256MB DDR4 @ 3200MHz', cpu: '0.25 vCore @ 2.60GHz', storage: '1GB NVMe SSD (1200MB/s)', backups: 0, db: 0, ports: 1, price: 30, unit: '/mo', loc: 'Europe', accent: 'green' },
      { name: 'Starter', badge: '', ram: '512MB DDR4 @ 3200MHz', cpu: '0.5 vCore @ 2.60GHz', storage: '2GB NVMe SSD (1200MB/s)', backups: 0, db: 0, ports: 1, price: 60, unit: '/mo', loc: 'Europe', accent: 'blue' },
      { name: 'Advance', badge: '', ram: '1GB DDR4 @ 3200MHz', cpu: '0.75 vCore @ 2.60GHz', storage: '4GB NVMe SSD (1200MB/s)', backups: 0, db: 0, ports: 1, price: 99, unit: '/mo', loc: 'Europe', accent: 'purple' }
    ]
  }
  const plans = catalog[category]
  const formatPrice = (n) => (Number(n).toFixed(2))
  const features =
    category === 'bot'
      ? [
          'Included with All Plans!',
          'Available in Europe!',
          'Advanced Firewall & Security!',
          'Deployment within 10 minutes of purchase',
          'Strict no-abuse policy',
          'Stable performance for lightweight & normal discord bot hosting',
        ]
      : [
          'Always Active Advanced Game Shield & DDoS Protection',
          'Deployment within 10 minutes of purchase',
          'Strict no-abuse policy',
          'Low latency & Supreme Performance',
          'Mod support as applicable',
        ]
  return (
    <section className="services">
      <div className="services-inner">
        <div className="services-header">
          <span className="pill">Our Premium Services</span>
          <h2 className="services-title">Available <span className="accent">Services</span></h2>
          <p className="services-subtitle">Select from our range of hosting solutions. Transparent pricing, top‑tier performance, and reliability.</p>
          <div className="services-gradient-bar" />
        </div>
        <div className="services-layout">
          <aside className="services-filters">
            <div className="currency-switch">
              <button className={`currency ${currency === 'inr' ? 'active' : ''}`} onClick={() => setCurrency('inr')}>
                <span className="cur-dot green" /> INR (₹)
              </button>
              <button className={`currency ${currency === 'npr' ? 'active' : ''}`} onClick={() => setCurrency('npr')}>
                <span className="cur-dot gray" /> NPR (₨)
              </button>
            </div>
            <div className="filter-block">
              <div className="filter-title">Service Categories</div>
              <div className="filter-list">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    className={`filter-item ${category === c.key ? 'active' : ''}`}
                    onClick={() => {
                      if (c.key === 'vps') {
                        setShowModal(true)
                      } else {
                        setCategory(c.key)
                      }
                    }}
                  >
                    <span className="fi-icon">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="3"></rect></svg>
                    </span>
                    <span className="fi-label">{c.label}</span>
                    <span className="fi-chevron">▾</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <div className="services-grid">
            {plans.map((p) => (
              <div key={p.name} className={`svc-card accent-${p.accent} reveal visible`}>
                <div className="svc-top">
                  <div className="svc-top-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="4" y="4" width="16" height="4" rx="1"></rect>
                      <rect x="4" y="10" width="16" height="4" rx="1"></rect>
                      <rect x="4" y="16" width="16" height="4" rx="1"></rect>
                    </svg>
                  </div>
                  <div className="svc-top-text">
                    <div className="svc-name">{p.name}</div>
                  </div>
                  {p.badge ? <span className="svc-badge">{p.badge}</span> : null}
                </div>
                <div className="svc-specs">
                  {category === 'web' ? (
                    <div className="spec">
                      <span className="spec-ico">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <rect x="5" y="7" width="14" height="10" rx="2"></rect>
                          <rect x="7" y="9" width="10" height="2" rx="1"></rect>
                        </svg>
                      </span>
                      <div className="spec-lines">
                        <div className="spec-val">Extension: {p.extension}</div>
                        <div className="spec-note">Annual Registration</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="spec">
                        <span className="spec-ico">
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="5" y="7" width="14" height="8" rx="2"></rect>
                            <rect x="7" y="16" width="10" height="2" rx="1"></rect>
                          </svg>
                        </span>
                        <div className="spec-lines">
                          <div className="spec-val">{p.ram}</div>
                          <div className="spec-note">Memory</div>
                        </div>
                      </div>
                      <div className="spec">
                        <span className="spec-ico">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="6" y="6" width="12" height="12" rx="3"></rect>
                            <path d="M12 8v4l3 3"></path>
                          </svg>
                        </span>
                        <div className="spec-lines">
                          <div className="spec-val">{p.cpu}</div>
                          <div className="spec-note">vCPU</div>
                        </div>
                      </div>
                      <div className="spec">
                        <span className="spec-ico">
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="5" y="7" width="14" height="10" rx="2"></rect>
                            <rect x="7" y="9" width="10" height="2" rx="1"></rect>
                          </svg>
                        </span>
                        <div className="spec-lines">
                          <div className="spec-val">{p.storage}</div>
                          <div className="spec-note">Storage</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <ul className="svc-features two-col">
                  {features.map((t) => (<li key={t}>{t}</li>))}
                </ul>
                <div className="svc-rule" />
                <div className="svc-footer">
                  <div className="svc-starting">Starting From</div>
                  <div className="svc-price">{currencySymbol}{formatPrice(p.price)} <span className="svc-unit">{p.unit}</span></div>
                  <a href="https://billing.atrixnodes.site/" className="btn btn-discord">CLICK HERE TO ORDER</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Comming Soon</div>
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
function AdvancedFeatures() {
  return (
    <section className="advanced" style={{ backgroundImage: `url(${featureBg})` }}>
      <div className="advanced-inner">
        <div className="advanced-header">
          <span className="pill">Built for Performance</span>
          <h2 className="advanced-title">Advanced <span className="accent">Features</span></h2>
          <p className="advanced-subtitle">
            Everything you need for professional Minecraft, Discord bot, and VPS hosting,
            optimized for speed, stability, and control.
          </p>
        </div>
        <div className="advanced-grid">
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">High Performance</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 3L6 14h5l-2 7 7-11h-5z"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Modern Intel and AMD CPUs for maximum performance.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">Low Latency</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 7v5l3 3"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Premium peering and optimized routing minimize lag.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">Advanced Security</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Multi‑layer DDoS protection with real‑time filtering.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">Auto Recovery</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 4v6h-6"></path>
                  <path d="M4 20v-6h6"></path>
                  <path d="M20 10a8 8 0 1 0-6-2"></path>
                  <path d="M4 14a8 8 0 1 0 6 2"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Crash recovery and scheduled backups for uptime.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">Full Control</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h6M3 12h10M3 17h14"></path>
                  <circle cx="9" cy="7" r="2"></circle>
                  <circle cx="13" cy="12" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </div>
            </div>
            <div className="af-desc">Panel, console, version manager, and advanced controls.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">Resource Scaling</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8"></path>
                  <path d="M14 7h8v8"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Upgrade or downgrade RAM and CPU instantly.</div>
          </div>
          <div className="af-card reveal">
            <div className="af-top">
              <div className="af-title">24/7 Support</div>
              <div className="af-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v10H8l-4 4V5z"></path>
                </svg>
              </div>
            </div>
            <div className="af-desc">Real humans on call to help you anytime.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <div className="cta-header">
          <span className="pill">Get Started</span>
          <h2 className="cta-title">Ready to build on AtrixNodes?</h2>
          <p className="cta-subtitle">
            Deploy in seconds on enterprise‑grade hardware with 24/7 expert support.
          </p>
        </div>
        <div className="cta-actions">
          <a href="/services" className="btn btn-primary">View Plans</a>
          <a
            href="https://discord.com/invite/EazpXzjvaa"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        </div>
      </div>
    </section>
  )
}
function FAQ() {
  const [open, setOpen] = useState(null)
  const items = [
    {
      q: 'How do I get started with AtrixNodes hosting?',
      a: 'Create an account, choose a plan, and deploy from the panel. Setup finishes in under a minute.'
    },
    {
      q: 'What kind of support does AtrixNodes provide?',
      a: 'Our experts are available 24/7 to help with deployment, configuration, and troubleshooting.'
    },
    {
      q: 'Can I customize my server settings and install mods or plugins?',
      a: 'Yes. You have full control with one‑click installers and configuration options for plugins and modpacks.'
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept major cards and popular payment gateways. Contact support for regional options.'
    },
    {
      q: 'Do your servers include DDoS protection?',
      a: 'Yes. All plans include advanced mitigation and real‑time filtering against volumetric attacks.'
    },
    {
      q: 'Can I upgrade or downgrade resources later?',
      a: 'You can change resources anytime. Upgrades apply instantly and downgrades at the next cycle.'
    }
  ]
  return (
    <section className="faq">
      <div className="faq-inner">
        <div className="faq-layout">
          <div className="faq-art" aria-hidden="true"></div>
          <div className="faq-content">
            <div className="faq-header">
              <span className="pill">Support Center</span>
              <h2 className="faq-title">Frequently Asked <span className="accent">Questions</span></h2>
              <p className="faq-subtitle">Answers to common questions about AtrixNodes hosting, billing, setup, and server management.</p>
            </div>
            <div className="faq-list">
              {items.map((it, idx) => (
            <div key={it.q} className={`faq-item reveal visible ${open === idx ? 'open' : ''}`}>
                  <button className="faq-question" onClick={() => setOpen(open === idx ? null : idx)}>
                    <span className="faq-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="faq-q-text">{it.q}</span>
                <span className="faq-toggle">{open === idx ? '▾' : '▸'}</span>
                  </button>
              <div className="faq-answer">{it.a}</div>
                </div>
              ))}
            </div>
            <div className="faq-cta-wrap">
              <a
                href="https://discord.com/invite/EazpXzjvaa"
                className="faq-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Have more questions? Get answer here
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
function Hardware() {
  return (
    <section className="hardware">
      <div className="hardware-inner">
        <div className="hood-header">
          <span className="pill">HARDWARE</span>
          <h2 className="hood-title">UNDER THE HOOD</h2>
          <p className="hood-subtitle">
            We don't compromise. Our infrastructure runs on enterprise‑grade components.
          </p>
        </div>
        <div className="hood-grid">
          <div className="hood-card reveal">
            <div className="hood-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                <path d="M9 9h6M9 15h6M3 10h2M3 14h2M19 10h2M19 14h2M10 3v2M14 3v2M10 19v2M14 19v2"></path>
              </svg>
            </div>
            <div className="hood-card-title">Processors</div>
            <div className="hood-card-desc">AMD Epic, Intel Xeon, And Intel Platinum</div>
          </div>
          <div className="hood-card reveal">
            <div className="hood-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="6" width="16" height="10" rx="2"></rect>
                <circle cx="8" cy="11" r="1"></circle>
                <circle cx="12" cy="11" r="1"></circle>
                <circle cx="16" cy="11" r="1"></circle>
              </svg>
            </div>
            <div className="hood-card-title">Storage</div>
            <div className="hood-card-desc">N Enterprise</div>
          </div>
          <div className="hood-card reveal">
            <div className="hood-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="2"></circle>
                <circle cx="18" cy="6" r="2"></circle>
                <circle cx="12" cy="18" r="2"></circle>
                <path d="M6 8v6M18 8v6M8 6h8M12 12v4"></path>
              </svg>
            </div>
            <div className="hood-card-title">Uplink</div>
            <div className="hood-card-desc">10Gbps Uplinks</div>
          </div>
          <div className="hood-card reveal">
            <div className="hood-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v-2a5 5 0 0 1 10 0v2"></path>
                <rect x="5" y="10" width="14" height="10" rx="2"></rect>
              </svg>
            </div>
            <div className="hood-card-title">Security</div>
            <div className="hood-card-desc">Hardware Firewall</div>
          </div>
        </div>
      </div>
    </section>
  )
}
function Locations() {
  return (
    <section className="locations">
      <div className="locations-inner">
        <div className="locations-header">
          <span className="pill">Global Infrastructure</span>
          <h2 className="locations-title">Server <span className="accent">Locations</span></h2>
          <p className="locations-subtitle">
            High‑performance nodes deployed in strategic regions to ensure ultra‑low latency,
            stability, and maximum uptime.
          </p>
        </div>
        <div className="location-cards">
          <div className="location-card reveal">
            <div className="location-card-header">
              <span className="flag">🇮🇳</span>
              <div className="location-name">India <span className="muted">(Mumbai)</span></div>
              <span className="status available">Available</span>
            </div>
            <div className="location-card-body">
              <div className="location-spec">AMD EPYC 9654</div>
              <div className="location-desc">Low latency across India</div>
            </div>
          </div>
          <div className="location-card reveal">
            <div className="location-card-header">
              <span className="flag">🇸🇬</span>
              <div className="location-name">Singapore <span className="muted">(Singapore)</span></div>
              <span className="status limited">Limited</span>
            </div>
            <div className="location-card-body">
              <div className="location-spec">AMD Ryzen 9 7900</div>
              <div className="location-desc">Low latency across SEA</div>
            </div>
          </div>
        </div>
        <div className="locations-map reveal" style={{ backgroundImage: `url(${mapSvg})` }}>
          <span className="map-dot" style={{ left: '52%', top: '58%' }} />
          <span className="map-dot" style={{ left: '68%', top: '66%' }} />
        </div>
      </div>
    </section>
  )
}
