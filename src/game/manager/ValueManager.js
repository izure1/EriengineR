class ValueManager {

  static parse(value, dataset) {

    if (typeof value === 'string') {

      let reg = /{{2}(?!\{)\s*(.*?)\s*\}{2}/

      if (!reg.test(value)) {
        return value
      }

      value = value.replace(/{{2}(?!\{)\s*(.*?)\s*\}{2}/gmi, (match, x) => {
        return dataset[x]
      })

    }

    return isNaN(value - 0) ? value : value - 0

  }

  constructor() {

    this.__props = new Map
    this.__datas = new Map

    this.property = null
    this.dataset = null

    this.initDataset()
    this.initProperty()

  }

  initProperty() {

    const dataset = this.dataset
    this.property = new Proxy(this.__props, {

      set(target, property, value) {
        target.set(property, value)
        return true
      },

      get(target, property) {
        return target.has(property) ? ValueManager.parse(target.get(property), dataset) : null
      }

    })

  }

  initDataset() {

    this.dataset = new Proxy(this.__datas, {

      set(target, property, value) {
        target.set(property, value)
        return true
      },

      get(target, property) {
        return target.get(property)
      }

    })

  }

}


export default ValueManager