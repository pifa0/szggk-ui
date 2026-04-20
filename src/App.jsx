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
  const location = useLocation()

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      // Небольшая задержка для корректной работы роутера
      setTimeout(() => {
        navigate(redirectPath, { replace: true })
      }, 50)
    }
  }, [navigate])

  return null
}

// Определяем базовый путь
const getBasename = () => {
  const isGitHubPages = window.location.hostname.includes('github.io')

  if (isGitHubPages) {
    return '/szggk-ui'
  }

  if (window.location.pathname.startsWith('/szggk-ui')) {
    return '/szggk-ui'
  }

  return ''
}

export default function App() {
  useEffect(() => {
    // Функция для принудительного удаления плашки
    const removeGoogleBanner = () => {
      const banners = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame, .skiptranslate')
      banners.forEach(banner => {
        if (banner && banner.remove) {
          banner.remove()
        }
        if (banner && banner.style) {
          banner.style.display = 'none'
          banner.style.height = '0'
          banner.style.visibility = 'hidden'
        }
      })

      document.body.style.top = '0px'
      document.body.style.position = 'relative'
      document.body.style.marginTop = '0px'
      document.documentElement.style.marginTop = '0px'
    }

    // Защита от дублирования
    if (document.getElementById('google-translate-script')) return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return

      const { TranslateElement } = window.google.translate
      const opts = {
        pageLanguage: 'ru',
        autoDisplay: false,
        includedLanguages: 'en,fr,pt,de,es,zh-CN',
        layout: TranslateElement.InlineLayout.SIMPLE
      }

      new TranslateElement(opts, 'google_translate_element')

      // Многократные попытки удалить плашку
      const delays = [10, 50, 100, 500, 1000, 2000]
      delays.forEach(delay => setTimeout(removeGoogleBanner, delay))

      // Оповещаем о готовности
      let frames = 0
      const notify = () => {
        if (document.querySelector('.goog-te-combo')) {
          window.dispatchEvent(new CustomEvent('googleTranslateReady'))
          return
        }
        frames += 1
        if (frames < 180) requestAnimationFrame(notify)
      }
      requestAnimationFrame(notify)
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    // Наблюдатель за DOM
    const observer = new MutationObserver(() => {
      removeGoogleBanner()
    })
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })

    // Обработка хэша для восстановления страницы
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && hash.includes('googtrans')) {
        // Удаляем параметры Google Translate из URL
        const cleanUrl = window.location.pathname + window.location.search
        window.history.replaceState(null, '', cleanUrl)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const basename = getBasename()

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <PathRestorer />
      <div id="google_translate_element" style={{ display: 'none' }} />
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