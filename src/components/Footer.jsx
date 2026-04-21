import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { imagePath } from '../utils/paths'
import { useState, useEffect } from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <footer style={{
      background: '#f0f2f8',
      borderTop: '1px solid rgba(0,0,0,0.07)',
      paddingTop: 60,
      paddingBottom: 32,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 40,
          marginBottom: 48
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: 9,
                overflow: 'hidden',
                border: 'none',
                outline: 'none'
              }}>
                <img src={imagePath('favicon.svg')} alt="СЗГГК" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Russo One', fontSize: 15, color: 'var(--text-primary)' }}>ГЕОКОМПЛЕКС</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 1.5 }}>СЗГГК</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 260 }}>
              Северо-Западная Геолого-Геофизическая Компания. Поисковые геологические, геохимические и геофизические работы по всей России и за рубежом.
            </p>
          </div>

          {/* Navigation - показываем только на десктопе */}
          {!isMobile && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#22d3ee', marginBottom: 16 }}>
                Навигация
              </div>
              {[
                ['/', 'Главная'],
                ['/about', 'О компании'],
                ['/services', 'Услуги'],
                ['/equipment', 'Оборудование'],
                ['/team', 'Команда'],
                ['/projects', 'Проекты и карта'],
                ['/contacts', 'Контакты'],
              ].map(([path, label]) => (
                <Link key={path} to={path} style={{
                  display: 'block', color: 'var(--text-muted)', textDecoration: 'none',
                  fontSize: 13, marginBottom: 8, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d4a017'}
                  onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                >{label}</Link>
              ))}
            </div>
          )}

          {/* Services - показываем только на десктопе */}
          {!isMobile && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#22d3ee', marginBottom: 16 }}>
                Услуги
              </div>
              {[
                'Геофизические работы',
                'Геологические работы',
                'Геохимические работы',
                'Дистанционное зондирование',
                'Инженерная геофизика',
                'Переинтерпретация данных',
              ].map(s => (
                <div key={s} style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{s}</div>
              ))}
            </div>
          )}

          {/* Contacts */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#22d3ee', marginBottom: 16 }}>
              Контакты
            </div>
            <a href="tel:+79219732236" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, marginBottom: 12 }}>
              <Phone size={14} color="#d4a017" /> +7 (921) 973-22-36
            </a>
            <a href="mailto:szggk@yandex.ru" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, marginBottom: 12 }}>
              <Mail size={14} color="#d4a017" /> geocomplex@szggk.ru
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
              <MapPin size={14} color="#d4a017" style={{ marginTop: 2, flexShrink: 0 }} /> Санкт-Петербург, Россия
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <p style={{ fontSize: 12, color: '#374151' }}>
            © {year} ООО «СЗГГК Геокомплекс». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}