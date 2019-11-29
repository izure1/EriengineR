const DATA_TRANSFER = new Map


function dragstart(e) {
  this.userHandler.dragstart(e, this.dataTransfer)
}

function drag(e) {
  this.userHandler.drag(e, this.dataTransfer)
}

function dragend(e) {
  this.userHandler.dragend(e, this.dataTransfer)
  this.dataTransfer.clear()
}

function dragenter(e) {
  this.userHandler.dragenter(e, this.dataTransfer)
}

function dragover(e) {

  if (!this.enabled) return

  e.preventDefault()
  this.userHandler.dragover(e, this.dataTransfer)

}

function dragleave(e) {
  this.userHandler.dragleave(e, this.dataTransfer)
}

function drop(e) {
  this.userHandler.drop(e, this.dataTransfer)
}


class DraggableDataTransfer {

  setData(p, v) {
    return DATA_TRANSFER.set(p, v)
  }

  getData(p) {
    return DATA_TRANSFER.get(p)
  }

  clear() {
    DATA_TRANSFER.clear()
  }

}

class Draggable {

  static createElementArray(el) {

    if (el instanceof HTMLElement) el = [el]
    if (el instanceof NodeList) el = Array.from(el)

    return el

  }

  constructor() {

    this.enabled = true
    this.dataTransfer = new DraggableDataTransfer

    this.drags = []
    this.drops = []

    this.dragHandler = {
      dragstart,
      drag,
      dragend,
    }

    this.dropHandler = {
      dragenter,
      dragover,
      dragleave,
      drop,
    }

    for (let p in this.dragHandler) this.dragHandler[p] = this.dragHandler[p].bind(this)
    for (let p in this.dropHandler) this.dropHandler[p] = this.dropHandler[p].bind(this)


    this.userHandler = {
      dragstart: function () {},
      drag: function () {},
      dragend: function () {},
      dragenter: function () {},
      dragover: function () {},
      dragleave: function () {},
      drop: function () {}
    }

  }

  __setDraggable(v) {
    this.enabled = v
    this.drags.forEach(t => {
      t.draggable = !!this.enabled
    })
  }

  __removeEvent(el, handler) {
    for (let p in handler) {
      el.removeEventListener(p, handler[p])
    }
  }

  __addEvent(el, handler) {
    for (let p in handler) {
      el.addEventListener(p, handler[p])
    }
  }

  setDrag(el) {

    this.drags = Draggable.createElementArray(el)

    this.drags.forEach(t => {
      this.__removeEvent(t, this.dragHandler)
      this.__addEvent(t, this.dragHandler)
    })

    this.__setDraggable(this.enabled)

  }

  setDrop(el) {

    this.drops = Draggable.createElementArray(el)

    this.drops.forEach(t => {
      this.__removeEvent(t, this.dropHandler)
      this.__addEvent(t, this.dropHandler)
    })

  }

  destroy() {

    this.disable()

    this.drags.forEach(t => {
      this.__removeEvent(t, this.dragHandler)
    })
    this.drops.forEach(t => {
      this.__removeEvent(t, this.dropHandler)
    })

  }


  /*
   *
   * SET MANAGER RUNTIME STATE
   * 
   */

  disable() {
    this.__setDraggable(false)
  }

  enable() {
    this.__setDraggable(true)
  }

  /*
   *
   *  USER REGIST HANDLER
   *
   */

  dragstart(f) {
    this.userHandler.dragstart = f
  }

  dragend(f) {
    this.userHandler.dragend = f
  }

  dragenter(f) {
    this.userHandler.dragenter = f
  }

  dragover(f) {
    this.userHandler.dragover = f
  }

  dragleave(f) {
    this.userHandler.dragleave = f
  }

  drop(f) {
    this.userHandler.drop = f
  }

}


export default Draggable