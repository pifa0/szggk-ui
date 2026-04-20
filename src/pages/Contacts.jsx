import { Phone, Mail, MapPin, Clock, Send, FileText, Download, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { imagePath } from '../utils/paths'

// Данные нормативной документации
const normativeDocs = [
  {
    id: 1,
    year: '2025',
    title: 'Сводная ведомость результатов проведения СОУТ',
    description: 'Результаты специальной оценки условий труда за 2025 год',
    pdfUrl: imagePath('/docs/svodnaya-vedomost-sout-2025.pdf'),
    fileSize: '60.1 КБ'
  },
  {
    id: 2,
    year: '2019',
    title: 'Перечень рекомендуемых мероприятий по улучшению условий труда',
    description: 'Рекомендации по улучшению условий труда сотрудников',
    pdfUrl: imagePath('/docs/meropriyatiya-usloviya-truda-2019.pdf'),
    fileSize: '1.8 MB'
  },
  {
    id: 3,
    year: '2017',
    title: 'Сводная ведомость результатов проведения СОУТ',
    description: 'Результаты специальной оценки условий труда за 2017 год',
    pdfUrl: imagePath('/docs/svodnaya-vedomost-sout-2017.pdf'),
    fileSize: '2.1 MB'
  },
  {
    id: 4,
    year: '2017',
    title: 'Перечень рекомендуемых мероприятий по улучшению условий труда',
    description: 'План мероприятий по улучшению условий труда',
    pdfUrl: imagePath('/docs/meropriyatiya-usloviya-truda-2017.pdf'),
    fileSize: '1.6 MB'
  }
]

// Компонент карточки документа
function DocumentCard({ doc }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = () => {
    // Создаем ссылку для скачивания
    const link = document.createElement('a')
    link.href = doc.pdfUrl
    link.download = `${doc.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = () => {
    // Открываем PDF в новой вкладке
    window.open(doc.pdfUrl, '_blank')
  }

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${isHovered ? 'rgba(212,160,23,0.3)' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '24px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'rgba(212,160,23,0.1)',
          border: '1px solid rgba(212,160,23,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <FileText size={24} color="#d4a017" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#d4a017',
              background: 'rgba(212,160,23,0.1)',
              padding: '2px 8px',
              borderRadius: 20,
            }}>
              {doc.year}
            </span>
            <span style={{
              fontSize: 11,
              color: 'var(--text-muted)',
            }}>
              PDF • {doc.fileSize}
            </span>
          </div>
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 6,
            lineHeight: 1.4,
          }}>
            {doc.title}
          </h3>
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}>
            {doc.description}
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: 12,
        marginTop: 16,
        paddingTop: 16,
        borderTop: '1px solid var(--border)',
      }}>
        <button
          onClick={handleView}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid rgba(212,160,23,0.3)',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            color: '#d4a017',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(212,160,23,0.1)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <ExternalLink size={14} />
          Открыть
        </button>
        <button
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #f5d060, #e0b430)',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            color: '#2c2c2c',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #e8c040, #d4a017)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #f5d060, #e0b430)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Download size={14} />
          Скачать PDF
        </button>
      </div>
    </div>
  )
}

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
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
      <section className="section" style={{ background: 'var(--bg-primary)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 30 }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
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
                        <a href={c.href} style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', wordBreak: 'break-word' }}
                          onMouseEnter={e => e.currentTarget.style.color = c.color}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        >{c.value}</a>
                      ) : (
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-word' }}>{c.value}</div>
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
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', wordBreak: 'break-word' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Нормативная документация вместо FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Документы</div>
            <h2 className="section-title">Нормативная документация</h2>
            <div className="accent-line" style={{ margin: '14px auto 0' }} />
            <p className="section-subtitle" style={{ marginTop: 16, maxWidth: 600, margin: '16px auto 0' }}>
              Официальные документы и отчёты о специальной оценке условий труда
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 24,
            maxWidth: 1000,
            margin: '0 auto',
          }}>
            {normativeDocs.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}