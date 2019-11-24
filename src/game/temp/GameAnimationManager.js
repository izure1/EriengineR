import GameAnimation from './GameAnimation'


class GameAnimationManager {

  constructor() {
    this.list = new Map
    this._anims = new Set
  }

  createVariable(name, variable, value) {

    if (!this.list.has(name)) {
      this.setVariable(name, variable, value)
    }

    return this.list.get(name)

  }

  setVariable(name, variable, value) {

    if (!this.list.has()) {
      this.list.set(name, {})
    }

    this.list.get(name)[variable] = value

  }

  getVariable(name) {

    if (!this.list.has(name)) {
      return null
    }

    return this.list.get(name)

  }

}


export default GameAnimationManager