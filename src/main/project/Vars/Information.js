class Information {

  constructor() {

    this.backgroundColor = '#ffffff'
    this.color = '#0075c8'
    this.width = 0
    this.height = 0
    this.id = null
    this.name = null
    this.languages = ['한국어']
    this.ready = false

  }

  set(option = {}) {

    for (let i in option) this[i] = option[i]

  }

}


export default Information