import { useState } from 'react';
import { X, Crown } from 'lucide-react';
import { imagePath } from '../utils/paths'

// Компонент модального окна для увеличенного фото
function PhotoModal({ photo, name, onClose }) {
  if (!photo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      <button
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          zIndex: 1001,
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onClick={onClose}
      >
        <X size={28} color="#fff" />
      </button>

      <div
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          padding: '8px 20px',
          borderRadius: 40,
          fontSize: 14,
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'system-ui, sans-serif',
        }}
        onClick={onClose}
      >
        Нажмите в любом месте, чтобы закрыть
      </div>
    </div>
  );
}

const team = [
  {
    name: 'Кузовенков Александр Дмитриевич',
    role: 'Генеральный директор',
    exp: '25+ лет',
    color: '#d4a017',
    photo: imagePath('images/team/kuzovenkov.png'),
    spec: 'Геолог-поисковик',
    desc: 'Магистр геологии. Окончил каф. Общей Геофизики Геологического факультета СПбГУ в 1996 г.\n Организовывал и руководил прогнозно-поисковыми работами в России и зарубежных странах (Ангола, Гвинея, Зимбабве, Колумбия, Индонезия, Судан, ЦАР, Мадагаскар, Марокко).',
    tags: ['Поиски месторождений ТПИ', 'Управление проектами',],
    isLeader: true
  },
  {
    name: 'Попов Виктор Викторович',
    role: 'Главный геолог',
    exp: '35+ лет',
    color: '#0891b2',
    photo: imagePath('images/team/popov.png'),
    spec: 'Оценка запасов',
    desc: 'Окончил Геологоразведочный факультет Ленинградского горного института в 1985 г. Более 35 лет опыта в оценке ресурсов и подсчёте запасов полезных ископаемых. Эксперт по составлению отчётов для ГКЗ и международных стандартов.\n Руководил и участвовал в проектах по оценке ресурсов и подсчету запасов по ряду месторождений России, Гвинеи, Зимбабве, Марокко, Мали, Гайаны, Камбоджи, Вьетнама.',
    tags: ['Подсчёт запасов', 'Геологическая съемка'],
    isLeader: false
  },
  {
    name: 'Килин Александр Владимирович',
    role: 'Геолог',
    exp: '30+ лет',
    color: '#059669',
    photo: imagePath('images/team/kilin.jpg'),
    spec: 'Геологическая съёмка',
    desc: 'Окончил каф. Полезных ископаемых Геологического факультета ЛГУ им.Жданова в 1991г. Более 30 лет опыта в геологической съёмке и геологоразведочных работах. Специалист по поискам рудных месторождений различных генетических типов.\n Проводил геологические поиски месторождений полезных ископаемых в Карело-Кольском регионе, Респ. Саха-Якутия , на Урале, в Магаданской области, Камчатском крае, Узбекистане и на Северном Кавказе.',
    tags: ['Геологическая съёмка', 'Геохимические работы'],
    isLeader: false
  },
  {
    name: 'Перкурова Виктория Алексеевна',
    role: 'Геолог-геофизик I категории',
    exp: '10+ лет',
    color: '#0891b2',
    photo: imagePath('images/team/perkurova.png'),
    spec: 'Международные проекты',
    desc: 'Окончила Геологический факультет ИНОЗ СПбГУ в 2019 г.\n Руководила полевыми работами в России (Респ. Карелия, Респ. Саха-Якутия, Архангельская область, Забайкальский край) и зарубежных странах (о. Мадагаскар, Марокко, ЦАР).',
    tags: ['Международные проекты', 'Минералогия', 'Полевое руководство'],
    isLeader: false
  },
  {
    name: 'Осипов Алексей Сергеевич',
    role: 'Геолог-геофизик',
    exp: '10+ лет',
    color: '#d4a017',
    photo: imagePath('images/team/osipov.png'),
    spec: 'Магниторазведка',
    desc: 'Окончил Геологический факультет ИНОЗ СПбГУ в 2021 г. Специалист по магниторазведке и интерпретации данных.\n Принимал участие и руководил полевыми работами в России (на Камчатке, Урале, в Хабаровском крае, Архангельской обл., Респ. Карелия, респ. Коми и респ. Якутия), а также за рубежом (ЦАР, о. Мадагаскар, Танзания).',
    tags: ['Магниторазведка', 'Интерпретация данных'],
    isLeader: false
  },
  {
    name: 'Кириллов Виктор Станиславович',
    role: 'Инженер-геофизик',
    exp: '7+ лет',
    color: '#7c3aed',
    photo: imagePath('images/team/kirillov.png'),
    spec: 'Электроразведка',
    desc: 'Окончил Геологоразведочный факультет ФГБОУВО «Санкт-Петербургский Горный Университет» (СПГУ) по специальности горный инженер-геофизик. Специалист по электрическим методам геофизики и инженерной геофизике.\n Принимал участие в полевых работах на Полярном Урале, в Забайкальском крае, Респ. Карелия, о. Мадагаскар, руководил полевыми работами в Норильском районе.',
    tags: ['СГ-ВП', 'ТЭЗ', 'МТЗ', 'Инженерная геофизика'],
    isLeader: false
  },
  {
    name: 'Жемжуров Никита Вячеславович',
    role: 'Геолог',
    exp: '5+ лет',
    color: '#059669',
    photo: imagePath('images/team/zemzhurov.png'),
    spec: 'Твёрдые полезные ископаемые',
    desc: 'Окончил каф. Полезных ископаемых Лесоинженерного факультета СПбГЛТА в 2013 г. Специалист по поискам и оценке месторождений твёрдых полезных ископаемых.\n За время полевых работ выполнял геологические съемки, проводил геологические поиски месторождений полезных ископаемых в Респ. Карелия, Хабаровском крае, на Урале, Чукотке и Респ. Коми. Принимал участие в геолого-поисковых работах в Танзании, ЦАР, на Мадагаскаре.',
    tags: ['Геологическое картирование', 'Документация керна'],
    isLeader: false
  },
  {
    name: 'Андреенок Анжелика Васильевна',
    role: 'Геофизик',
    exp: '5+ лет',
    color: '#dc2626',
    photo: imagePath('images/team/andreenok.png'),
    spec: 'Гамма-спектрометрия',
    desc: 'Окончила Геологоразведочный факультет «Санкт-Петербургского Горного Университета» (СПГУ) по специальности горный инженер-геофизик. Специалист в области гамма-спектрометрии и радиометрии.\n Принимала участие в полевых работах в Республике Карелия, Коми, Норильск, Урал. Опыт международных конференций в Марокко и Анголе: "Применение гамма-спектрометрии при поисках месторождений полезных ископаемых".',
    tags: ['Гамма-спектрометрия', 'Радиометрия', 'Ядерная геофизика'],
    isLeader: false
  },
  {
    name: 'Мирошниченко Юлия Владимировна',
    role: 'Геофизик',
    exp: '5+ лет',
    color: '#7c3aed',
    photo: imagePath('images/team/miroshnichenko.png'),
    spec: 'ВП и магниторазведка',
    desc: 'Окончила Геологоразведочный факультет «Санкт-Петербургского Горного Университета» (СПГУ) по специальности горный инженер-геофизик. Специалист по методам вызванной поляризации и электротомографии.\n Принимала участие в полевых работах в Республике Карелия, Коми, Норильск, Урал, ЦАР. Опыт международных конференций в Марокко и Анголе: "3D-электротомография методом вызванной поляризации".',
    tags: ['СГ-ВП', 'Электротомография'],
    isLeader: false
  },
  {
    name: 'Андреенок Маргарита Васильевна',
    role: 'Инженер-геолог',
    exp: '3+ лет',
    color: '#FF9218',
    photo: imagePath('images/team/andreenok-margarita.JPG'),
    spec: 'Твёрдые полезные ископаемые',
    desc: 'Специалист по поискам и оценке месторождений твёрдых полезных ископаемых. Геологическое картирование, документация горных выработок и керна.\n Принимала участие в полевых работах в Республике Коми, Урал, ЦАР.',
    tags: ['Геологическое картирование', 'Документация керна'],
    isLeader: false
  }
];

