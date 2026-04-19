import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'geophysics',
    emoji: '⚡',
    title: 'Геофизические работы',
    color: '#0891b2',
    summary: 'Комплексные наземные геофизические съёмки.',
    methods: [
      { name: 'Наземная магниторазведка', desc: 'Прецизионные замеры с использованием магнитометров MiniMag (оверхаузеровский эффект). Точность на уровне мировых стандартов.' },
      { name: 'Электроразведка методом вызванной поляризацияи (ВП)', desc: 'Методы дифференциальной ВП с применением генераторных установок СКАТ-II и СКАТ-2000 мощностью до 2000 Вт.' },
      { name: '3D-электротомография', desc: 'Трёхмерное картирование рудных тел и геологических структур с детальной визуализацией.' },

      { name: 'Гамма-спектрометрия', desc: 'Съёмка с применением спектрометров RS-125 и МКСП-01. Определение радионуклидного состава пород.' },
      { name: 'Сейсмическая томография', desc: 'Высокоточное сейсмическое профилирование для изучения геологического разреза.' },
    ],
  },
  {
    id: 'geology',
    emoji: '⛰️',
    title: 'Геологические и геохимические работы',
    color: '#d4a017',
    summary: 'Полный комплекс полевых и камеральных геологических работ с применением современного оборудования.',
    methods: [
      { name: 'Геологическое сопровождение буровых работ', desc: 'Документация керна, геологическое сопровождение разведочного бурения, построение разрезов.' },
      { name: 'Геоморфологические съёмки', desc: 'Прецизионные аэрофотосъёмки и построение цифровых моделей рельефа.' },
      { name: 'Геохимические поиски', desc: 'Литогеохимические поиски по первичным и вторичным ореолам рассеяния, потокам рассеяния.' },
      { name: 'Рентгенофлуоресцентный анализ (XRF)', desc: 'Экспрессный анализ элементного состава пород и руд.' },
      { name: 'Метод МДИ-М', desc: 'Модифицированная диффузионная экстракция металлов — современный метод геохимических поисков.' },
      { name: 'Составление отчётов в формате ГКЗ', desc: 'Подготовка геологических отчётов, подсчёт запасов согласно требованиям ГКЗ РФ.' },
    ],
  },
  {
    id: 'remote',
    emoji: '🛰️',
    title: 'Дистанционное зондирование Земли',
    color: '#7c3aed',
    summary: 'Космоструктурный анализ и геолого-структурное картирование по материалам ДЗЗ.',
    methods: [
      { name: 'Анализ геологической трещиноватости', desc: 'Изучение морфологии трещин и разрывных нарушений по космическим снимкам.' },
      { name: 'Реконструкция поля тектонических напряжений', desc: 'Восстановление ориентировок осей главных напряжений для прогноза рудолокализующих структур.' },
      { name: 'Геолого-структурное картирование', desc: 'Составление согласованных систем карт и геоструктурных разрезов.' },
      { name: 'Выбор оптимальной программы поисков', desc: 'Рекомендации по постановке наземных работ на основе дешифрирования космоснимков.' },
    ],
  },
  {
    id: 'engineering',
    emoji: '🏗️',
    title: 'Инженерная геофизика',
    color: '#059669',
    summary: 'Решение инженерно-геологических задач методами геофизики для строительства и инфраструктуры.',
    methods: [
      { name: 'Картирование разломов и зон разрушения', desc: 'Выявление тектонических нарушений и зон повышенной трещиноватости при инженерных работах.' },
      { name: 'Поиск мест фильтрации воды', desc: 'Обнаружение утечек в каналах, плотинах и других гидротехнических сооружениях.' },
      { name: 'Характеристика разрезов рыхлых отложений', desc: 'Изучение состава и строения четвертичного чехла методами электроразведки, сейсморазведки.' },
    ],
  },
  {
    id: 'reinterpretation',
    emoji: '🔬',
    title: 'Переинтерпретация архивных данных',
    color: '#dc2626',
    summary: 'Переобработка исторических геологических и геофизических материалов с применением современных методов.',
    methods: [
      { name: 'Авторские алгоритмы обработки', desc: 'Применение оригинальных математических алгоритмов, разработанных специалистами компании.' },
      { name: '2D и 3D геофизическое моделирование', desc: 'Решение прямых и обратных задач геофизики с использованием ZondRes2d/3d, Mag3D и авторских программ.' },
      { name: 'Повышение информативности съёмок', desc: 'Извлечение новой информации из фондовых и архивных материалов.' },
    ],
  },
]

export default function Services() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label">Виды работ</div>
          <h1 className="section-title" style={{ maxWidth: 600 }}>Услуги компании</h1>
          <div className="accent-line" />
          <p className="section-subtitle">
            Полный комплекс геологических, геофизических и геохимических работ — от планирования полевых экспедиций до сдачи итоговых отчётов.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          {services.map((s, idx) => (
            <div key={s.id} style={{ marginBottom: 60 }}>
              {/* Service header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 32 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16, flexShrink: 0,
                  background: `${s.color}14`,
                  border: `1px solid ${s.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  {s.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: s.color, marginBottom: 6 }}>
                    Направление {idx + 1}
                  </div>
                  <h2 style={{ fontFamily: 'Russo One', fontSize: 'clamp(18px, 2.5vw, 26px)', color: 'var(--text-primary)', marginBottom: 8 }}>
                    {s.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{s.summary}</p>
                </div>
              </div>

              {/* Methods grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
                {s.methods.map((m, mi) => (
                  <div key={mi} style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid ${s.color}60`,
                    borderRadius: 12,
                    padding: '18px 20px',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderLeftColor = s.color; e.currentTarget.style.background = 'var(--bg-card-hover)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderLeftColor = `${s.color}60`; e.currentTarget.style.background = 'var(--bg-card)' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{m.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                ))}
              </div>

              {idx < services.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
