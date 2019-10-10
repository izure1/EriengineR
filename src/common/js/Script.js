import createUID from './createUID'
import Macro from './Macro'


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

  static parseColumnContexts(contexts) {

    let newCtxs = []

    for (let context of contexts) {

      let ctx = new Macro

      ctx.parseFromInformation(context)
      newCtxs.push(ctx)

    }

    return newCtxs

  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y
  }

  parseFromInformation(info) {

    let {
      id,
      comment,
      events,
      conditions,
      actions,
      nexts,
      position
    } = info

    this.id = id
    this.comment = comment
    this.events = Script.parseColumnContexts(events).map(t => t.copy())
    this.conditions = Script.parseColumnContexts(conditions).map(t => t.copy())
    this.actions = Script.parseColumnContexts(actions).map(t => t.copy())
    this.nexts = nexts
    this.position = position

  }

  copy() {

    let copy = new Script

    copy.parseFromInformation(this)

    copy.id = createUID()
    copy.events = this.events.map(t => t.copy())
    copy.conditions = this.conditions.map(t => t.copy())
    copy.actions = this.actions.map(t => t.copy())

    return copy

  }

}


export default Script