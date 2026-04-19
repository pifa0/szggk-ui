import { useState, useEffect, useCallback, useMemo } from 'react'
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const locations = [
    {
        id: 1, lat: 59.93, lng: 30.32, region: 'Россия', country: 'Санкт-Петербург',
        name: 'Головной офис', type: 'office', color: '#94A3B8',
        desc: 'Центральный офис компании. Камеральные работы, обработка данных, составление отчётов.',
        works: ['Управление проектами', 'Камеральные работы', 'Хранение данных'],
    },
    {
        id: 2, lat: 60.11280, lng: 59.04757, region: 'Золото. Гидротермальный золото-сульфидный тип', country: 'Золото',
        name: 'Северный Урал (Пермский край), 2024', type: 'Gold', color: '#FBBF24',
        desc: 'В рамках работ проведена магниторазведочная, электроразведочная (в площадном и профильном варианте) и гамма-спектрометрическая съемка. Построены карты графиков и изолиний содержания естественных радиоактивных элементов (K40, Th232, Ra226), аномального магнитного поля, удельного электрического сопротивления и поляризуемости, по которым выделены контрастные по электрическим, магнитным и радиоактивным свойствам объекты, отвечающие интрузивным телам и зонам развития метасоматоза.\n Объекты, выделяемые как перспективные на обнаружение золоторудной минерализации, характеризуются как зоны проводимости с высоким значением поляризуемости, повышенного значения калиевой составляющей, магнитного поля и тяготеют к высоко градиентным участкам.',
        works: ['Магниторазведка', 'СГ-ВП', 'ТЭЗ', 'Гамма-спектрометрия'],
        images: [
            'public/images/projects/NorthernUrals(Perm Krai),2024/img.png',
            'public/images/projects/NorthernUrals(Perm Krai),2024/img_1.png',
            'public/images/projects/NorthernUrals(Perm Krai),2024/img_2.png',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Гамма.jpg',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Поляра.webp',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Разрезы.jpg',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Самородки.webp',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Схема.jpg',
            'public/images/projects/NorthernUrals(Perm Krai),2024/Электро.jpg',
        ]
    },
    {
        id: 3, lat: 57.58, lng: 160.78, region: 'Золото. Гидротермально-метасоматический золото-кварц-малосульфидной тип', country: 'Карелия',
        name: 'Озерновское рудное поле (п-ов Камчатка), 2011-2012', type: 'Gold', color: '#FBBF24',
        desc: '- проведение комплексных геофизических работ методами электроразведки и магниторазведки в пределах Озерновского рудного поля с целью выделения высокоомных поляризующихся объектов, соответствующих по параметрам и характеристикам, предположительно, рудоносным объектам;\n - уточнение пространственного положения, элементов залегания рудных зон; изучение вертикального разреза до глубины 200 – 300 метров и подготовка участка под разведочные канавы и заверочное бурение.\n По результатам работ были выделены наиболее перспективные тела 5 класса, соответствующие зонам окварцевания со слабой сульфидной минерализацией. Объекты 3 и 4 класса также представляют поисковый интерес, как зоны метасоматоза.\n Всего, в пределах Озерновского рудного поля выявлено более 100 тел гидротермальных кварцитов и кварцевых жил. Все они характеризуются повышенной золотоносностью, а некоторые содержат промышленные концентрации золота. Содержание на разных участках Озерновского поля варьируется от 14,2 г/т до 64 г/т.\n Разведанные запасы по оценке CSA Global Pty.Ltd (Австралия) составили 104.1 тонн золота',
        works: ['Магниторазведка', 'Электроразведка'],
        images: [
            'public/images/projects/OzernovKamzhatka/Озерновское рудное поле, п-ов Камчатка, 2011-2012.webp',
        ]
    },
    {
        id: 4, lat: 59.7666, lng: 60.2086, region: 'Золото. Вулканогенный гидротермальный золото-сульфидный тип', country: 'Урал',
        name: 'Северный Урал (Свердловская обл., Краснотурьинск), 2024', type: 'Gold', color: '#A0AEC0',
        desc: 'Золоторудная минерализация локализуется в породах вулканогенной и вулканогенно-осадочной формации и связана с интрузивными комплексами основных пород. Предположительно сходна с месторождениями Воронцовского типа.\n Комплексная интерпретация геофизических данных позволила установить взаимосвязь аномалий с тектонически ослабленными зонами и интрузивными комплексами.\n Магниторазведка выявила участки, приуроченные к контактам интрузивного комплекса с зонами разломов.\n Электроразведка выделила области с признаками сульфидной вкрапленности и гидротермально-метасоматической переработкой пород.\n Гамма-спектрометрическая съемка выявила аномалии калия, связанные с зонами калиевого метасоматоза.',
        works: ['Магниторазведка', 'СГ-ВП', 'Электротомография','Гамма-спектрометрия'],
        images: ['public/images/projects/Krasnoturiansk/Разрезы.jpg',
            'public/images/projects/Krasnoturiansk/схема.jpg',
            'public/images/projects/Krasnoturiansk/Классификация.jpg',
            'public/images/projects/Krasnoturiansk/Условные.webp'
        ]
    },
    {
        id: 5, lat: 62.1764, lng: 30.69296, region: 'Золото. Золото-кварц-малосульфидный тип березитовой формации зеленокаменных поясов', country: 'Якутия',
        name: 'Республика Карелия (центральная часть Ялонвара-Хатту-Лендерского зеленокаменного пояса), 2022', type: 'Gold', color: '#63B3ED',
        desc: 'Золоторудная минерализация локализуется в зонах гидротермально-метасоматической проработки пород, рядом с кварцевыми жилами, где вмещающими породами, главным образом, являются метавулканиты и туфогенные образования среднего состава. Структурный контроль осуществляется серией субпараллельных, крутозалегающих разрывных нарушений, преимущественно, северо-западного и субмеридионального простирания.\n Результатом геофизических работ является структурно- интерпретационная схема, на которую вынесены контуры перспективных площадей по совокупному результату комплексной интерпретации и формализованного прогноза.\n Проделанная работа показала успешность комплексирования методов магниторазведки и площадной электроразведки. Магнитная съемка решает структурно-картировочные задачи, а электроразведка выделяет зоны, различающиеся по содержанию электронопроводящих включений (сульфидов и других минералов, обладающих электронной проводимостью).',
        works: ['Магниторазведка', 'Электроразведка'],
        images: [
            'public/images/projects/Karelia IaHL/Магнитка.png',
            'public/images/projects/Karelia IaHL/Электроразведка.png',
            'public/images/projects/Karelia IaHL/Линеаменты.png',
            'public/images/projects/Karelia IaHL/Результаты.png',
            'public/images/projects/Karelia IaHL/Поисковые критерии.png',
        ]
    },
    {
        id: 6, lat: 58.73, lng: 127.882, region: 'Золото. Золото-кварц-сульфидная формация (Лебединский тип)', country: 'Камчатка',
        name: 'Республика Саха (Алданский район), 2014', type: 'Gold', color: '#F6AD55',
        desc: 'Вмещающими породами для рудных тел являются доломиты нижней части Устьюдомской свиты, а также – породы докембрийского фундамента и мезозойские магматические образования. Структуры месторождений характеризуются пологими субгоризонтальными зонами трещиноватости в сочетании с крутопадающими нарушениями разных направлений.\n По результатам совместных геолого-геофизических работ наибольший интерес представляет протяжённый в субмеридиональном направлении блок пород в центральной части участка. По выявленным геофизическим параметрам этот объект характеризуется как высокоомный, поляризующийся и немагнитный.\n Последующие буровые работы подтвердили наличие на этом объекте полезного компонента с содержанием золота до 40 г/т.',
        works: ['Магниторазведка', 'ВП-СГ', 'Электротомография'],
        images: [
            'public/images/projects/Aldanskii/Разрезы.webp',
            'public/images/projects/Aldanskii/УЭС.png',
            'public/images/projects/Aldanskii/Геология.webp',
        ]
    },
    {
        id: 7, lat: 14, lng: 15, region: 'Золото. Гидротермальный золото-кварц-сульфидный тип', country: 'Ангола',
        name: 'Участок «Мпопо» (Республика Ангола), 2002-2003', type: 'Gold', color: '#63B3ED',
        desc: 'Результаты геофизических работ на участке «Мпопо» позволили выделить линейные аномалии субмеридионального направления, пересечённые тектоническими нарушениями субширотного простирания, к которым приурочены зоны рудной минерализации. Для этих рудых зон характерна хорошая корреляция с зонами повышенной поляризуемости и сопротивления.',
        works: ['Магниторазведка', 'Электроразведка'],
        images: ['public/images/projects/Mpopo/МАгнитка с УЭС.webp',
            'public/images/projects/Mpopo/поляра с УЭС.webp',]
    },
    {
        id: 8, lat: 4.39, lng: 18.54, region: 'Золото. Осадочно-метаморфогенный тип', country: 'Гвинея',
        name: 'Республика ЦАР, 2022', type: 'Gold', color: '#FBBF24',
        desc: 'Золоторудная минерализация в ассоциации с сульфидами локализована в кварц-серицитовых сланцах вблизи контакта с комплексом железистых кварцитов. Рудоконтролирующими структурами являются зоны тектонических нарушений.\n На примере одного из участков показана связь высокоомных областей, соответствующих железистым кварцитам и аномалий поляризуемости маркирующих области сульфидной минерализации вдоль тектонических нарушений, выделенных по результатам магниторазведки.',
        works: ['Магниторазведка', 'ВП-СГ', 'Электротомография'],
        images: [
            'public/images/projects/Zar 2022/Магнитка.webp',
            'public/images/projects/Zar 2022/Разрезы.webp',
            'public/images/projects/Zar 2022/Сопротивление.jpg',
        ]
    },
    {
        id: 9, lat: 64.42, lng: 50.5, region: 'Марганцевые руды. Осадочный инфильтрационный тип марганцевых руд', country: 'Зимбабве',
        name: 'Республика Коми, 2024', type: 'Mn', color: '#FBBF24',
        desc: 'Манганолиты (марганцевые породы), представленные псиломелан-пиролютизированными породами. Образуются в осадочных толщах за счет отложения первичного материала в водных бассейнах. Наиболее перспективная область приходится на первую террасу реки Печора.\n В результате проведенных работ выявлено, что аномальные зоны поляризуемости тяготеют к высокоомной и градиентной зоне удельного электрического сопротивления. Электротомография показала, что аномальная область по поляризуемости в приповерхностной части разрезов, коррелирует с выходами марганец содержащих тел на поверхность. Мощность поляризующегося объекта 20 м, длина 200 м.',
        works: ['Электротомография', 'Электроразведка симметричной установкой'],
        images: [
            'public/images/projects/Komi 2024/Поляра.webp',
            'public/images/projects/Komi 2024/УЭС.jpg',
            'public/images/projects/Komi 2024/УЭС с полярой.jpg',
            'public/images/projects/Komi 2024/Разрезы.jpg',
            'public/images/projects/Komi 2024/Разрезы 2.jpg',
            'public/images/projects/Komi 2024/Разрезы 3.jpg',
        ]
    },
    {
        id: 10, lat: -19.015, lng: 29.1548, region: 'Марганцевые руды. Гидротермально-метасоматический тип марганцевых руд', country: 'Мадагаскар',
        name: 'Республика Зимбабве, 2018', type: 'Mn', color: '#48BB78',
        desc: 'Оруденение приурочено к тектонизированной приконтактовой зоне грубозернистых метапесчаников и кварц-биотитовых гнейсов и представляет собой гидротермально-метасоматическое обогащение и переотложение марганцевых минералов по тектонической трещиноватой зоне с отдельными участками богатой обогащенной руды. Источником марганцевых руд вероятно являлись либо сами метапесчаники с вкрапленностью пиролюзита, либо известные к югу от участка биотит-силлиманитовые метасланцы с прослоями карбонатных пород.\n По результатам проведенных геолого-геофизических работ выделен, редкий для этого района Африки, гидротермально-метасоматический тип марганцевого оруденения. Установлены поисковые геолого-геофизические критерии марганцевого оруденения:\n - наличие вмещающих пород с мелкой и средней вкрапленностью марганцевых минералов (пиролюзит, манганит, гаусманит);\n - локальные аномалии поляризуемости (максимальная мощность жилы среди всех известных рудопроявлений составила 6 метров), обусловленные «стягиванием» марганцевых минералов из вмещающих пород в жилу.\n - низкоомные зоны по результатам электротомографии (в верхней части разреза вмещающие породы сильно выветрелые, трещиноватые, что уменьшает значения сопротивления до первых сотен Ом*м).',
        works: ['Магниторазведка', 'Электротомография', 'Электроразведка симметричной установкой'],
        images: [
            'public/images/projects/Zimbabve 2018/Схема.png',
            'public/images/projects/Zimbabve 2018/УЭС.webp',
            'public/images/projects/Zimbabve 2018/Поляра.png',
            'public/images/projects/Zimbabve 2018/Анализ.jpg',
        ]
    },
    {
        id: 11, lat: 8.76, lng: 126.09, region: 'Марганцевые руды. Осадочный тип марганцевых руд', country: 'Колумбия',
        name: 'Индонезия (Восточный Тимор), 2015', type: 'Mn', color: '#FBBF24',
        desc: 'Марганцевые руды в виде линз залегают в породах кремнисто-карбонатного состава. Марганцевые минералы представлены родохрозитом и пиролюзитом.\n По результатам геофизических работ объекты, перспективные на марганцевое орудинение, можно разделить на три типа:\n - высокоомные поляризующиеся (породы кремнистого состава с прослоями марганцевых минералов)\n - среднеомные поляризующиеся (породы преимущественно карбонатного состава с включениями родохрозита и незначительными включениями марганцевых минералов в виде дендритов или тонких прослоев мощностью первые миллиметры)\n - проводящие поляризующиеся (породы преимущественно глинистого-карбонатного состава с включениями марганцевых конкреций или отдельных обломков размером от первых сантиметров до 10 сантиметров и более)',
        works: ['Магниторазведка', 'Электроразведка симметричной установкой'],
        images:[
            'public/images/projects/Indonezia/АМП.jpg',
            'public/images/projects/Indonezia/Поляра.jpg',
            'public/images/projects/Indonezia/Разрезы.jpg',
            'public/images/projects/Indonezia/УЭС.jpg',
        ]
    },
    {
        id: 12, lat: 51.44, lng: 61.157, region: 'Хромитовые руды', country: 'Колумбия',
        name: 'Оренбургская обл. (Южный Урал, п. Тобольский), 2023', type: 'Cr', color: '#FBBF24',
        desc: 'Тела хромитовых руд приурочены к Аккаргинскому гипербазитовому массиву. Оруденение локализуется в аподунитовых и апоперидотитовых серпентинитах. Наиболее приближенным аналогом являются месторождения Халиловского массива.\n Комплексная интерпретация геофизических данных позволила установить взаимосвязь аномалий с тектонически ослабленными зонами и контактом серпентинитовых комплексов различного состава. Магниторазведка позволила определить тектоническую позицию исследуемой площади и составить структурную схему для определения наиболее перспективных профилей для проведения электротомграфии. Электротомография позволила определить глубину залегания целевых объектов, а также оконтурить рудные тела в разрезе и на плане. Сопоставление результатов различных методов позволило выделить наиболее перспективные участки для постановки горнопроходческих работ.',
        works: ['Магниторазведка', 'Электротомография'],
        images:[
            'public/images/projects/Tobolskii/Схемы.webp',
            'public/images/projects/Tobolskii/АМП.webp',
            'public/images/projects/Tobolskii/Линиаменты.jpg',
        ]
    },
    {
        id: 13, lat: -19.33333, lng: 47.066666, region: 'Хромитовые руды', country: 'Колумбия',
        name: 'Республика Мадагаскар, 2019', type: 'Cr', color: '#FBBF24',
        desc: 'Рудные тела приурочены к линзам гипербазитов в сильно деформированных габбро-норитах, мелкие рудные тела с более низким отношением Cr/Fe - к изолированным телам гипербазитов. Также в пределах лицензионной площади хромитовые тела расположены и в докембрийских стратифицированных отложениях, однако размеры таких объектов невелики и представляют собой обломки основного тела, перемещенные в результате процессов складкообразования и тектонических движений.\n Комплексная интерпретация геофизических данных позволила установить взаимосвязь аномалий с тектонически ослабленными зонами и ядрами складок стратифицированных докембрийских отложений. Магниторазведка позволила определить тектоническую позицию исследуемой площади и составить структурную схему для определения наиболее перспективных профилей для проведения электротомграфии. Электротомография позволила определить глубину залегания целевых объектов, а также оконтурить рудные тела в разрезе и на плане. Сопоставление результатов различных методов позволило выделить наиболее перспективные участки для постановки дальнейших поисковых работ.',
        works: ['Магниторазведка', 'Электротомография', 'Геологическое картирование'],
        images:[
            'public/images/projects/Madaga 2019/АМП.webp',
            'public/images/projects/Madaga 2019/Электротомография.webp',
            'public/images/projects/Madaga 2019/Модель.webp',
            'public/images/projects/Madaga 2019/Модель 2.webp',
        ]
    },
   ]

