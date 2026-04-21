const SOURCE_LANG = 'ru'
const STORAGE_KEY = 'site-language'
const MANUAL_RELOAD_KEY = 'gt-manual-reload'

function getCookieValue(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

function getCookieSecurityAttrs() {
  return window.location.protocol === 'https:' ? '; Secure; SameSite=None' : '; SameSite=Lax'
}

function getCookieDomains() {
  const host = window.location.hostname
  const domains = new Set([''])

  // Для прод-хостинга пробуем и текущий домен, и его parent-домен.
  if (host && !/^\d+\.\d+\.\d+\.\d+$/.test(host) && host !== 'localhost') {
    domains.add(host)
    const parts = host.split('.')
    if (parts.length > 2) {
      domains.add(`.${parts.slice(-2).join('.')}`)
    }
  }

  return Array.from(domains)
}

function getLangFromGoogtrans(value) {
  if (!value) return ''
  const parts = value.split('/')
  return parts[2] || ''
}

// Для хостинга в подпапке выставляем cookie сразу на нескольких путях.
function getCookiePaths() {
  const paths = new Set(['/'])
  const pathname = window.location.pathname || '/'
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0) {
    paths.add(`/${segments[0]}`)
  }

  return Array.from(paths)
}

export function getSavedLanguage() {
  if (typeof window === 'undefined') return SOURCE_LANG
  const cookieLang = getLangFromGoogtrans(getCookieValue('googtrans'))
  if (cookieLang) return cookieLang
  return localStorage.getItem(STORAGE_KEY) || SOURCE_LANG
}

export function saveLanguage(targetLang) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, targetLang || SOURCE_LANG)
}

// Установка куки для перевода
export function setTranslateCookie(targetLang) {
  const target = targetLang || SOURCE_LANG
  const value = `/${SOURCE_LANG}/${target}`
  const paths = getCookiePaths()
  const domains = getCookieDomains()
  const securityAttrs = getCookieSecurityAttrs()

  paths.forEach((path) => {
    domains.forEach((domain) => {
      const domainAttr = domain ? `; domain=${domain}` : ''
      document.cookie = `googtrans=${value}; path=${path}${domainAttr}; max-age=31536000${securityAttrs}`
    })
  })

  console.log('🍪 Cookie set:', value)
}

function clearTranslateCookie() {
  const paths = getCookiePaths()
  const domains = getCookieDomains()
  const securityAttrs = getCookieSecurityAttrs()
  paths.forEach((path) => {
    domains.forEach((domain) => {
      const domainAttr = domain ? `; domain=${domain}` : ''
      document.cookie = `googtrans=; path=${path}${domainAttr}; expires=Thu, 01 Jan 1970 00:00:00 GMT${securityAttrs}`
    })
  })
}

function clearTranslateState() {
  clearTranslateCookie()
  localStorage.removeItem('googtrans')
  sessionStorage.removeItem('googtrans')
}

function applyTranslateCombo(targetLang) {
  const combo = document.querySelector('.goog-te-combo')
  if (!combo) {
    console.warn('⚠️ Google combo not found yet')
    return false
  }

  const nextLang = targetLang || SOURCE_LANG
  const options = Array.from(combo.options || [])
  const nextIndex = options.findIndex((opt) => opt.value === nextLang)

  if (nextIndex >= 0) {
    combo.selectedIndex = nextIndex
  }
  combo.value = nextLang

  combo.dispatchEvent(new Event('input', { bubbles: true }))
  combo.dispatchEvent(new Event('change', { bubbles: true }))
  const legacyChange = document.createEvent('HTMLEvents')
  legacyChange.initEvent('change', true, true)
  combo.dispatchEvent(legacyChange)

  console.log('🌐 Combo language applied:', nextLang)
  return true
}

function waitForTranslateCombo(timeoutMs = 1200, intervalMs = 60) {
  return new Promise((resolve) => {
    const startedAt = Date.now()
    const tick = () => {
      const combo = document.querySelector('.goog-te-combo')
      if (combo) {
        resolve(combo)
        return
      }
      if (Date.now() - startedAt >= timeoutMs) {
        resolve(null)
        return
      }
      setTimeout(tick, intervalMs)
    }
    tick()
  })
}

export function applyLanguage(targetLang, options = {}) {
  const { reloadFallback = false, forceReloadOnSource = false, forceReload = false } = options
  const nextLang = targetLang || SOURCE_LANG
  saveLanguage(nextLang)
  if (nextLang === SOURCE_LANG) {
    clearTranslateState()
    if (window.location.hash.includes('googtrans')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    if (forceReloadOnSource) {
      window.location.reload()
      return Promise.resolve()
    }
  } else {
    setTranslateCookie(nextLang)
  }

  if (forceReload) {
    setTimeout(() => window.location.reload(), 80)
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const finish = () => {
      if (nextLang === SOURCE_LANG && window.location.hash.includes('googtrans')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      resolve()
    }

    if (applyTranslateCombo(nextLang)) {
      sessionStorage.removeItem(MANUAL_RELOAD_KEY)
      if (nextLang === SOURCE_LANG && forceReloadOnSource) {
        window.location.reload()
        return
      }
      finish()
      return
    }

    const onReady = async () => {
      const combo = await waitForTranslateCombo(1200, 60)
      if (combo) {
        combo.value = nextLang
        combo.dispatchEvent(new Event('change', { bubbles: true }))
        sessionStorage.removeItem(MANUAL_RELOAD_KEY)
        if (nextLang === SOURCE_LANG && forceReloadOnSource) {
          window.location.reload()
          return
        }
      }
      window.removeEventListener('googleTranslateReady', onReady)
      finish()
    }

    window.addEventListener('googleTranslateReady', onReady)
    setTimeout(() => {
      window.removeEventListener('googleTranslateReady', onReady)
      if (reloadFallback && nextLang !== SOURCE_LANG && !document.querySelector('.goog-te-combo')) {
        const lastReloadLang = sessionStorage.getItem(MANUAL_RELOAD_KEY)
        if (lastReloadLang !== nextLang) {
          sessionStorage.setItem(MANUAL_RELOAD_KEY, nextLang)
          window.location.reload()
          return
        }
        // Защита от циклов: если уже перезагружали для этого языка, второй раз не перезагружаем.
        sessionStorage.removeItem(MANUAL_RELOAD_KEY)
      }
      finish()
    }, 1400)
  })
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
        autoDisplay: false
      },
      'google_translate_element'
    )

    window.dispatchEvent(new CustomEvent('googleTranslateReady'))
    const initialLang = getSavedLanguage()
    applyLanguage(initialLang)
  }

  const script = document.createElement('script')
  script.id = 'google-translate-script'
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
}