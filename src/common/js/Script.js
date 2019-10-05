import createUID from './createUID'


class Script {

  id = createUID()
  comment = ''
  events = []
  conditions = []
  actions = []
  nexts = []
  position = {
    x: 0,
    y: 0
  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y
  }

}


export default Script