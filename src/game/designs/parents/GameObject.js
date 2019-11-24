import createUID from '@common/js/createUID'


class GameObject {

  constructor() {

    this.id = null
    this.name = null
    this.status = {}

  }

  from(obj) {

    let {
      id,
      name,
      status,
    } = obj

    this.id = id
    this.name = name

    for (let i in status) {
      this.extendProperties(i, status[i])
    }

  }

  buildToRenderer(name, lve) {

  }

  buildToWorld(name) {

  }

  /**
   * 
   * @param {String} p  Property name
   * @param {Object} obj  Default Value
   */
  extendProperties(p, obj) {

    if (!this.status.hasOwnProperty(p)) {
      this.status[p] = {}
    }

    this.status[p] = {
      ...this.status[p],
      ...obj
    }

  }

}


export default GameObject