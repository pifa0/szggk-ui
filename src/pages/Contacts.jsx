import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission would go here
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 30px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label">Связь с нами</div>
          <h1 className="section-title" style={{ maxWidth: 600 }}>Контактная информация</h1>
          <div className="accent-line" />
          <p className="section-subtitle">
            Свяжитесь с нами для получения консультации, оценки стоимости работ или сотрудничества.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, paddingTop: '-100px', marginTop: '-74px', }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 50 }}>
                {[
                  {
                    icon: <Phone size={20} />,
                    label: 'Телефон',
                    value: '+7 (921) 973-22-36',
                    href: 'tel:+79219732236',
                    color: '#d4a017',
                  },
                  {
                    icon: <Mail size={20} />,
                    label: 'Электронная почта',
                    value: 'geocomplex@szggk.ru',
                    href: 'mailto:szggk@yandex.ru',
                    color: '#0891b2',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Местоположение',
                    value: '194100, г. Санкт-Петербург, ул. Харченко, д.13, лит. А, пом. 1-Н',
                    href: null,
                    color: '#7c3aed',
                  },
                  {
                    icon: <Clock size={20} />,
                    label: 'Режим работы',
                    value: 'Пн–Пт: 9:00 – 18:00 МСК',
                    href: null,
                    color: '#059669',
                  },
                ].map((c, i) => (
                  <div key={i} style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${c.color}30`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.09)'}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                      background: `${c.color}12`,
                      border: `1px solid ${c.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: c.color,
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.color = c.color}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        >{c.value}</a>
                      ) : (
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company details */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 24,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#0891b2', marginBottom: 16 }}>
                  Юридическая информация
                </div>
                {[
                  ['Полное наименование', 'ООО «Северо-Западная Геолого-Геофизическая Компания "Геокомплекс"»'],
                  ['Сокращённое наименование', 'ООО «СЗГГК "Геокомплекс"»'],
                  ['Страна', 'Российская Федерация'],
                  ['Город', 'Санкт-Петербург'],
                ].map(([key, val]) => (
                  <div key={key} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{key}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Частые вопросы</div>
            <h2 className="section-title">FAQ</h2>
            <div className="accent-line" style={{ margin: '14px auto 0' }} />
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: 'В каких регионах вы работаете?', a: 'Мы работаем по всей территории России (включая Арктику, Дальний Восток, Сибирь) и на международных объектах — в Африке, Азии, Латинской Америке.' },
              { q: 'Как быстро можно получить коммерческое предложение?', a: 'После получения технического задания и описания объекта мы подготовим предварительное коммерческое предложение в течение 3–5 рабочих дней.' },
              { q: 'Какие требования к итоговой отчётности?', a: 'Отчёты оформляются в соответствии с требованиями ГКЗ РФ. При международных проектах — согласно стандартам JORC, NI 43-101 или по требованиям заказчика.' },
              { q: 'Работаете ли вы в труднодоступных районах?', a: 'Да. Мы имеем значительный опыт работы в условиях многолетней мерзлоты, в высокогорье, в тропиках, в условиях бездорожья.' },
            ].map((faq, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '20px 24px',
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {faq.q}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