// Компонент карточки сотрудника
function TeamCard({ member, onPhotoClick }) {
  // Специальный стиль для руководителя - горизонтальная карточка
  if (member.isLeader) {
    return (
      <div className="team-leader-card" style={{
        background: 'var(--bg-card)',
        border: `2px solid ${member.color}40`,
        borderTop: `4px solid ${member.color}`,
        borderRadius: 24,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 10px 30px -8px ${member.color}40`,
        display: 'flex',
        minHeight: 360,
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = `0 20px 40px -12px ${member.color}60`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 10px 30px -8px ${member.color}40`;
        }}
      >
        {/* Бейдж "Руководитель" */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: member.color,
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          letterSpacing: 0.5,
          zIndex: 10,
        }}>
          <Crown size={14} />
          Руководитель
        </div>

        {/* Фото - на всю высоту слева */}
        <div
          className="team-leader-photo"
          style={{
            width: 280,
            height: 320,
            marginTop: 17,
            marginLeft: 17,
            borderRadius: 30,
            flexShrink: 0,
            background: `${member.color}10`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: member.photo ? 'pointer' : 'default',
          }}
          onClick={() => onPhotoClick(member.photo, member.name)}
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                e.target.parentElement.style.fontFamily = 'Russo One';
                e.target.parentElement.style.fontSize = '48px';
                e.target.parentElement.style.color = member.color;
                e.target.parentElement.innerText = member.name.split(' ').map(n => n[0]).join('');
              }}
            />
          ) : (
            <span style={{ fontFamily: 'Russo One', fontSize: 48, color: member.color }}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>

        {/* Контент справа */}
        <div className="team-leader-content" style={{
          flex: 1,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: 8,
            }}>
              {member.name}
            </div>
            <div style={{
              fontSize: 16,
              color: member.color,
              fontWeight: 600,
              marginBottom: 6,
            }}>
              {member.role}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Опыт: {member.exp}</div>
          </div>

          <div style={{ maxWidth: '70ch' }}>
            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: 20,
              textAlign: 'justify',
              textAlignLast: 'left',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>
              {member.desc}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {member.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 12,
                padding: '4px 12px',
                background: `${member.color}0d`,
                border: `1px solid ${member.color}25`,
                borderRadius: 100,
                color: member.color,
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Обычная карточка для остальных сотрудников
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid var(--border)`,
      borderTop: `3px solid ${member.color}`,
      borderRadius: 20,
      padding: 28,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 20px 30px -10px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: 20
      }}>
        {/* Avatar with photo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            flexShrink: 0,
            background: `${member.color}18`,
            border: `2px solid ${member.color}35`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: member.photo ? 'pointer' : 'default',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onClick={() => onPhotoClick(member.photo, member.name)}
          onMouseEnter={(e) => {
            if (member.photo) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.2)`;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
                e.target.parentElement.style.fontFamily = 'Russo One';
                e.target.parentElement.style.fontSize = '24px';
                e.target.parentElement.style.color = member.color;
                e.target.parentElement.innerText = member.name.split(' ').map(n => n[0]).join('');
                e.target.parentElement.style.cursor = 'default';
              }}
            />
          ) : (
            <span style={{ fontFamily: 'Russo One', fontSize: 24, color: member.color }}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.3
          }}>
            {member.name}
          </div>
          <div style={{
            fontSize: 13,
            color: member.color,
            fontWeight: 600,
            marginTop: 6
          }}>
            {member.role}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Опыт: {member.exp}</div>
        </div>
      </div>

      <div style={{ maxWidth: '70ch' }}>
        <p style={{
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: 16,
          whiteSpace: 'pre-wrap',
          textIndent: '15px',
          textAlign: 'justify',
          textAlignLast: 'left',
          wordBreak: 'break-word',
        }}>
          {member.desc}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {member.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 11, padding: '3px 10px',
            background: `${member.color}0d`,
            border: `1px solid ${member.color}25`,
            borderRadius: 100, color: member.color,
            fontWeight: 500,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [modalName, setModalName] = useState('');

  const openPhoto = (photo, name) => {
    if (photo) {
      setModalPhoto(photo);
      setModalName(name);
    }
  };

  const closePhoto = () => {
    setModalPhoto(null);
    setModalName('');
  };

  // Разделяем руководителя и остальных
  const leader = team.find(m => m.isLeader);
  const otherMembers = team.filter(m => !m.isLeader);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, var(--bg-secondary), var(--bg-primary))',
        padding: '80px 0 60px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(212,160,23,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label">Наш коллектив</div>
          <h1 className="section-title" style={{ maxWidth: 600 }}>Команда специалистов</h1>
          <div className="accent-line" />
          <p className="section-subtitle">
            Геологи, геофизики и геохимики с опытом полевых работ от 3 до 35+ лет в России и на международных объектах.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          {/* Карточка руководителя - горизонтальная на всю ширину */}
          {leader && (
            <div style={{ marginBottom: 40 }}>
              <TeamCard member={leader} onPhotoClick={openPhoto} />
            </div>
          )}

          {/* Остальные карточки - сеткой 3 колонки */}
          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 24
          }}>
            {otherMembers.map((member, i) => (
              <TeamCard key={i} member={member} onPhotoClick={openPhoto} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              ['10', 'Специалистов в штате'],
              ['3+', 'Лет — минимальный опыт'],
              ['5+', 'Стран экспедиций'],
              ['100%', 'Имеют полевой опыт'],
            ].map(([val, label], i) => (
              <div key={i}>
                <div className="stat-value">{val}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для увеличенного фото */}
      {modalPhoto && (
        <PhotoModal
          photo={modalPhoto}
          name={modalName}
          onClose={closePhoto}
        />
      )}
    </div>
  );
}