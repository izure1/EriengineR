import shortcut from '../js/shortcut'


export default function (e, p) {

  let k = e.keyCode

  if (k in shortcut) {
    shortcut[k].call(this, p)
  }

}