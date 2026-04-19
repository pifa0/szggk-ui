import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { applyTranslateLanguage, onTranslateReady } from '../googleTranslate'

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О компании' },
  { path: '/services', label: 'Услуги' },
  { path: '/equipment', label: 'Оборудование' },
  { path: '/projects', label: 'Проекты' },
  { path: '/team', label: 'Команда' },
  { path: '/gallery', label: 'Фотогалерея' },
  { path: '/contacts', label: 'Контакты' },
]

const LANGUAGE_OPTIONS = [
  { code: 'ru', label: 'Russian' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'de', label: 'German' },
  { code: 'es', label: 'Spanish' },
  { code: 'zh-CN', label: 'Chinese Simplified' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('site-language') || 'ru')

  const tryApplyLanguage = useCallback((code) => applyTranslateLanguage(code), [])

  const handleLanguageChange = useCallback(
    (code) => {
      setLang(code)
      localStorage.setItem('site-language', code)
      // Try immediate widget control; if widget isn't ready, cookie will still be set.
      if (tryApplyLanguage(code)) return

      // Fallback that always works: reload after setting cookie (done in applyTranslateLanguage).
      window.setTimeout(() => {
        window.location.reload()
      }, 150)
    },
    [tryApplyLanguage]
  )

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Apply saved language as soon as the Google widget injects its combo (or on refresh).
  useEffect(() => {
    const stored = localStorage.getItem('site-language') || 'ru'
    setLang(stored)
    const cancel = onTranslateReady(() => {
      applyTranslateLanguage(stored)
    })
    return cancel
  }, [])

  const selectStyle = {
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.8)',
    padding: '8px 10px',
    fontSize: 12,
    color: '#334155',
    cursor: 'pointer',
    width: 170,
    flexShrink: 0,
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 2147483647,
      transition: 'all 0.3s ease',
      background: scrolled
        ? 'rgba(245,246,250,0.97)'
        : 'rgba(245,246,250,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled
        ? '1px solid rgba(0,0,0,0.09)'
        : '1px solid rgba(0,0,0,0.05)',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44,
            borderRadius: 10,
            overflow: 'hidden',
            flexShrink: 0, border: 'none'
          }}>
            <img src="public/favicon.svg" alt="СЗГГК Геокомплекс" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Russo One', fontSize: 16, color: '#0f172a', letterSpacing: 0.5 }}>ГЕОКОМПЛЕКС</div>
            <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: 1.5, textTransform: 'uppercase' }}>СЗГГК</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'}
              style={({ isActive }) => ({
                padding: link.label === 'О компании' ? '8px 10px' : '8px 14px',
                fontSize: link.label === 'О компании' ? 12.5 : 13,
                fontWeight: 500,
                color: isActive ? '#d4a017' : '#475569',
                textDecoration: 'none',
                borderRadius: 6,
                transition: 'all 0.2s ease',
                background: isActive ? 'rgba(212,160,23,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
              })}
              onMouseEnter={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#0f172a' }}
              onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#475569' }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Phone + language (language after phone) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="nav-actions">
          <a href="tel:+79219732236" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px',
            background: 'linear-gradient(135deg, #f5d060, #e0b430)',
            borderRadius: 8,
            color: '#000',
            fontWeight: 700,
            fontSize: 13,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }} className="nav-phone">
            <Phone size={14} />
            +7 (921) 973-22-36
          </a>
          <select
            value={lang}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-label="Language"
            className="nav-language"
            style={selectStyle}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer', padding: 8 }}
          className="burger-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(245,246,250,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '12px 0',
                fontSize: 15,
                fontWeight: 500,
                color: isActive ? '#d4a017' : '#475569',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <a href="tel:+79219732236"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #f5d060, #e0b430)',
              color: '#2c2c2c',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              width: 'fit-content',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e8c040, #d4a017)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f5d060, #e0b430)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Phone size={16} color="#2c2c2c" /> +7 (921) 973-22-36
          </a>
          <div style={{ marginTop: 14 }}>
            <select
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Language"
              style={{
                width: '100%',
                ...selectStyle,
                maxWidth: '100%',
              }}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) { .burger-btn { display: none !important; } }
        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .nav-actions { display: none !important; }
        }
        @media (min-width: 900px) and (max-width: 1180px) {
          .nav-phone {
            display: none !important;
          }
          .nav-language {
            width: 150px !important;
          }
        }
      `}</style>
    </nav>
  )
}
