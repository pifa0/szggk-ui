const SOURCE_LANG = 'ru'

// Определяем базовый путь приложения
function getBasePath() {
  const path = window.location.pathname
  if (path.includes('/szggk-ui/')) {
    return '/szggk-ui'
  }
  return ''
}

// Установка куки для перевода
export function setTranslateCookie(targetLang) {
  const target = targetLang || SOURCE_LANG
  const value = `/${SOURCE_LANG}/${target}`
  const basePath = getBasePath()

  // Устанавливаем куки
  document.cookie = `googtrans=${value}; path=/; max-age=86400; SameSite=Lax`
  if (basePath) {
    document.cookie = `googtrans=${value}; path=${basePath}; max-age=86400; SameSite=Lax`
  }

  console.log('🍪 Cookie set:', value)
}

// Инициализация Google Translate
export function initGoogleTranslate() {
  if (typeof window === 'undefined') return
  if (document.getElementById('google-translate-script')) return

  console.log('🌐 Init Google Translate')

  window.googleTranslateElementInit = () => {
    console.log('🌐 Google Translate callback')

    if (!window.google?.translate?.TranslateElement) {
      console.warn('⚠️ Google Translate API not loaded')
      return
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: SOURCE_LANG,
        includedLanguages: 'en,fr,pt,de,es,zh-CN',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: true  // Включаем автоотображение
      },
      'google_translate_element'
    )

    // Скрываем баннер
    const hideBanner = () => {
      const style = document.createElement('style')
      style.id = 'gt-hide-style'
      style.textContent = `
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { color: transparent !important; }
        .goog-te-gadget .goog-te-combo { color: #000 !important; }
        #google_translate_element { display: none; }
      `
      if (!document.getElementById('gt-hide-style')) {
        document.head.appendChild(style)
      }
      document.body.style.top = '0px'
    }

    setTimeout(hideBanner, 100)
    setTimeout(hideBanner, 500)
    setTimeout(hideBanner, 1000)

    window.dispatchEvent(new CustomEvent('googleTranslateReady'))
  }

  const script = document.createElement('script')
  script.id = 'google-translate-script'
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
}