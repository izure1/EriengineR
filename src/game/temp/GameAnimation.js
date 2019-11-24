import easing from '../utils/easing'


class GameAnimation {

  /**
   * 
   * @param {Number} start 
   * @param {Number} end 
   * @param {Number} duration 
   * @param {String} easing
   * @param {Number} runtime
   */
  constructor(start = 0, end = 0, duration = 0, easing = 'linear', runtime = 0) {

    this.start = start
    this.end = end
    this.duration = duration
    this.easing = easing
    this.runtime = runtime
    this.done = false

    this.updateDone()

  }

  get value() {

    return this.done ? this.end : easing(this.easing, this.runtime, this.start, this.end - this.start, this.duration)

  }

  updateDone() {

    if (this.runtime < this.duration) {
      return
    }

    this.runtime = this.duration
    this.done = true

  }

  update(tt = 0) {

    this.runtime += tt
    this.updateDone()

    return this.value

  }

  getValue() {
    return this.value
  }

}


export default GameAnimation