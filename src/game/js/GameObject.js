import setHiddenContext from './utils/setHiddenContext'

import GameAnimation from './GameAnimation'
import GameEvent from './GameEvent'

import DefaultAttribute from './vars/DEFAULT_ATTRIBUTE'
import DefaultDataset from './vars/DEFAULT_DATASET'


class GameObject {

  constructor() {

    this.initProperties()
    this.initAnimProperties()

  }

  get animations() {
    
    let anims = []

    for (let p in this._anim) {

      for (let q in this._anim[p]) {
        anims.push(this._anim[p][q])
      }

    }

    return anims

  }

  initAnimProperties() {

    for (let p in this.status) {

      if (p in this._anim) {
        continue
      }

      this._anim[p] = {}

    }

  }

  initProperties() {

    this.status = {

      attribute: new DefaultAttribute,
      dataset: new DefaultDataset

    }


    this._anim = {}
    this._listener = {}

  }

  /**
   * 
   * @param {String} p  Property name
   * @param {Object} obj  Default Value
   */
  extendProperties(p, obj) {

    this.status[p] = obj
    this.initAnimProperties()

  }

  /**
   * 
   * @param {String} target  Target attribute name
   * @param {String} property  Target property name
   * @param {Number} end  The end value
   * @param {Number} duration
   * @param {String} easing  Easing type. "linear" default
   * @param {Number} runtime Progress runtime
   */
  animate(target, property, end, duration, easing, runtime) {

    this._anim[target][property] = new GameAnimation(this._anim[target][property], end, duration, easing, runtime)

  }


  /**
   * 
   * @param {Number} tt Interval time
   */
  update(tt = 0) {

    for (let anim of this.animations) {
      anim.update(tt)
    }

  }


  /**
   * 
   * @param {String} p  Event type
   * @param {Function} cb  Callback function
   */
  on(p, cb) {

    if (!(p in this._listener)) {
      this._listener[p] = []
    }

    this._listener[p].push(cb)

  }


  /**
   * 
   * @param {String} p  Event type
   * @param {Object} e  Event detail information
   */
  emit(p, e) {

    if (!(p in this._listener)) {
      return
    }

    for (let cb of this._listener[p]) {
      cb.call(this, new GameEvent(this, p, e))
    }

  }

}


export default GameObject