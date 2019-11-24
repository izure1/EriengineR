/**
 * 
 * @param {String} e Easing type
 * @param {Number} t Current time
 * @param {Number} b Beginning value
 * @param {Number} c Change in value
 * @param {Number} d Duration
 */
export default function easing(e, t, b, c, d) {

  let a, p, s

  a = 0
  p = 0
  s = 0

  switch (e) {
    case 'linear': {
      return c * t / d + b
    }
    case 'easeInQuad': {
      t /= d
      return c * t * t + b
    }
    case 'easeOutQuad': {
      t /= d
      return -c * t * (t - 2) + b
    }
    case 'easeInOutQuad': {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }
    case 'easeInCubic': {
      t /= d
      return c * t * t * t + b
    }
    case 'easeOutCubic': {
      t /= d
      t--
      return c * (t * t * t + 1) + b
    }
    case 'easeInOutCubic': {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t + 2) + b
    }
    case 'easeInSine': {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    }
    case 'easeOutSine': {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    }
    case 'easeInQuart': {
      t /= d
      return c * t * t * t * t + b
    }
    case 'easeOutQuart': {
      t /= d
      t--
      return -c * (t * t * t * t - 1) + b
    }
    case 'easeInOutQuart': {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t * t + b
      t -= 2
      return -c / 2 * (t * t * t * t - 2) + b
    }
    case 'easeInQuint': {
      t /= d
      return c * t * t * t * t * t + b
    }
    case 'easeOutQuint': {
      t /= d
      t--
      return c * (t * t * t * t * t + 1) + b
    }
    case 'easeInOutQuint': {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t * t * t + 2) + b
    }
    case 'easeInSine': {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    }
    case 'easeOutSine': {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    }
    case 'easeInOutSine': {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    }
    case 'easeInExpo': {
      return c * Math.pow(2, 10 * (t / d - 1)) + b
    }
    case 'easeOutExpo': {
      return c * (-Math.pow(2, -10 * t / d) + 1) + b
    }
    case 'easeInOutExpo': {
      t /= d / 2
      if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      t--
      return c / 2 * (-Math.pow(2, -10 * t) + 2) + b
    }
    case 'easeInCirc': {
      t /= d
      return -c * (Math.sqrt(1 - t * t) - 1) + b
    }
    case 'easeOutCirc': {
      t /= d
      t--
      return c * Math.sqrt(1 - t * t) + b
    }
    case 'easeInOutCirc': {
      t /= d / 2
      if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      t -= 2
      return c / 2 * (Math.sqrt(1 - t * t) + 1) + b
    }
    case 'easeInElastic': {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * .3
      if (!a || a < Math.abs(c)) {
        a = c
        s = p / 4
      } else s = p / (2 * Math.PI) * Math.asin(c / a)
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    }
    case 'easeOutElastic': {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * .3
      if (!a || a < Math.abs(c)) {
        a = c
        s = p / 4
      } else s = p / (2 * Math.PI) * Math.asin(c / a)
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b)
    }
    case 'easeInOutElastic': {
      if (t == 0) return b
      if ((t /= d / 2) == 2) return b + c
      if (!p) p = d * (.3 * 1.5)
      if (!a || a < Math.abs(c)) {
        a = c
        s = p / 4
      } else s = p / (2 * Math.PI) * Math.asin(c / a)
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
    }
    case 'easeInBack': {
      if (!s) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    }
    case 'easeOutBack': {
      if (!s) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    }
    case 'easeInOutBack': {
      if (!s) s = 1.70158
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    }
    case 'easeInBounce': {
      return c - ((t, b, c, d) => {
        if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b
        else if (t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
        else if (t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
        else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
      })(d - t, 0, c, d) + b
    }
    case 'easeOutBounce': {
      if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b
      else if (t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
      else if (t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
      else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
    }
    case 'easeInOutBounce': {
      if (t < d / 2) return ((t, b, c, d) => {
        if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b
        else if (t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
        else if (t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
        else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
      })(t * 2, b, c / 2, d)
      return ((t, b, c, d) => {
        return c - ((t, b, c, d) => {
          if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b
          else if (t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
          else if (t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
          else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
        })(d - t, 0, c, b) + b
      })((t * 2) - d, b + c / 2, c / 2, d)
    }
  }

}