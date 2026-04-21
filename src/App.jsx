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
    initGoogleTranslate()

    const hideTranslateBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame')
      if (banner) {
        banner.style.display = 'none'
        banner.style.visibility = 'hidden'
      }
      document.body.style.top = '0px'
      document.body.style.marginTop = '0px'
      document.documentElement.style.marginTop = '0px'
    }

    hideTranslateBanner()
    const intervalId = window.setInterval(hideTranslateBanner, 500)

    // Очищаем URL от googtrans хеша
    if (window.location.hash && window.location.hash.includes('googtrans')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const basename = getBasename()

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <PathRestorer />
      <div
        id="google_translate_element"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
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