class VueIterator {

  constructor() {
    this.__object = []
    this.__object.push(...arguments)
  }

  clear() {
    let v = this.__object = []
  }

  delete(key) {

    let i = this.__object.findIndex(t => t[0] === key)

    if (i > -1) this.__object.splice(i, 1)
    return i !== -1

  }

  has(key) {
    let i = this.__object.findIndex(t => t[0] === key)
    return i !== -1
  }

  get size() {
    return this.__object.length
  }

}


class VueMap extends VueIterator {

  constructor() {
    super(...arguments)
  }

  set(key, value) {

    let i = this.__object.findIndex(t => t[0] === key)

    if (i === -1) {
      this.__object.push([key, value])
    } else {
      this.__object.splice(i, 1, [key, value])
    }

    return new Map(this.__object)

  }

  entries() {
    return new Map(this.__object).entries()
  }

  forEach() {
    new Map(this.__object).forEach(...arguments)
  }

  get(key) {
    let i = this.__object.findIndex(t => t[0] === key)
    return this.__object[i][1]
  }

  keys() {
    return new Map(this.__object).keys()
  }

  values() {
    return new Map(this.__object).values()
  }

}


class VueSet extends VueIterator {

  constructor() {
    super(...arguments)
  }

  static values(lists) {
    return lists.map(t => t[1])
  }

  add(value) {

    if (this.has(value)) {
      return new Set(VueSet.values(this.__object))
    }

    this.__object.push([value, value])
    return new Set(VueSet.values(this.__object))

  }

  entries() {
    return new Set(VueSet.values(this.__object)).entries()
  }

  forEach() {
    new Set(VueSet.values(this.__object)).forEach(...arguments)
  }

  keys() {
    return new Set(VueSet.values(this.__object)).keys()
  }

  values() {
    return new Set(VueSet.values(this.__object)).values()
  }

}


export {
  VueIterator,
  VueMap,
  VueSet,
}