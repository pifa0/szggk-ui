import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { imagePath } from '../utils/paths'

const values = [
  { title: 'Точность и достоверность', desc: 'Все результаты работ проходят многоуровневую проверку качества перед сдачей заказчику.' },
  { title: 'Инновационные методы', desc: 'Применяем авторские алгоритмы и современные программные комплексы для обработки геофизических данных.' },
  { title: 'Опытный коллектив', desc: 'Специалисты с опытом 3–35 лет, работавшие на объектах на всех континентах.' },
  { title: 'Гибкость и мобильность', desc: 'Работаем во всех климатических зонах — от арктических до тропических, в любом рельефе.' },
  { title: 'Соответствие стандартам', desc: 'Отчёты и заключения соответствуют требованиям ГКЗ и международным стандартам JORC/NI 43-101.' },
  { title: 'Обучение и наставничество', desc: 'Наши сотрудники непрерывно повышают квалификацию, осваивают передовые методы геологоразведки и внедряют инновации в рабочие процессы. Передаем накопленный опыт студентам-практикантам.' },
];

const timeline = [
  { year: '2017', event: 'Основание компании в Санкт-Петербурге. Первые полевые экспедиции.' },
  { year: '2018', event: 'Выход на международные рынки. Проекты в странах Африки, о. Магадаскар.' },
  { year: '2020', event: 'Расширение географии работ в странах Африки и на территории России.' },
  { year: '2023', event: 'Увеличение аппаратурной базы компании, внедрение новых геофизических методов, привлечение новых специалистов.' },
  { year: 'Сегодня', event: 'Более 40 контрактов, 100 000+ пг.км геофизической и геохимической съёмки, подтверждено более 150 млн тонн запасов руд ТПИ.' },
];

// Массив сертификатов
const certificates = [
  { id: 1, src: imagePath('images/certificate/certificate1.png'), alt: 'Сертификат 1' },
  { id: 2, src: imagePath('images/certificate/certificate2.png'), alt: 'Сертификат 2' },
  { id: 3, src: imagePath('images/certificate/certificate3.png'), alt: 'Сертификат 3' },
  { id: 4, src: imagePath('images/certificate/certificate4.png'), alt: 'Сертификат 4' },
  { id: 5, src: imagePath('images/certificate/certificate5.png'), alt: 'Сертификат 5' },
  { id: 6, src: imagePath('images/certificate/certificate6.png'), alt: 'Сертификат 6' },
  { id: 7, src: imagePath('images/certificate/certificate7.png'), alt: 'Сертификат 7' },
  { id: 8, src: imagePath('images/certificate/certificate8.png'), alt: 'Сертификат 8' },
  { id: 9, src: imagePath('images/certificate/certificate9.png'), alt: 'Сертификат 9' },
  { id: 10, src: imagePath('images/certificate/certificate10.png'), alt: 'Сертификат 10' },
  { id: 11, src: imagePath('images/certificate/certificate11.png'), alt: 'Сертификат 11' },
  { id: 12, src: imagePath('images/certificate/certificate12.png'), alt: 'Сертификат 12' },
  { id: 13, src: imagePath('images/certificate/certificate13.png'), alt: 'Сертификат 13' },
  { id: 14, src: imagePath('images/certificate/certificate14.png'), alt: 'Сертификат 14' },
];

