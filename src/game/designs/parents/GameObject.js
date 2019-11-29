import createUID from '@common/js/createUID'


class GameObject {

  constructor() {

    this.id = null
    this.name = null
    this.component = {}

  }

  from(obj) {

    let {
      id,
      name,
      component,
    } = obj

    this.id = id
    this.name = name

    for (let i in component) {
      this.extendProperties(i, component[i])
    }

  }

  getComponent(property) {

    if (this.component.hasOwnProperty(property)) {
      return this.component[property]
    }

    return null
    
  }

  buildToRenderer(name, lve) {}

  buildToWorld(name) {}

  /**
   * 
   * @param {String} p  Property name
   * @param {Object} obj  Default Value
   */
  extendProperties(p, obj) {

    if (!this.component.hasOwnProperty(p)) {
      this.component[p] = {}
    }

    this.component[p] = {
      ...this.component[p],
      ...obj
    }

  }

}


export default GameObject