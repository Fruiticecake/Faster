import {
  removeTouchDevicesHover,
  secureAnchorElements,
  enableScrollAnimation
} from '../utils'

removeTouchDevicesHover()

secureAnchorElements()

enableScrollAnimation('#js-header', 300)

/**
 * hm
 */
const $hm = document.getElementById('hm')
$hm.addEventListener('click', (e) => e.currentTarget.classList.toggle('hm--open'))
