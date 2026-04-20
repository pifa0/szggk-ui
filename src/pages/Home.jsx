import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, TrendingUp, Award, Globe } from 'lucide-react'
import { imagePath } from '../utils/paths'

function StrataCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const layers = Array.from({ length: 12 }, (_, i) => ({
      y: Math.random() * canvas.height, speed: 0.1 + Math.random() * 0.15,
      opacity: 0.08 + Math.random() * 0.12,
      color: i % 3 === 0 ? '#d4a017' : i % 3 === 1 ? '#0891b2' : '#1e40af',
      thickness: 1 + Math.random() * 2,
    }))
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 800,
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      opacity: 0.15 + Math.random() * 0.3,
    }))
    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      layers.forEach(l => {
        l.y += l.speed; if (l.y > h + 20) l.y = -20
        ctx.beginPath(); ctx.moveTo(0, l.y)
        for (let x = 0; x <= w; x += 8) ctx.lineTo(x, l.y + Math.sin(x * 0.015 + l.y * 0.01) * 6)
        ctx.strokeStyle = l.color; ctx.globalAlpha = l.opacity
        ctx.lineWidth = l.thickness; ctx.stroke()
      })
      ctx.globalAlpha = 1
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,160,23,${p.opacity})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

const stats = [
  { value: '40+', label: 'контрактов', sub: 'с российскими и международными компаниями' },
  { value: '100т+', label: 'погонных километров', sub: 'геофизических изысканий и интерпретации' },
  { value: '150м+', label: 'тонн руды', sub: 'подтверждённых запасов в рамках проектов' },
  { value: '25+', label: 'лет опыта', sub: 'у ведущих специалистов компании' },
]

const services = [
  { icon: '⚡', title: 'Геофизические работы', desc: 'Наземная магниторазведка, электроразведка методом вызванной поляризации, 3D-электротомография, сейсмическая томография, гамма-спектрометрия.' },
  { icon: '⛰️', title: 'Геологические работы', desc: 'Геологическое сопровождение буровых работ на ТПИ, геоморфологические съёмки с использованием БПЛА, геохимические поиски.' },
  { icon: '🛰️', title: 'Дистанционное зондирование', desc: 'Космоструктурный анализ, реконструкция поля напряжений, геолого-структурное картирование по материалам ДЗЗ.' },
  { icon: '🔬', title: 'Переинтерпретация данных', desc: 'Обработка архивных материалов с применением авторских 2D программ решения прямых и обратных задач геофизики.' },
]

const advantages = [
  { icon: <Award size={22} />, title: 'Высокое качество', desc: 'Отчёты соответствуют требованиям ГКЗ и международным стандартам JORC.' },
  { icon: <TrendingUp size={22} />, title: 'Передовые технологии', desc: 'Авторское программное обеспечение для 2D/3D моделирования, сертифицированное оборудование.' },
  { icon: <Globe size={22} />, title: 'Международное сотрудничество', desc: 'Проекты в Африке, Азии и Латинской Америке.' },
  { icon: <MapPin size={22} />, title: 'Комплексный подход', desc: 'Оптимизация по эффективности, стоимости и срокам — полный цикл от планирования до отчёта.' },
]

// Список партнёров
const partners = [
  { name: 'Краома', logo: imagePath('images/company/field2.jpg') },
  { name: 'РБК', logo: imagePath('images/company/field4.jpg') },
  { name: 'ОЗГЕО', logo: imagePath('images/company/field5.jpg') },
  { name: 'ВСЕГЕИ', logo: imagePath('images/company/img.png') },
  { name: 'ВБК', logo: imagePath('images/company/project-2-medusa.png') },
  { name: 'Норникель', logo: imagePath('images/company/Норникель.jpg') },
  { name: 'Полиметалл', logo: imagePath('images/company/Полиметалл.webp') },
  { name: 'Горный', logo: imagePath('images/company/Санкт-Петербургский_горный_университет.png') }
]