const typeInfo = {
    office: { label: 'Офис', color: '#94A3B8' },
    Gold: { label: 'Золото', color: '#FBBF24' },
    Mn: { label: 'Марганцевые руды', color: '#8B5A2B' },
    Cr: { label: 'Хромитовые руды', color: '#48BB78' },
    TiFEO: { label: 'Титано-магнетитовые', color: '#4A5568' },
    ZnPb: { label: 'Полиметаллические', color: '#A0AEC0' },
    CuNi: { label: 'Медно-никелевые', color: '#D9776A' },
    diamond: { label: 'Кимберлиты', color: '#63B3ED' },
    placers: { label: 'Россыпи', color: '#F6AD55' },
    engineer: { label: 'Инженерные изыскания', color: '#718096' },
    space: { label: 'Космодешифрирование', color: '#5A67D8' },
}

/** Map marker size in CSS px — tweak MAP_DOT_PX only */
const MAP_DOT_PX = 22

function mapPlacemarkIconOptions(color) {
    const s = MAP_DOT_PX
    const c = s / 2
    const rOuter = Math.max(0, c - 0.45)
    const rWhite = c * 0.62
    const rCenter = c * 0.32
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">` +
        `<circle cx="${c}" cy="${c}" r="${rOuter}" fill="${color}"/>` +
        `<circle cx="${c}" cy="${c}" r="${rWhite}" fill="#ffffff"/>` +
        `<circle cx="${c}" cy="${c}" r="${rCenter}" fill="${color}"/>` +
        `</svg>`
    const href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    return {
        iconLayout: 'default#image',
        iconImageHref: href,
        iconImageSize: [s, s],
        iconImageOffset: [-c, -c],
    }
}

