import SmoothScroll from 'smooth-scroll'

export const waitSec = time => new Promise(resolve => setTimeout(() => resolve(), time))

export const getUa = () => window.navigator.userAgent.toLowerCase()

export const getOS = () => {
  if (getUa().indexOf('windows nt') !== -1) {
    return 'windows'
  }

  if (getUa().indexOf('android') !== -1) {
    return 'android'
  }

  if (getUa().indexOf('iphone') !== -1 || getUa().indexOf('ipad') !== -1) {
    return 'ios'
  }

  if (getUa().indexOf('mac os x') !== -1) {
    return 'mac'
  }

  return 'unknown'
}

export const getBrowser = () => {
  if (getUa().indexOf('msie') !== -1 || getUa().indexOf('trident') !== -1) {
    return 'ie'
  }

  if (getUa().indexOf('edge') !== -1) {
    return 'edge'
  }

  if (getUa().indexOf('chrome') !== -1) {
    return 'chrome'
  }

  if (getUa().indexOf('safari') !== -1) {
    return 'safari'
  }

  if (getUa().indexOf('firefox') !== -1) {
    return 'firefox'
  }

  if (getUa().indexOf('opera') !== -1) {
    return 'opera'
  }

  return 'unknown'
}

export const isTouchDevice = () => window.ontouchstart === null

export const isIe = () => getBrowser() === 'ie'

export const getWindowWidth = () => window.innerWidth

export const getWindowHeight = () => window.innerHeight

export const getUrl = () => window.location.href

export const getAnchor = () => {
  const url = getUrl()
  const anchor = url.split('#')
  return url.indexOf('#') !== -1 ? anchor[anchor.length - 1] : 'none'
}

export const getScrollParamX = () => window.pageXOffset

export const getScrollParamY = () => window.pageYOffset

export const banScroll = () => {
  document.body.style.overflow = 'hidden'
}

export const permitScroll = () => {
  document.body.style.overflow = 'visible'
}

export const getElPosY = $el => $el.getBoundingClientRect().top + getScrollParamY()

export const removeTouchDevicesHover = () => {
  if (isTouchDevice()) {
    try {
      const shs = document.styleSheets

      for (const i in shs) {
        const sh = shs[i]

        if (!sh.rules) continue

        for (let j = sh.rules.length - 1; j >= 0; j--) {
          if (!sh.rules[j].selectorText) continue
          if (sh.rules[j].selectorText.match(':hover')) sh.deleteRule(j)
        }
      }
    } catch (err) {}
  }
}

export const secureAnchorElements = () => {
  const aElements = document.querySelectorAll('a')

  aElements.forEach($el => {
    if ($el.hasAttribute('target') === false || $el.getAttribute('target') !== '_blank') {
      return
    }

    $el.setAttribute('rel', 'noreferrer')
  })
}

export const enableScrollAnimation = (el = '#js-header', speed = 300) => {
  const options = {
    header: el,
    speed: speed,
    speedAsDuration: true,
    easing: 'Linear'
  }

  const myScroll = new SmoothScroll('a[href*="#"]', options) // eslint-disable-line

  if (getAnchor() !== 'none') {
    window.onload = function () {
      myScroll.animateScroll(document.querySelector('#' + getAnchor()))
    }
  }
}

export const slideUp = ($el, duration = 300) => {
  $el.style.height = $el.offsetHeight + 'px'
  $el.offsetHeight // eslint-disable-line
  $el.style.transitionProperty = 'height, margin, padding'
  $el.style.transitionDuration = duration + 'ms'
  $el.style.transitionTimingFunction = 'ease'
  $el.style.overflow = 'hidden'
  $el.style.height = 0
  $el.style.paddingTop = 0
  $el.style.paddingBottom = 0
  $el.style.marginTop = 0
  $el.style.marginBottom = 0

  setTimeout(() => {
    $el.style.display = 'none'
    $el.style.removeProperty('height')
    $el.style.removeProperty('padding-top')
    $el.style.removeProperty('padding-bottom')
    $el.style.removeProperty('margin-top')
    $el.style.removeProperty('margin-bottom')
    $el.style.removeProperty('overflow')
    $el.style.removeProperty('transition-duration')
    $el.style.removeProperty('transition-property')
    $el.style.removeProperty('transition-timing-function')
  }, duration)
}

export const slideDown = ($el, duration = 300) => {
  $el.style.removeProperty('display')
  let display = window.getComputedStyle($el).display

  if (display === 'none') display = 'block'

  $el.style.display = display
  const height = $el.offsetHeight
  $el.style.overflow = 'hidden'
  $el.style.height = 0
  $el.style.paddingTop = 0
  $el.style.paddingBottom = 0
  $el.style.marginTop = 0
  $el.style.marginBottom = 0
  $el.offsetHeight // eslint-disable-line
  $el.style.transitionProperty = 'height, margin, padding'
  $el.style.transitionDuration = duration + 'ms'
  $el.style.transitionTimingFunction = 'ease'
  $el.style.height = height + 'px'
  $el.style.removeProperty('padding-top')
  $el.style.removeProperty('padding-bottom')
  $el.style.removeProperty('margin-top')
  $el.style.removeProperty('margin-bottom')

  setTimeout(() => {
    $el.style.removeProperty('height')
    $el.style.removeProperty('overflow')
    $el.style.removeProperty('transition-duration')
    $el.style.removeProperty('transition-property')
    $el.style.removeProperty('transition-timing-function')
  }, duration)
}

export const slideToggle = ($el, duration = 300) => {
  if (window.getComputedStyle($el).display === 'none') {
    return slideDown($el, duration)
  } else {
    return slideUp($el, duration)
  }
}