// Компонент карусели для партнёров
// Компонент карусели для партнёров
function PartnersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoPlayInterval = useRef(null)

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Автопрокрутка каждые 4 секунды (медленнее)
  useEffect(() => {
    if (isMobile) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length)
      }, 4000) // Увеличено с 3 до 4 секунд
    }
    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current)
    }
  }, [isMobile])

  // Обработка свайпов
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % partners.length)
      } else {
        setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length)
      }
    }
  }

  // Для десктопа - показываем всех партнёров сеткой
  if (!isMobile) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
        gap: '30px',
        alignItems: 'center',
      }}>
        {partners.map((partner, idx) => (
          <div key={idx} style={{
            padding: '16px 12px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 12,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,160,23,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <img src={partner.logo} alt={partner.name} style={{ width: '100%', maxHeight: 50, objectFit: 'contain', opacity: 0.6, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6} />
          </div>
        ))}
      </div>
    )
  }

  // Для мобильных - карусель со свайпами (логотип вверху, точки внизу)
  return (
    <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto' }}>
      {/* Карусель с логотипом */}
      <div
        style={{
          overflow: 'hidden',
          touchAction: 'pan-y pinch-zoom',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.6s ease', // Более медленный переход (было 0.4s)
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {partners.map((partner, idx) => (
            <div
              key={idx}
              style={{
                minWidth: '100%',
                padding: '24px 16px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 12,
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  width: 'auto',
                  maxWidth: '80%',
                  maxHeight: '80px',
                  objectFit: 'contain',
                  margin: '0 auto',
                  opacity: 0.8,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Точки навигации внизу */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        marginBottom: '8px'
      }}>
        {partners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: idx === currentIndex ? '#d4a017' : 'rgba(212,160,23,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg-primary)' }}>
        <StrataCanvas />
        <div style={{ position: 'absolute', right: '5%', top: '15%', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '8%', top: '20%', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(8,145,178,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '-80px', bottom: '10%', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.05)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 100, paddingBottom: 80 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.25)', borderRadius: 100, fontSize: 12, fontWeight: 600, color: '#0891b2', letterSpacing: 2, marginBottom: 24, textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2', display: 'inline-block' }} />
              Геологические и геофизические работы
            </div>
            <h1 style={{ fontFamily: 'Russo One', fontSize: 'clamp(32px, 5.5vw, 68px)', lineHeight: 1.1, marginBottom: 24, color: 'var(--text-primary)' }}>
              СЗГГК{' '}
              <span style={{ background: 'linear-gradient(135deg, #f0c040, #d4a017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Геокомплекс
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16, maxWidth: 640 }}>
              Северо-Западная Геолого-Геофизическая Компания — выполняем наземные поисковые геологические, геохимические и геофизические работы на твёрдые полезные ископаемые и углеводороды.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40, maxWidth: 580 }}>
              Работаем по всей территории России и на международных объектах. Все климатические зоны, любой рельеф.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn-primary">Наши проекты <ArrowRight size={16} /></Link>
              <Link to="/gallery" className="btn-outline">Фотогалерея</Link>
              <Link to="/contacts" className="btn-outline">Связаться с нами</Link>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, var(--bg-primary), transparent)', pointerEvents: 'none' }} />
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 32 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="stat-value">{s.value}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label">Что мы делаем</div>
            <h2 className="section-title">Спектр геологических услуг</h2>
            <div className="accent-line" style={{ margin: '14px auto 0' }} />
          </div>
          <div className="grid-2" style={{ gap: 20 }}>
            {services.map((s, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: 20 }}>
                <div style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn-outline">Все услуги <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(8,145,178,0.03) 59px, rgba(8,145,178,0.03) 60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 52 }}>
            <div className="section-label">Почему выбирают нас</div>
            <h2 className="section-title">Наши конкурентные преимущества</h2>
            <div className="accent-line" />
          </div>
          <div className="grid-2" style={{ gap: 24 }}>
            {advantages.map((a, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4a017', flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* Partners / Clients - с каруселью для мобильных */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 40px', background: 'var(--bg-card)', border: '1px solid rgba(212,160,23,0.15)', borderRadius: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="section-label" style={{ textAlign: 'center' }}>Нам доверяют</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Ключевые партнёры</h2>
            <div className="accent-line" style={{ margin: '0 auto 50px' }} />

            <PartnersCarousel />
          </div>
        </div>
      </section>
    </div>
  )
}