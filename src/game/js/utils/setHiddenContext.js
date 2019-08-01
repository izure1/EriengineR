/**
 * 
 * @param {String} p property name
 * @param {*} v value
 * @param {Object} o option
 */
export default function setHiddenContext(p, v, o = {}) {

  let r

  r = {}
  r.get = function () {
    return v
  }

  Object.assign(r, o)
  Object.defineProperty(this, p, r)

}