// Карусель
function ImageCarousel({ images, onImageClick }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    if (!images || images.length === 0) return null

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e) => {
        e.stopPropagation()
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                minHeight: 220,
                maxHeight: 420,
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#f1f5f9',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onImageClick?.(images, currentIndex)}
        >
            <img
                src={images[currentIndex]}
                alt="Фото"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                }}
            />

            {images.length > 1 && isHovered && (
                <>
                    <button
                        onClick={prevImage}
                        style={{
                            position: 'absolute',
                            left: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(4px)',
                            border: 'none',
                            borderRadius: 40,
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#1e293b',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            zIndex: 10,
                        }}
                    >
                        <ChevronLeft size={22} strokeWidth={1.5} />
                    </button>

                    <button
                        onClick={nextImage}
                        style={{
                            position: 'absolute',
                            right: 16,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(4px)',
                            border: 'none',
                            borderRadius: 40,
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#1e293b',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            zIndex: 10,
                        }}
                    >
                        <ChevronRight size={22} strokeWidth={1.5} />
                    </button>
                </>
            )}
        </div>
    )
}

function ImageModal({ images, currentIndex, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose, onPrev, onNext])

    if (!images || images.length === 0) return null
    const activeImage = images[currentIndex]

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
            }}
            onClick={onClose}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 40,
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    zIndex: 10000,
                }}
            >
                <X size={24} strokeWidth={1.5} />
            </button>
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onPrev()
                        }}
                        style={{
                            position: 'absolute',
                            left: 20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: 40,
                            width: 46,
                            height: 46,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#fff',
                            transition: 'all 0.2s ease',
                            zIndex: 10000,
                        }}
                    >
                        <ChevronLeft size={24} strokeWidth={1.8} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onNext()
                        }}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: 40,
                            width: 46,
                            height: 46,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#fff',
                            transition: 'all 0.2s ease',
                            zIndex: 10000,
                        }}
                    >
                        <ChevronRight size={24} strokeWidth={1.8} />
                    </button>
                </>
            )}
            <img
                src={activeImage}
                alt="Полный размер"
                style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                }}
                onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(15,23,42,0.55)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: 999,
                        zIndex: 10000,
                    }}
                >
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    )
}

