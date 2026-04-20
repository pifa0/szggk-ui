import { imagePath } from '../utils/paths'

const equipment = [
  {
    name: 'МЕДУЗА-В2 (SGD-EEM)',
    category: 'Электроразведка',
    color: '#d4a017',
    icon: '⚡',
    photo: imagePath('images/equipment/МЕДУЗА-В2.JPG'),
    desc: 'Многоканальная система измерений электрических параметров горных пород. Обеспечивает одновременную регистрацию данных по нескольким методам.',
    specs: [
      ['Тип', 'Многоканальный измеритель'],
      ['Методы', 'ВП, ЕП, МТЗ, ЗС'],
      ['Каналы', 'Многоканальная схема'],
      ['Применение', 'Комплексная электроразведка'],
    ],
  },
  {
    name: 'СКАТ-II (SGD-EGC200)',
    category: 'Электроразведка',
    color: '#d4a017',
    icon: '⚡',
    photo: imagePath('images/equipment/СКАТ-II.JPG'),
    desc: 'Генератор электрических импульсов мощностью 200 Вт для методов вызванной поляризации и переходных процессов.',
    specs: [
      ['Мощность', '200 Вт'],
      ['Тип', 'Импульсный генератор'],
      ['Метод', 'ВП, ЗС, МДС'],
      ['Применение', 'Поиск рудных тел'],
    ],
  },
  {
    name: 'СКАТ-2000',
    category: 'Электроразведка',
    color: '#d4a017',
    icon: '⚡',
    photo: imagePath('images/equipment/СКАТ-2000.JPG'),
    desc: 'Высокомощный генератор электрических импульсов 2000 Вт для проведения глубинных геоэлектрических исследований.',
    specs: [
      ['Мощность', '2000 Вт'],
      ['Тип', 'Импульсный генератор'],
      ['Метод', 'ВП, ЗС, МДС'],
      ['Применение', 'Глубинные исследования'],
    ],
  },
  {
    name: 'MiniMag',
    category: 'Магниторазведка',
    color: '#0891b2',
    icon: '🧲',
    photo: imagePath('images/equipment/MiniMag.jpg'),
    desc: 'Сверхлёгкий протонный магнитометр на эффекте Оверхаузера. Обеспечивает прецизионные измерения магнитного поля Земли с высокой точностью.',
    specs: [
      ['Принцип работы', 'Эффект Оверхаузера'],
      ['Точность', 'Прецизионная, <0.01 нТл'],
      ['Вес', 'Сверхлёгкий корпус'],
      ['Применение', 'Наземная магниторазведка'],
    ],
  },
  {
    name: 'RS-125',
    category: 'Радиометрия',
    color: '#059669',
    icon: '📊',
    photo: imagePath('images/equipment/RS-125.BMP'),
    desc: 'Портативный спектрометр-радиометр для определения радиоактивности горных пород непосредственно в поле.',
    specs: [
      ['Тип', 'Портативный спектрометр'],
      ['Нуклиды', 'K, U, Th, Cs-137'],
      ['Формат', 'Ручной прибор'],
      ['Применение', 'Гамма-спектрометрия'],
    ],
  },
  {
    name: 'МКСП-01',
    category: 'Радиометрия',
    color: '#059669',
    icon: '📊',
    photo: imagePath('images/equipment/МКСП-01.PNG'),
    desc: 'Гамма-спектрометр для точного определения активности радионуклидов в образцах горных пород и руд в лабораторных условиях.',
    specs: [
      ['Тип', 'Лабораторный спектрометр'],
      ['Нуклиды', 'Полный спектр'],
      ['Точность', 'Высокая'],
      ['Применение', 'Лабораторный анализ'],
    ],
  },
  {
    name: 'DELTA Professional',
    category: 'Геохимия',
    color: '#dc2626',
    icon: '🔬',
    photo: imagePath('images/equipment/DELTA_Professional.PNG'),
    desc: 'Портативный рентгенофлуоресцентный анализатор для экспрессного определения элементного состава горных пород и руд прямо в поле.',
    specs: [
      ['Метод', 'РФА (XRF)'],
      ['Определяемые элементы', 'Na–U (>40 элементов)'],
      ['Время анализа', '2–5 сек'],
      ['Применение', 'Полевой анализ руд'],
    ],
  },
  {
    name: 'Геодезический комплекс «Оптимум»',
    category: 'Геодезия',
    color: '#0891b2',
    icon: '📍',
    photo: imagePath('images/equipment/Оптимум.PNG'),
    desc: 'ГНСС-комплекс для высокоточного позиционирования и привязки геофизических наблюдений к топографической основе.',
    specs: [
      ['Тип', 'ГНСС (GPS/ГЛОНАСС)'],
      ['Точность', 'Сантиметровая'],
      ['Системы', 'GPS, ГЛОНАСС, GALILEO'],
      ['Применение', 'Геодезическая привязка'],
    ],
  },
]

export default function Equipment() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '8%', top: '40%', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(8,145,178,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label">Парк оборудования</div>
          <h1 className="section-title" style={{ maxWidth: 600 }}>Современное оборудование</h1>
          <div className="accent-line" />
          <p className="section-subtitle">
            Сертифицированные приборы ведущих мировых производителей и специализированные геофизические системы для комплексных полевых работ.
          </p>
        </div>
      </section>

      {/* Equipment grid */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
            {equipment.map((eq, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderTop: `3px solid ${eq.color}`,
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Real equipment photo - растягивается под рамку */}
                {eq.photo && (
                  <div style={{
                    height: 220,
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img
                      src={eq.photo}
                      alt={eq.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',  // ← растягивает фото под размеры контейнера
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.justifyContent = 'center';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.fontSize = '48px';
                        e.target.parentElement.style.color = eq.color;
                        e.target.parentElement.innerText = eq.icon;
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: eq.color, marginBottom: 6 }}>
                        {eq.category}
                      </div>
                      <h3 style={{ fontFamily: 'Russo One', fontSize: 18, color: 'var(--text-primary)' }}>{eq.name}</h3>
                    </div>
                    {!eq.photo && <div style={{ fontSize: 28, marginLeft: 12 }}>{eq.icon}</div>}
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 18 }}>{eq.desc}</p>

                  {/* Specs */}
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 14 }}>
                    {eq.specs.map(([key, val], si) => (
                      <div key={si} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, gap: 12 }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{key}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right', maxWidth: 180 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Программное обеспечение</div>
            <h2 className="section-title">Программный инструментарий</h2>
            <div className="accent-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
            {[
              { name: 'ZondRes2d', desc: 'Инверсия данных 2D-электротомографии' },
              { name: 'ZondRes3d', desc: 'Трёхмерная инверсия данных электротомографии' },
              { name: 'Mag3D', desc: 'Трёхмерное моделирование магнитных аномалий' },
              { name: 'Авторские 2D-программы', desc: 'Решение прямых и обратных задач геофизики' },
              { name: 'QGis, ArcGis', desc: 'Геоинформационные системы' },
              { name: 'Surfer, Oasis Montaj', desc: 'Визуализация данных, создание карт изолиний, применение трансформант' },
            ].map((sw, i) => (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{sw.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{sw.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}