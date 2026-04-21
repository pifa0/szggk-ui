import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Equipment from './pages/Equipment'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Contacts from './pages/Contacts'
import Gallery from './pages/Gallery'
import { initGoogleTranslate } from './googleTranslate'

// Компонент для прокрутки страницы вверх
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Компонент для восстановления пути после редиректа с 404
function PathRestorer() {
  const navigate = useNavigate()
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      setTimeout(() => navigate(redirectPath, { replace: true }), 50)
    }
  }, [navigate])
  return null
}

// Определяем базовый путь
const getBasename = () => {
  if (window.location.hostname.includes('github.io')) return '/szggk-ui'
  if (window.location.pathname.includes('/szggk-ui')) return '/szggk-ui'
  return ''
}

export default function App() {
  useEffect(() => {
    // Инициализируем Google Translate
    initGoogleTranslate()

    // Агрессивное скрытие всех элементов Google Translate
    const hideGoogleElements = () => {
      // Добавляем глобальные стили
      const style = document.createElement('style')
      style.id = 'gt-hide-style'
      style.textContent = `
        /* Скрываем баннер */
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip:hover,
        .goog-text-highlight {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          position: absolute !important;
          top: -1000px !important;
        }

        /* Убираем отступ сверху, который добавляет Google Translate */
        body {
          top: 0 !important;
          position: relative !important;
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        /* Скрываем логотип Google */
        .goog-logo-link,
        .goog-te-gadget span,
        .goog-te-gadget div:first-child {
          display: none !important;
          visibility: hidden !important;
        }

        /* Делаем прозрачным контейнер */
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
          line-height: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }

        /* Возвращаем цвет для select */
        .goog-te-gadget .goog-te-combo {
          color: #000 !important;
          font-size: 12px !important;
          line-height: normal !important;
          height: auto !important;
          overflow: visible !important;
        }

        /* Скрываем все iframe Google */
        iframe[src*="translate.google.com"],
        iframe[id*="google"],
        iframe[src*="translate.googleapis.com"] {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
        }

        /* Скрываем плашку skiptranslate */
        .skiptranslate {
          display: none !important;
          height: 0 !important;
          overflow: hidden !important;
        }

        /* Убираем отступ у html */
        html {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `

      if (!document.getElementById('gt-hide-style')) {
        document.head.appendChild(style)
      }

      // Принудительно скрываем элементы через DOM
      const elementsToHide = [
        '.goog-te-banner-frame',
        'iframe.goog-te-banner-frame',
        '#goog-gt-tt',
        '.goog-te-balloon-frame',
        '.goog-tooltip',
        '.skiptranslate'
      ]

      elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          if (el) {
            el.style.display = 'none'
            el.style.visibility = 'hidden'
            el.style.height = '0'
            el.style.width = '0'
            el.style.position = 'absolute'
            el.style.top = '-1000px'
          }
        })
      })

      // Сбрасываем top у body
      document.body.style.top = '0px'
      document.body.style.marginTop = '0px'
      document.body.style.paddingTop = '0px'
      document.documentElement.style.marginTop = '0px'
    }

    // Вызываем сразу
    hideGoogleElements()

    // И многократно с задержками
    const delays = [10, 50, 100, 200, 500, 1000, 2000, 3000, 5000]
    delays.forEach(delay => {
      setTimeout(hideGoogleElements, delay)
    })

    // Наблюдатель за изменениями DOM
    const observer = new MutationObserver(() => {
      hideGoogleElements()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // Очищаем URL от googtrans хеша
    if (window.location.hash && window.location.hash.includes('googtrans')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const basename = getBasename()

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <PathRestorer />
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: '-1000px' }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/team" element={<Team />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}