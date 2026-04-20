import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { imagePath } from '../utils/paths'

const categories = ['Все', 'Республика Карелия, 2022', 'Республика Коми, 2023', 'Норильск, 2023', 'Мадагаскар, 2023', 'Сурья Казанская, 2024', 'Чукотка, 2024', 'Хабаровский край, 2024', 'ЦАР, 2025', 'Забайкальский край, 2026', 'Конференции']

// Создаём фото группой одной строкой
const createPhotos = (group, srcList) => srcList.map(src => ({ src, group }))

const photos = [
  ...createPhotos('Республика Карелия, 2022', [
    imagePath('images/gallery/Karelia 2022/836b6d97-00e7-4be3-830c-9c4d1735ac75.jpeg'),
    imagePath('images/gallery/Karelia 2022/9942e1c4-df6e-442f-b05a-59a1d067e60b.jpeg'),
    imagePath('images/gallery/Karelia 2022/65642e21-ce83-4625-b7ae-6b02c96b9655.jpeg'),
    imagePath('images/gallery/Karelia 2022/c5bebab8-8121-44ba-8ff6-ceef6dd8f3d2.jpeg'),
    imagePath('images/gallery/Karelia 2022/IMG_3999.heic'),
    imagePath('images/gallery/Karelia 2022/IMG_4086.heic'),
    imagePath('images/gallery/Karelia 2022/IMG_4092.heic'),
    imagePath('images/gallery/Karelia 2022/IMG_4152.png'),
  ]),
  ...createPhotos('Республика Коми, 2023', [
    imagePath('images/gallery/Komi 2023/IMG_6126.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7954.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7805.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7786.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7775.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7651.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7617.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7569.heic'),
    imagePath('images/gallery/Komi 2023/IMG_6169.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7966.heic'),
  ]),
  ...createPhotos('Норильск, 2023', [
    imagePath('images/gallery/Norilsk 2023/IMG_8558.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8549.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8536.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8528.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8501.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8498.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8410.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8405.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8402.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8392.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_8387.heic'),
    imagePath('images/gallery/Norilsk 2023/IMG_3776.heic'),
  ]),
...createPhotos('Мадагаскар, 2023', [
    imagePath('images/gallery/Madaga 2023/IMG_6712.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6711.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6710.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6709.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6708.jpeg'),
     ]),
...createPhotos('Сурья Казанская, 2024', [
    imagePath('images/gallery/Suria/IMG_3204.jpeg'),
    imagePath('images/gallery/Suria/IMG_3343.jpeg'),
    imagePath('images/gallery/Suria/IMG_3319.png'),
    imagePath('images/gallery/Suria/IMG_3315.jpeg'),
    imagePath('images/gallery/Suria/IMG_3252.jpeg'),
    imagePath('images/gallery/Suria/IMG_3245.jpeg'),
    imagePath('images/gallery/Suria/IMG_3233.jpeg'),
    imagePath('images/gallery/Suria/IMG_3216.jpeg'),
    imagePath('images/gallery/Suria/IMG_3212.jpeg'),
  ]),
...createPhotos('Чукотка, 2024', [
    imagePath('images/gallery/Chukotka/IMG_6729.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6728.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6727.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6726.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6725.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6724.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6723.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6722.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_67221jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6720.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6719.jpeg'),
  ]),
...createPhotos('Хабаровский край, 2024', [
    imagePath('images/gallery/Habara/IMG_6734.jpeg'),
    imagePath('images/gallery/Habara/IMG_6733.jpeg'),
    imagePath('images/gallery/Habara/IMG_6732.jpeg'),
    imagePath('images/gallery/Habara/IMG_6731.jpeg'),
    imagePath('images/gallery/Habara/IMG_6730.jpeg'),
  ]),
...createPhotos('ЦАР, 2025', [
    imagePath('images/gallery/ZAR/IMG_6746.jpeg'),
imagePath('images/gallery/ZAR/IMG_6744.jpeg'),
imagePath('images/gallery/ZAR/IMG_6743.jpeg'),
imagePath('images/gallery/ZAR/IMG_6742.jpeg'),
imagePath('images/gallery/ZAR/IMG_6741.jpeg'),
imagePath('images/gallery/ZAR/IMG_6740.jpeg'),
imagePath('images/gallery/ZAR/IMG_6739.jpeg'),
imagePath('images/gallery/ZAR/IMG_6738.jpeg'),
imagePath('images/gallery/ZAR/IMG_6690.jpeg'),
  ]),
...createPhotos('Забайкальский край, 2026', [
    imagePath('images/gallery/Zabaikal/IMG_6755.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6756.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6757.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6758.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6759.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6760.jpeg'),
  ]),
  ...createPhotos('Конференции', [
    imagePath('images/gallery/Konferenz/IMG_6597.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6713.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6714.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6715.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6716.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6717.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6718.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6735.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6736.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6737.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6747.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6748.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6749.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6750.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6754.jpeg'),
    imagePath('images/gallery/Konferenz/IMG_6761.jpeg'),
  ]),
]

export default function Gallery() {
  const [filter, setFilter] = useState('Все')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Все' ? photos : photos.filter(p => p.group === filter)

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
