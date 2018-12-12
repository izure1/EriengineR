class History {

  constructor() {
    this.history = []
  }

  pop() {
    return this.history.pop()
  }

  push(data) {
    this.history.push(data)
  }

  clear() {
    this.history = []
  }

}


export default History