// Компонент карточки проекта
function ProjectCard({ loc, markerColor, onSelect, isSelected, onImageClick }) {
    return (
        <div
            style={{
                background: 'white',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: `1px solid ${isSelected ? markerColor : '#edf2f7'}`,
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                height: 'fit-content',
            }}
            onClick={() => onSelect(loc)}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 30px -12px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
            }}
        >
            {loc.images && <ImageCarousel images={loc.images} onImageClick={onImageClick} />}
            <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: markerColor }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: markerColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {loc.region}
                    </span>
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#1e293b' }}>{loc.name}</h4>

                {typeof loc.desc === 'string' ? (
                    <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: 14, whiteSpace: 'pre-wrap', textIndent: '15px', textAlign: 'justify' }}>
                        {loc.desc}
                    </p>
                ) : (
                    loc.desc?.map((paragraph, idx) => (
                        <p key={idx} style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginBottom: idx === loc.desc.length - 1 ? 14 : 10 }}>
                            {paragraph}
                        </p>
                    ))
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {loc.works.map(w => (
                        <span key={w} style={{ background: `${markerColor}10`, color: markerColor, padding: '4px 12px', borderRadius: 30, fontSize: 11, fontWeight: 500 }}>
                            {w}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    const [selected, setSelected] = useState(null)
    const [filter, setFilter] = useState('all')
    const [modalGallery, setModalGallery] = useState({ images: [], index: 0 })
    const [hoveredLocation, setHoveredLocation] = useState(null)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapInfoPosition, setMapInfoPosition] = useState(null)

    // Фильтруем проекты, исключая офис
    const filteredProjects = useMemo(() => {
        const projects = filter === 'all'
            ? locations.filter(l => l.type !== 'office')
            : locations.filter(l => l.type === filter && l.type !== 'office')
        return projects
    }, [filter])

    // Разбиваем на две колонки: сначала все нечетные (0,2,4...), потом все четные (1,3,5...)
    const leftColumnProjects = useMemo(() => {
        return filteredProjects.filter((_, index) => index % 2 === 0)
    }, [filteredProjects])

    const rightColumnProjects = useMemo(() => {
        return filteredProjects.filter((_, index) => index % 2 === 1)
    }, [filteredProjects])

    // Для карты используем все локации (включая офис)
    const filteredForMap = useMemo(() =>
        filter === 'all' ? locations : locations.filter(l => l.type === filter),
        [filter]
    )

    const placemarkIconOptionsById = useMemo(() => {
        const m = {}
        for (const loc of filteredForMap) {
            const markerColor = typeInfo[loc.type]?.color || loc.color
            m[loc.id] = mapPlacemarkIconOptions(markerColor)
        }
        return m
    }, [filteredForMap])

    const handleImageClick = useCallback((images, index) => {
        setModalGallery({ images: images || [], index: index || 0 })
    }, [])
    const closeModalGallery = useCallback(() => setModalGallery({ images: [], index: 0 }), [])
    const showPrevModalImage = useCallback(() => {
        setModalGallery((prev) => {
            if (!prev.images || prev.images.length === 0) return prev
            const nextIndex = (prev.index - 1 + prev.images.length) % prev.images.length
            return { ...prev, index: nextIndex }
        })
    }, [])
    const showNextModalImage = useCallback(() => {
        setModalGallery((prev) => {
            if (!prev.images || prev.images.length === 0) return prev
            const nextIndex = (prev.index + 1) % prev.images.length
            return { ...prev, index: nextIndex }
        })
    }, [])
    const mapActiveLocation = hoveredLocation || selected

    const updateMapInfoPosition = useCallback(() => {
        if (!mapInstance || !mapActiveLocation) {
            setMapInfoPosition(null)
            return
        }

        try {
            const projection = mapInstance.options.get('projection')
            const globalPixels = projection.toGlobalPixels(
                [mapActiveLocation.lat, mapActiveLocation.lng],
                mapInstance.getZoom()
            )
            const pagePixels = mapInstance.converter.globalToPage(globalPixels)
            const mapRect = mapInstance.container.getParentElement().getBoundingClientRect()

            const cardWidth = 360
            const cardHeight = 165
            const offsetX = 14
            const offsetY = 16

            let left = pagePixels[0] - mapRect.left + offsetX
            let top = pagePixels[1] - mapRect.top - cardHeight - offsetY

            if (left + cardWidth > mapRect.width - 12) left = mapRect.width - cardWidth - 12
            if (left < 12) left = 12

            if (top < 12) top = pagePixels[1] - mapRect.top + offsetY
            if (top + cardHeight > mapRect.height - 12) top = mapRect.height - cardHeight - 12
            if (top < 12) top = 12

            setMapInfoPosition({ left, top })
        } catch {
            setMapInfoPosition({ left: 16, top: 16 })
        }
    }, [mapInstance, mapActiveLocation])

    useEffect(() => {
        updateMapInfoPosition()
    }, [updateMapInfoPosition])

    return (
        <div style={{ paddingTop: 72 }}>
            {modalGallery.images.length > 0 && (
                <ImageModal
                    images={modalGallery.images}
                    currentIndex={modalGallery.index}
                    onClose={closeModalGallery}
                    onPrev={showPrevModalImage}
                    onNext={showNextModalImage}
                />
            )}

            <section className="projects-header" style={{ background: 'linear-gradient(160deg, #f8fafc, #ffffff)', padding: '80px 0 40px' }}>
                <div className="container">
                    <div className="section-label">Наша работа</div>
                    <h1 className="section-title">Проекты и карта присутствия</h1>
                    <div className="accent-line" />
                    <p className="section-subtitle">Интерактивная карта месторождений и районов работ компании — от Кольского полуострова до Латинской Америки.</p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    {/* Фильтры */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
                        <button onClick={() => setFilter('all')} style={{
                            padding: '8px 20px',
                            borderRadius: 40,
                            border: '1px solid #cbd5e1',
                            fontSize: 13,
                            fontWeight: 500,
                            background: filter === 'all' ? '#e2e8f0' : 'white',
                            color: '#334155',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}>Все МПИ</button>
                        {Object.entries(typeInfo).filter(([k]) => k !== 'office').map(([key, info]) => (
                            <button key={key} onClick={() => setFilter(key)} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 20px',
                                borderRadius: 40,
                                border: `1px solid ${filter === key ? info.color : '#cbd5e1'}`,
                                fontSize: 13,
                                fontWeight: 500,
                                background: filter === key ? `${info.color}15` : 'white',
                                color: filter === key ? info.color : '#475569',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: info.color, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }} />
                                <span>{info.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Карта */}
                    <div
                        className="projects-map-shell"
                        style={{ height: 520, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 40, position: 'relative' }}
                        onMouseLeave={() => setHoveredLocation(null)}
                    >
                        {mapActiveLocation && mapInfoPosition && mapActiveLocation.type !== 'office' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: mapInfoPosition.top,
                                    left: mapInfoPosition.left,
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                    width: 'min(360px, calc(100% - 24px))',
                                    background: 'rgba(255,255,255,0.96)',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: 16,
                                    boxShadow: '0 18px 32px -16px rgba(15,23,42,0.45)',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{ height: 4, background: typeInfo[mapActiveLocation.type]?.color || mapActiveLocation.color }} />
                                <div style={{ padding: 14 }}>
                                    <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.35, color: '#0f172a', marginBottom: 6, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                                        {mapActiveLocation.name}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 10, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                                        {mapActiveLocation.region}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {mapActiveLocation.works?.map((method) => (
                                            <span key={method} style={{
                                                background: `${typeInfo[mapActiveLocation.type]?.color || mapActiveLocation.color}12`,
                                                color: typeInfo[mapActiveLocation.type]?.color || mapActiveLocation.color,
                                                border: `1px solid ${(typeInfo[mapActiveLocation.type]?.color || mapActiveLocation.color)}33`,
                                                padding: '4px 10px',
                                                borderRadius: 999,
                                                fontSize: 11,
                                                fontWeight: 600,
                                                lineHeight: 1.2,
                                                overflowWrap: 'anywhere',
                                                wordBreak: 'break-word',
                                            }}>
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <YMaps query={{ apikey: 'efa5101e-4f2c-4cb8-8d5d-9a76e045c6ec', lang: 'ru_RU' }}>
                            <Map
                                defaultState={{ center: [20, 20], zoom: 2 }}
                                width="100%"
                                height="100%"
                                options={{ minZoom: 2, maxZoom: 19 }}
                                instanceRef={setMapInstance}
                                onActionEnd={updateMapInfoPosition}
                            >
                                {filteredForMap.map(loc => (
                                    <Placemark
                                        key={loc.id}
                                        geometry={[loc.lat, loc.lng]}
                                        onMouseEnter={() => setHoveredLocation(loc)}
                                        onMouseLeave={() => setHoveredLocation(null)}
                                        onClick={() => setSelected(loc)}
                                        options={placemarkIconOptionsById[loc.id]}
                                    />
                                ))}
                            </Map>
                        </YMaps>
                    </div>

                    {/* Список объектов в две колонки */}
                    <div>
                        <h3 style={{ fontFamily: 'Russo One', fontSize: 22, marginBottom: 24 }}>Детали проектов</h3>
                        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                            {/* Левая колонка - нечетные элементы */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {leftColumnProjects.map(loc => {
                                    const markerColor = typeInfo[loc.type]?.color || loc.color
                                    return (
                                        <ProjectCard
                                            key={loc.id}
                                            loc={loc}
                                            markerColor={markerColor}
                                            onSelect={setSelected}
                                            isSelected={selected?.id === loc.id}
                                            onImageClick={handleImageClick}
                                        />
                                    )
                                })}
                            </div>
                            {/* Правая колонка - четные элементы */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {rightColumnProjects.map(loc => {
                                    const markerColor = typeInfo[loc.type]?.color || loc.color
                                    return (
                                        <ProjectCard
                                            key={loc.id}
                                            loc={loc}
                                            markerColor={markerColor}
                                            onSelect={setSelected}
                                            isSelected={selected?.id === loc.id}
                                            onImageClick={handleImageClick}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}