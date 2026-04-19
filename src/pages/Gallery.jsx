import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const categories = ['Все', 'Полевые работы', 'Карты и данные', 'Оборудование', 'Конференции']

const photos = [
  // Полевые работы
  { src: '/images/field-2021.jpg', title: 'Полевая экспедиция 2021', cat: 'Полевые работы', desc: 'Геофизические работы в полевых условиях, 2021 г.' },
  { src: '/images/field-2019.jpg', title: 'Экспедиция 2019', cat: 'Полевые работы', desc: 'Полевые геологические работы, 2019 г.' },
  { src: '/images/saha.jpg', title: 'Якутия (Саха)', cat: 'Полевые работы', desc: 'Геофизические работы в Республике Саха (Якутия).' },
  { src: '/images/field6.jpg', title: 'Полевые измерения', cat: 'Полевые работы', desc: 'Проведение полевых геофизических измерений.' },
  { src: '/images/field7.jpg', title: 'Работы на объекте', cat: 'Полевые работы', desc: 'Геофизические наблюдения в полевых условиях.' },
  { src: '/images/field8.jpg', title: 'Полевой лагерь', cat: 'Полевые работы', desc: 'Организация базового лагеря экспедиции.' },
  { src: '/images/field9.jpg', title: 'Геофизическая съёмка', cat: 'Полевые работы', desc: 'Проведение геофизической съёмки на объекте.' },
  { src: '/images/field10.jpg', title: 'Экспедиция', cat: 'Полевые работы', desc: 'Полевые геофизические работы.' },
  { src: '/images/field11.jpg', title: 'Геолого-геофизические работы', cat: 'Полевые работы', desc: 'Комплексные полевые геолого-геофизические работы.' },
  { src: '/images/project-field1.jpg', title: 'Полевая база', cat: 'Полевые работы', desc: 'Полевая база экспедиции.' },
  { src: '/images/field-deep1.jpg', title: 'Глубинные исследования', cat: 'Полевые работы', desc: 'Геофизические исследования.' },
  { src: '/images/field-deep2.jpg', title: 'Измерительные работы', cat: 'Полевые работы', desc: 'Проведение полевых измерений.' },
  { src: '/images/photo2.jpg', title: 'Экспедиция', cat: 'Полевые работы', desc: 'Полевые геологические работы.' },
  { src: '/images/photo3.jpg', title: 'Полевые работы', cat: 'Полевые работы', desc: 'Геологические и геофизические работы на объекте.' },
  { src: '/images/team-photo.jpg', title: 'Команда в поле', cat: 'Полевые работы', desc: 'Коллектив СЗГГК «Геокомплекс» в полевых условиях.' },
  // Карты и данные
  { src: '/images/carta-map.jpg', title: 'Карта объекта (Колумбия)', cat: 'Карты и данные', desc: 'Геологическая карта объекта «CARTA_2 Alexander Co.» в Колумбии.' },
  { src: '/images/carta-map2.jpg', title: 'Карта работ в Колумбии', cat: 'Карты и данные', desc: 'Картографические материалы по проекту в Колумбии.' },
  { src: '/images/project-img1.png', title: 'Геофизические данные', cat: 'Карты и данные', desc: 'Результаты геофизической интерпретации.' },
  { src: '/images/project-img2.png', title: 'Обработка данных', cat: 'Карты и данные', desc: 'Камеральная обработка геофизических данных.' },
  { src: '/images/project-img3.png', title: 'Профиль', cat: 'Карты и данные', desc: 'Геофизический разрез.' },
  { src: '/images/project-img4.png', title: 'Интерпретация', cat: 'Карты и данные', desc: 'Интерпретационные материалы.' },
  { src: '/images/project-img5.png', title: 'Геохимические данные', cat: 'Карты и данные', desc: 'Геохимические данные по объекту.' },
  { src: '/images/project-img6.png', title: 'Аномалии', cat: 'Карты и данные', desc: 'Геофизические аномалии.' },
  { src: '/images/project-img7.png', title: 'Карта аномалий', cat: 'Карты и данные', desc: 'Карта выявленных аномалий.' },
  // Оборудование
  { src: '/images/delta-pro.jpg', title: 'DELTA Professional', cat: 'Оборудование', desc: 'Портативный рентгенофлуоресцентный анализатор DELTA Professional.' },
  { src: '/images/rs-125.jpg', title: 'RS-125', cat: 'Оборудование', desc: 'Портативный спектрометр-радиометр RS-125.' },
  { src: '/images/field1.jpg', title: 'СКАТ (электроразведка)', cat: 'Оборудование', desc: 'Генераторная установка электроразведки СКАТ.' },
  { src: '/images/field3.jpg', title: 'Полевое оборудование', cat: 'Оборудование', desc: 'Подготовка оборудования к полевым работам.' },
  // Конференции
  { src: '/images/workshop.jpg', title: 'Workshop de Géophysique', cat: 'Конференции', desc: 'Международный семинар по геофизике. Специалисты компании принимают активное участие в международных конференциях.' },
  { src: '/images/msk2018.jpg', title: 'Конференция, Москва 2018', cat: 'Конференции', desc: 'Участие в конференции, Москва, 2018 г.' },
  { src: '/images/attestation.jpg', title: 'Аттестация специалистов', cat: 'Конференции', desc: 'Аттестация и сертификация специалистов компании.' },
  { src: '/images/photo1.jpg', title: 'Совещание', cat: 'Конференции', desc: 'Рабочее совещание.' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('Все')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Все' ? photos : photos.filter(p => p.cat === filter)

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label">Фотоматериалы</div>
          <h1 className="section-title" style={{ maxWidth: 600 }}>Фотогалерея</h1>
          <div className="accent-line" />
          <p className="section-subtitle">
            Фотографии из полевых экспедиций, карты объектов, оборудование и участие в конференциях.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: '8px 18px', borderRadius: 8, border: '1px solid',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: filter === cat ? 'rgba(212,160,23,0.12)' : 'transparent',
                borderColor: filter === cat ? '#d4a017' : 'rgba(0,0,0,0.10)',
                color: filter === cat ? '#f0c040' : '#94a3b8',
              }}>{cat} {filter === cat && <span style={{ fontSize: 11, opacity: 0.7 }}>({filtered.length})</span>}</button>
            ))}
          </div>

          {/* Photo grid */}
          <div style={{ columns: '3 280px', gap: 10 }}>
            {filtered.map((photo, i) => (
              <div key={i} style={{
                breakInside: 'avoid',
                marginBottom: 10,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
                onClick={() => setLightbox(photo)}
                onMouseEnter={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'
                  e.currentTarget.querySelector('.overlay').style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                  e.currentTarget.querySelector('.overlay').style.opacity = '0'
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{
                    width: '100%', display: 'block',
                    transition: 'transform 0.4s ease',
                    backgroundColor: '#0d1421',
                    minHeight: 80,
                  }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
                <div className="overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,12,20,0.85) 0%, rgba(8,12,20,0.2) 60%, transparent 100%)',
                  opacity: 0, transition: 'opacity 0.3s',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 14,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{photo.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{photo.cat}</div>
                  <ZoomIn size={16} color="#d4a017" style={{ position: 'absolute', top: 12, right: 12 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,8,16,0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 8, padding: 10, cursor: 'pointer', color: '#f1f5f9',
            display: 'flex', alignItems: 'center',
          }}>
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 12 }}
            />
            <div>
              <div style={{ fontFamily: 'Russo One', fontSize: 18, color: '#f1f5f9', marginBottom: 4 }}>{lightbox.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{lightbox.desc}</div>
              <div style={{ display: 'inline-block', marginTop: 8, fontSize: 11, padding: '3px 10px', background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.2)', borderRadius: 4, color: '#22d3ee' }}>{lightbox.cat}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
