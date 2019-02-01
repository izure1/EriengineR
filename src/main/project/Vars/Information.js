class Information {

  constructor() {

    this.backgroundColor = '#ffffff'
    this.color = '#0075c8'
    this.width = 0
    this.height = 0
    this.id = null
    this.name = null
    this.languages = ['한국어']
    this.defaultLanguage = 0
    this.ready = false

  }

  set(option = {}) {

    for (let i in option) this[i] = option[i]

  }

  get language() {

    let returnValue

    returnValue = this.languages[this.defaultLanguage]

    if (!returnValue) {
      this.defaultLanguage = 0
      returnValue = this.languages[0]
    }

    return returnValue

  }

  set language(name) {

    let index

    index = this.languages.indexOf(name)

    if (index === -1) {
      index = 0
    }

    this.defaultLanguage = index

    return true

  }

}


export default Information