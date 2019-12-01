import createUID from '@common/js/createUID'
import ValueManager from '../../manager/ValueManager'


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

  getComponentNames() {
    return Object.keys(this.component)
  }

  hasComponent(componentName) {
    return this.getComponentNames().indexOf(componentName) !== -1
  }

  getComponent(componentName) {
    if (!this.hasComponent(componentName)) throw `the '${componentName}' component is not exists.`
    return this.component[componentName]
  }

  hasProperty(componentName, property) {

    if (!this.hasComponent(componentName)) return false

    let component = this.getComponent(componentName)
    if (!component) return false

    return component.hasOwnProperty(property)

  }

  getValue(componentName, property) {
    if (
      this.hasComponent(componentName) &&
      this.hasProperty(componentName, property)
    ) return this.getComponent(componentName)[property]
  }

  getParsedValue(componentName, property) {

    if (!this.hasComponent('dataset')) return null


    let dataset = this.getComponent('dataset')
    let vm = new ValueManager
    for (let p in dataset) vm.dataset[p] = dataset[p]


    this.getComponentNames().forEach(componentName => {
      if (componentName === 'dataset') return
      for (let p in this.getComponent(componentName)) {
        vm.property[`${componentName}.${p}`] = this.getValue(componentName, p)
      }
    })


    return vm.property[`${componentName}.${property}`]

  }

  getParsedComponent(componentName) {

    if (!this.hasComponent(componentName)) return {}
    
    let component = {}
    for (let p in this.getComponent(componentName)) {
      component[p] = this.getParsedValue(componentName, p)
    }

    return component

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