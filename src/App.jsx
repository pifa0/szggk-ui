import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  useEffect(() => {
    // React StrictMode runs effects twice in dev; guard against duplicate injection.
    if (document.getElementById('google-translate-script')) return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return
      const { TranslateElement } = window.google.translate
      const opts = {
        pageLanguage: 'ru',
        autoDisplay: false,
        includedLanguages: 'en,fr,pt,de,es,zh-CN',
      }
      if (TranslateElement.InlineLayout?.SIMPLE != null) {
        opts.layout = TranslateElement.InlineLayout.SIMPLE
      }
      new TranslateElement(opts, 'google_translate_element')
      // Widget renders the combo asynchronously; notify listeners when it appears.
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

    return () => {
      // Do not delete callback in dev StrictMode; Google script may call it later.
    }
  }, [])

  return (
    <BrowserRouter>
      <div id="google_translate_element" />
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