// Компонент карусели сертификатов
function CertificateCarousel() {
  const [centerIndex, setCenterIndex] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePrev = () => {
    setCenterIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const getItemStyle = (index) => {
    let position = index - centerIndex;
    if (position > certificates.length / 2) position -= certificates.length;
    if (position < -certificates.length / 2) position += certificates.length;

    const absPosition = Math.abs(position);
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    let translateX = 0;
    let translateY = 0;
    let blur = '0px';

    if (absPosition === 0) {
      scale = 1.4;
      zIndex = 30;
      translateX = 0;
      translateY = 0;
      blur = '0px';
    } else if (absPosition === 1) {
      scale = 1.0;
      zIndex = 20;
      translateX = position * 140;
      translateY = 0;
      blur = '0px';
    } else if (absPosition === 2) {
      scale = 0.7;
      opacity = 0.5;
      zIndex = 5;
      translateX = position * 240;
      translateY = 10;
      blur = '2px';
    } else {
      scale = 0;
      opacity = 0;
      zIndex = 0;
      translateX = position * 300;
    }

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${blur})`,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      boxShadow: absPosition === 0 ? '0 25px 40px -12px rgba(0,0,0,0.3)' : '0 10px 20px -8px rgba(0,0,0,0.2)',
    };
  };

  return (
    <div style={{ position: 'relative', padding: '60px 0 80px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 className="section-title">Награды и сертификаты</h2>
        <div className="accent-line" style={{ margin: '14px auto 0' }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 480 }}>
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: 20,
            zIndex: 100,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
        >
          <ChevronLeft size={24} color="var(--text-primary)" />
        </button>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          {certificates.map((cert, idx) => {
            const style = getItemStyle(idx);
            if (style.opacity === 0) return null;

            return (
              <div
                key={cert.id}
                onClick={() => handleImageClick(cert.src)}
                style={{
                  position: 'absolute',
                  ...style,
                  width: 220,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: style.boxShadow,
                }}
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: 20,
            zIndex: 100,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
        >
          <ChevronRight size={24} color="var(--text-primary)" />
        </button>
      </div>

      {isModalOpen && selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <button
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <X size={28} color="#fff" />
          </button>
          <img
            src={selectedImage}
            alt="Увеличенный сертификат"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Page header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '14%', top: '50%', transform: 'translateY(-50%)', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(8,145,178,0.08)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 48,
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className="section-label">О компании</div>
              <h1 className="section-title" style={{ maxWidth: 600 }}>
                Северо-Западная Геолого-Геофизическая Компания «Геокомплекс»
              </h1>
              <div className="accent-line" />
              <p className="section-subtitle">
                Мы — специализированная сервисная компания, выполняющая полный комплекс наземных поисковых геологических, геохимических и геофизических работ на твёрдые полезные ископаемые и углеводороды.
              </p>
            </div>

            <div style={{
              flex: 0.8,
              minWidth: 280,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img
                src={imagePath('images/about/company-photo.jpg')}
                alt="Геолого-геофизические работы"
                style={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  borderRadius: 16,
                  boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Company+Photo';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main description */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="section-label">Кто мы</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Геологи. Геофизики. Геохимики.
              </h2>
              <div className="accent-line" />
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>
                ООО «СЗГГК "Геокомплекс"» основана в Санкт-Петербурге и специализируется на проведении комплексных наземных поисковых работ на твёрдые полезные ископаемые (золото, МПГ, полиметаллы, кимберлиты) и углеводороды.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>
                В составе нашего коллектива — геологи, геофизики и геохимики с опытом полевых работ от 3 до 35+ лет. Мы работали в России, странах Африки, Азиатско-Тихоокеанского региона и Латинской Америки.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>
                Разработанные нами технологии поисков позволяют решать задачи любой сложности в самых труднодоступных районах.
              </p>
            </div>

            <div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 32,
                marginTop: 80,
              }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#0891b2',
                  marginBottom: 24
                }}>
                  Ключевые показатели
                </div>
                {[
                  ['40+', 'контрактов с частными и государственными организациями'],
                  ['100+', 'тысяч погонных километров геофизической съёмки и интерпретации'],
                  ['150+', 'миллионов тонн подтверждённых запасов руд чёрных и цветных металлов'],
                  ['25+', 'лет опыта у ведущих специалистов компании'],
                ].map(([val, label], i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: 14,
                    paddingBottom: i < 3 ? 15 : 0,  // У последнего элемента убираем нижний отступ
                    marginBottom: i < 3 ? 15 : 0,   // У последнего элемента убираем нижний отступ
                    borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'Russo One',
                      fontSize: 22,
                      color: '#d4a017',
                      minWidth: 100,
                      flexShrink: 0
                    }}>{val}</div>
                    <div style={{
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label">Принципы работы</div>
            <h2 className="section-title">Наши ценности</h2>
            <div className="accent-line" style={{ margin: '14px auto 0' }} />
          </div>
          <div className="grid-3" style={{ gap: 20 }}>
            {values.map((v, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <CheckCircle2 size={20} color="#d4a017" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{v.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{v.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ marginBottom: 52 }}>
            <div className="section-label">История компании</div>
            <h2 className="section-title">Путь развития</h2>
            <div className="accent-line" />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 50, top: 8, bottom: 0, width: 2, background: 'linear-gradient(to bottom, rgba(212,160,23,0.5), rgba(8,145,178,0.15))', borderRadius: 1, pointerEvents: 'none' }} />
            {timeline.map((t, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, marginLeft: 34 }}>
                  <div style={{ position: 'relative', width: 34, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d4a017', border: '2px solid #080c14', zIndex: 1 }} />
                  </div>
                  <div style={{
                    fontFamily: 'Russo One',
                    fontSize: 14,
                    color: '#d4a017',
                    letterSpacing: 1
                  }}>
                    {t.year}
                  </div>
                </div>
                <div style={{ marginLeft: 125 }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '14px 18px',
                    maxWidth: 800
                  }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{t.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Карусель сертификатов */}
      <CertificateCarousel />
    </div>
  );
}