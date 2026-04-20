const SOURCE_LANG = 'ru'

function setGoogTransCookie(target) {
  const value = `/${SOURCE_LANG}/${target || SOURCE_LANG}`

  // Определяем правильный путь для куки
  const isGitHubPages = window.location.hostname.includes('github.io')
  const cookiePath = isGitHubPages ? '/szggk-ui' : '/'

  // Устанавливаем куки с правильным путем
  document.cookie = `googtrans=${value};path=${cookiePath};SameSite=Lax`

  // Также устанавливаем для корневого пути на всякий случай
  if (isGitHubPages) {
    document.cookie = `googtrans=${value};path=/;SameSite=Lax`
  }
}

/** Drive hidden Google Translate widget; returns true if applied. */
export function applyTranslateLanguage(code) {
  const target = code === SOURCE_LANG ? '' : code

  // Пытаемся найти выпадающий список Google Translate
  let combo = document.querySelector('.goog-te-combo')

  // Если не нашли, пробуем найти в iframe (для GitHub Pages)
  if (!combo) {
    const iframe = document.querySelector('.goog-te-menu-frame')
    if (iframe && iframe.contentDocument) {
      combo = iframe.contentDocument.querySelector('.goog-te-combo')
    }
  }

  // Если все еще не нашли, пробуем альтернативные селекторы
  if (!combo) {
    combo = document.querySelector('select.goog-te-combo')
  }

  // Всегда устанавливаем cookie
  try {
    if (typeof document !== 'undefined') {
      setGoogTransCookie(target)
    }
  } catch (e) {
    console.warn('Cookie error:', e)
  }

  if (!combo) {
    console.warn('Google Translate combo not found, reloading page...')
    // На GitHub Pages иногда нужно перезагрузить страницу
    if (window.location.hostname.includes('github.io')) {
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
    return false
  }

  // Перебираем опции и выбираем нужный язык
  const options = Array.from(combo.options)
  let foundIndex = -1

  for (let i = 0; i < options.length; i++) {
    const opt = options[i]
    if (!target && (opt.value === '' || opt.value === SOURCE_LANG)) {
      foundIndex = i
      break
    }
    if (opt.value === target || opt.value === `${SOURCE_LANG}|${target}`) {
      foundIndex = i
      break
    }
    if (opt.value.endsWith(`|${target}`)) {
      foundIndex = i
      break
    }
  }

  if (foundIndex >= 0) {
    combo.selectedIndex = foundIndex
  } else if (target) {
    combo.value = target
  }

  // Триггерим событие изменения
  combo.dispatchEvent(new Event('change', { bubbles: true }))
  combo.dispatchEvent(new Event('input', { bubbles: true }))

  // Скрываем плашку после смены языка
  setTimeout(() => {
    const banner = document.querySelector('.goog-te-banner-frame')
    if (banner) {
      banner.style.display = 'none'
    }
    document.body.style.top = '0px'
  }, 100)

  return true
}

/**
 * Run callback once the Google combo exists (widget finished rendering).
 */
export function onTranslateReady(callback, { timeoutMs = 20000 } = {}) {
  if (typeof document === 'undefined') return () => {}

  const checkCombo = () => {
    // Проверяем combo в основном документе
    let combo = document.querySelector('.goog-te-combo')

    // Если не нашли, проверяем в iframe
    if (!combo) {
      const iframe = document.querySelector('.goog-te-menu-frame')
      if (iframe && iframe.contentDocument) {
        combo = iframe.contentDocument.querySelector('.goog-te-combo')
      }
    }

    if (combo) {
      callback()
      return true
    }
    return false
  }

  if (checkCombo()) return () => {}

  let finished = false
  const finish = () => {
    if (finished) return
    if (!document.querySelector('.goog-te-combo')) return
    finished = true
    cleanup()
    callback()
  }

  const observer = new MutationObserver(finish)
  observer.observe(document.body, { childList: true, subtree: true })

  const timer = setTimeout(cleanup, timeoutMs)

  function cleanup() {
    observer.disconnect()
    clearTimeout(timer)
  }

  return cleanup
}