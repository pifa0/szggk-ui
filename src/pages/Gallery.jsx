import { useState } from 'react'
import { X } from 'lucide-react'
import { imagePath } from '../utils/paths'

const categories = ['Все', 'Республика Карелия, 2022', 'Республика Коми, 2023', 'Норильск, 2023', 'Мадагаскар, 2023', 'Сурья Казанская, 2024', 'Чукотка, 2024', 'Хабаровский край, 2024', 'ЦАР, 2025', 'Забайкальский край, 2026', 'Ангола', 'Зимбабве, 2020', 'Камчатка, 2011', 'Приполярный Урал, 2020', 'Якутия, 2008', 'Конференции']

// Создаём фото с группой
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
    imagePath('images/gallery/Karelia 2022/IMG_4152.png')
  ]),
  ...createPhotos('Республика Коми, 2023', [
    imagePath('images/gallery/Komi 2023/IMG_6126.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7954.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7651.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7617.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7569.heic'),
    imagePath('images/gallery/Komi 2023/IMG_6169.heic'),
    imagePath('images/gallery/Komi 2023/IMG_7966.heic')
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
    imagePath('images/gallery/Norilsk 2023/IMG_3776.heic')
  ]),
  ...createPhotos('Мадагаскар, 2023', [
    imagePath('images/gallery/Madaga 2023/IMG_6712.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6711.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6710.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6709.jpeg'),
    imagePath('images/gallery/Madaga 2023/IMG_6708.jpeg')
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
    imagePath('images/gallery/Suria/IMG_3212.jpeg')
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
    imagePath('images/gallery/Chukotka/IMG_6721.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6720.jpeg'),
    imagePath('images/gallery/Chukotka/IMG_6719.jpeg')
  ]),
  ...createPhotos('Хабаровский край, 2024', [
    imagePath('images/gallery/Habara/IMG_6734.jpeg'),
    imagePath('images/gallery/Habara/IMG_6733.jpeg'),
    imagePath('images/gallery/Habara/IMG_6732.jpeg'),
    imagePath('images/gallery/Habara/IMG_6731.jpeg'),
    imagePath('images/gallery/Habara/IMG_6730.jpeg')
  ]),
  ...createPhotos('ЦАР, 2025', [
    imagePath('images/gallery/ZAR/IMG_6746.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6744.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6743.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6745.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6741.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6740.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6739.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6738.jpeg'),
    imagePath('images/gallery/ZAR/IMG_6690.jpeg')
  ]),
  ...createPhotos('Забайкальский край, 2026', [
    imagePath('images/gallery/Zabaikal/IMG_6755.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6756.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6757.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6758.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6759.jpeg'),
    imagePath('images/gallery/Zabaikal/IMG_6760.jpeg')
  ]),
  ...createPhotos('Ангола', [
    imagePath('images/gallery/Аngola/DSCN0573.JPG'),
    imagePath('images/gallery/Аngola/DSCN0678.JPG'),
    imagePath('images/gallery/Аngola/DSCN0704.JPG'),
    imagePath('images/gallery/Аngola/19.jpg'),
    imagePath('images/gallery/Аngola/28.jpg'),
  ]),
 ...createPhotos('Зимбабве, 2020', [
    imagePath('images/gallery/Zimbabve 2020/IMG_20200306_103514.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_20200405_080755.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_20200313_100023.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_20200324_124024.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_9013.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_9168.jpg'),
imagePath('images/gallery/Zimbabve 2020/IMG_9282.jpg'),
  ]),
...createPhotos('Камчатка, 2011', [
    imagePath('images/gallery/Kamchatka/DSC04721.JPG'),
    imagePath('images/gallery/Kamchatka/DSCF1096.JPG'),
    imagePath('images/gallery/Kamchatka/DSCF1148.JPG'),
    imagePath('images/gallery/Kamchatka/DSCF1278.JPG'),
    imagePath('images/gallery/Kamchatka/DSCF1345.JPG'),
    imagePath('images/gallery/Kamchatka/DSCF1447.JPG'),
  ]),
...createPhotos('Приполярный Урал, 2020', [
    imagePath('images/gallery/Pripiliar/IMG-20200726-WA0029.jpg'),
    imagePath('images/gallery/Pripiliar/IMG-20200726-WA0031.jpg'),
    imagePath('images/gallery/Pripiliar/IMG-20200726-WA0058.jpg'),
    imagePath('images/gallery/Pripiliar/IMG_20200717_231719.jpg'),
  ]),
...createPhotos('Якутия, 2008', [
    imagePath('images/gallery/Iakutia/P9160157.JPG'),
    imagePath('images/gallery/Iakutia/P9170211.JPG'),
    imagePath('images/gallery/Iakutia/P9170221.JPG'),
    imagePath('images/gallery/Iakutia/P9210450.JPG'),
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
    imagePath('images/gallery/Konferenz/IMG_6761.jpeg')
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
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: '1px solid',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: filter === cat ? 'rgba(212,160,23,0.12)' : 'transparent',
                  borderColor: filter === cat ? '#d4a017' : 'rgba(0,0,0,0.10)',
                  color: filter === cat ? '#d4a017' : '#475569',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo grid - 3 колонки */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}>
            {filtered.map((photo, i) => (
              <div
                key={i}
                onClick={() => setLightbox(photo.src)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.07)',
                  aspectRatio: '1 / 1',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={photo.src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    backgroundColor: '#0d1421',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231e293b\'/%3E%3Ctext x=\'50\' y=\'50\' font-size=\'12\' fill=\'%2394a3b8\' text-anchor=\'middle\' dy=\'.3em\'%3EНет фото%3C/text%3E%3C/svg%3E'
                  }}
                />
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
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(4,8,16,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: 10,
              cursor: 'pointer',
              color: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              zIndex: 10000,
            }}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt=""
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 12
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}