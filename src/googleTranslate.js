const SOURCE_LANG = 'ru'

function setGoogTransCookie(target) {
  // Google Translate reads this cookie to decide current language.
  // Set both path variants to maximize browser compatibility.
  const value = `/${SOURCE_LANG}/${target || SOURCE_LANG}`
  document.cookie = `googtrans=${value};path=/`
  document.cookie = `googtrans=${value};path=/;SameSite=Lax`
}

/** Drive hidden Google Translate widget; returns true if applied. */
export function applyTranslateLanguage(code) {
  const target = code === SOURCE_LANG ? '' : code
  const combo = document.querySelector('.goog-te-combo')
  // Always set cookie so Google knows desired language.
  try {
    if (typeof document !== 'undefined') setGoogTransCookie(target)
  } catch {
    // ignore
  }

  if (!combo) return false

  const options = Array.from(combo.options)
  const idx = options.findIndex(
    (o) => {
      if (o.value === target) return true
      const [from, to] = o.value.split('|')
      if (!target) {
        // "Original language" option is often empty or source-only.
        return o.value === '' || (from === SOURCE_LANG && !to)
      }
      // Google commonly stores options as "source|target", e.g. "ru|en".
      return to === target || from === target || o.value.endsWith(`|${target}`)
    }
  )
  if (idx >= 0) {
    combo.selectedIndex = idx
  } else {
    combo.value = target
  }

  combo.dispatchEvent(new Event('change', { bubbles: true }))
  combo.dispatchEvent(new Event('input', { bubbles: true }))
  return true
}

/**
 * Run callback once the Google combo exists (widget finished rendering).
 */
export function onTranslateReady(callback, { timeoutMs = 20000 } = {}) {
  if (typeof document === 'undefined') return () => {}

  if (document.querySelector('.goog-te-combo')) {
    queueMicrotask(callback)
    return () => {}
  }

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

  const onWin = () => finish()
  window.addEventListener('googleTranslateReady', onWin)

  const timer = setTimeout(cleanup, timeoutMs)

  function cleanup() {
    observer.disconnect()
    clearTimeout(timer)
    window.removeEventListener('googleTranslateReady', onWin)
  }

  return cleanup
}
