import path from 'path'
import electron from 'electron'
import createUUID from '@static/js/createUUID'



function setHiddenContext(property, value) {

  // 덮어쓰기 가능, 삭제 불가능, 열거 불가능
  Object.defineProperty(this, property, {
    value,
    writable: true,
    configurable: false,
    enumerable: false
  })

}


class Variable {

  constructor(id, value, inputted) {

    this.id = id
    this.type = null
    // 해당 변수에 담길 값입니다. 이는 인게임에서 사용됩니다
    this.value = value
    // 해당 변수가 이전에 입력되었던 값인지 확인합니다. 입력되었다면 true, 아니면 false가 담깁니다
    this.inputted = inputted

  }

}


class TextVariable extends Variable {

  constructor(id, value, inputted) {
    super(id, value, inputted)
    this.type = 'text'
  }

  get text() {

    let language
    let text

    language = electron.ipcRenderer.sendSync('language-get-default')
    text = electron.ipcRenderer.sendSync('language-find', this.value)

    return language in text ? text[language] : this.value

  }

}

class FileVariable extends Variable {

  constructor(id, value, inputted) {
    super(id, value, inputted)
    this.type = 'file'
  }

  get text() {

    let file = electron.ipcRenderer.sendSync('asset-get-file', this.value, true)

    if (file === null) {
      return 'undefined'
    }

    return file

  }

}

class ValueVariable extends Variable {

  constructor(id, value, inputted) {
    super(id, value, inputted)
    this.type = 'value'
  }

  get text() {
    return this.value + ''
  }

}

class SelectVariable extends Variable {

  constructor(id, value, inputted) {
    super(id, value, inputted)
    this.type = 'select'
  }

  get text() {
    return 'test3'
  }

}


class Macro {

  constructor() {

    // 해당 매크로의 고유값입니다
    this.id = createUUID()
    // 원본 매크로의 cid 입니다
    this.macro = null
    // 스크립트 뷰어에서 미리보여질 문장입니다
    this.text = ''
    // 해당 매크로의 입력값들 목록입니다.
    // Variable 개체들이 담깁니다
    this.variables = {}

  }

  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  static getMatchedType(type) {

    switch (type) {

      case 'text':
        return TextVariable

      case 'value':
        return ValueVariable

      case 'file':
        return FileVariable

      case 'select':
        return SelectVariable

    }

  }

  __init(macro) {

    setHiddenContext.call(this, '__macro', macro)
    return this

  }

  __getOldVariables(macro, vs) {

    let variables
    let V, v

    variables = {}

    for (let p in macro.variables) {

      if (macro.variables[p].type !== vs[p].type) {
        variables[p] = this.__createDefaultVariable(macro.variables[p])
      } else {
        v = vs[p]
        V = Macro.getMatchedType(v.type)
        variables[p] = new V(v.id, v.value, v.inputted)
      }

    }

    return variables

  }

  __getNewVariables(vs) {

    let variables = {}

    for (let p in vs) {
      variables[p] = this.__createDefaultVariable(vs[p])
    }

    return variables

  }

  __createDefaultVariable(v) {
    let V = Macro.getMatchedType(v.type)
    return new V(createUUID(), v.text, false)
  }

  /**
   * 
   * @param {MacroOrigin} macro 
   * @param {Macro} old 
   * @description 이전에 저장되었던 매크로로부터 불러옵니다
   */
  buildFromOld(macro, old) {

    this.id = old.id
    this.macro = old.macro
    this.text = old.text
    this.variables = this.__getOldVariables(macro, old.variables)

    return this.__init(macro)

  }


  /**
   * 
   * @param {MacroOrigin} macro
   * @description 원본 매크로 샘플로부터 새로운 저장가능한 매크로를 만듭니다
   */
  buildFromMacro(macro) {

    this.macro = macro.cid
    this.variables = this.__getNewVariables(macro.variables)

    return this.__init(macro)

  }


  /**
   * 
   * @description variables 안에 있는 모든 변수가 사용자로부터 필요한 값을 입력받았는지 여부를 반환합니다
   * @returns {Boolean}
   */
  isAllInputted() {

    let ready = true

    for (let p in this.variables) {

      if (!this.variables[p].inputted) {
        ready = false
        break
      }

    }

    return ready

  }


  getDescriptionFromMacro() {

    let description

    description = this.__macro.description
    description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

      match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
      match = this.variables[match].text

      return match

    })

    return description

  }

}


class Script {

  constructor(x = 200, y = 200) {
    this.id = createUUID()
    this.events = []
    this.conditions = []
    this.actions = []
    this.nexts = []
    this.position = {
      x,
      y
    }
    this.comment = ''
  }

}


export {
  Script,
  Macro
}