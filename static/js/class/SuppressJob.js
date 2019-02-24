'use strict'

class SuppressJob {

  constructor() {
    this.list = {}
  }

  static setTimeout(fn, delay) {

    return setTimeout(() => {
      fn()
    }, delay)

  }

  isDoing(id) {
    return !!this.list[id]
  }

  setSuppress(id, complete, delay = 0, count = -1) {

    let t

    t = this.list[id]

    if (t) {

      clearTimeout(t.to)

      if (--t.count !== 0) {
        t.to = SuppressJob.setTimeout(t.fn, t.delay)
        return
      }

      t.fn()
      this.clearSuppress(t.id)

    } else {

      t = {
        to: null,
        fn: null,
        count: count
      }

      t.fn = () => {
        complete()
        delete this.list[id]
      }

      t.delay = delay
      t.to = SuppressJob.setTimeout(t.fn, t.delay)

      this.list[id] = t

    }

  }

  clearSuppress(id) {

    if (!this.list[id]) {
      return
    }

    clearTimeout(this.list[id].to)
    delete this.list[id]

  }

  immediately(id) {

    let t

    t = this.list[id]

    if (!t) {
      return
    }

    this.list[id].fn()
    this.clearSuppress(id)

  }

}

export default SuppressJob