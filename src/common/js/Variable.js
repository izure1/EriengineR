import {
  ipcRenderer
} from 'electron'


class Variable {

  static inputDataType(option) {
    return
  }

  constructor(i) {

    let {
      type,
      value,
      lists = [],
      skip = false,
    } = i

    this.type = type
    this.value = value
    this.skip = skip

    this.hideProperty('lists', lists)

  }

  hideProperty(property, value) {

    Object.defineProperty(this, property, {
      value,
      enumerable: false
    })

    return this

  }

  /* 기본적으로 1개의 변수에서 입력받는 값은 1개입니다.
   *
   * 하지만 TextVariable 처럼, 다국어의 개수만큼 입력받아야 할 경우도 있습니다.
   * 이 경우, 해당 Class 에서 getInputData를 새롭게 getInputData 메서드를 만들어야 합니다. TextVariable Class 를 참고하세요.
   * 
   */
  getInputDatas() {
    return [new VariableInputData(this)]
  }

  setInputData(value) {
    this.value = value
    this.skip = true
  }

}


class VariableInputData extends Variable {

  constructor(origin, name = '기본값') {

    if (!(origin instanceof Variable)) {
      throw 'Invalid variable type.'
    }

    super(origin)
    this.name = name
    this.hint = origin.hint

  }

}



class TextVariable extends Variable {

  constructor() {
    super(...arguments)
  }

  get text() {

    let contents
    let locale

    contents = ipcRenderer.sendSync('macro-get-value', this.value)
    locale = ipcRenderer.sendSync('locale-get-default')

    if (!locale) {
      return undefined
    }

    return contents.filter(t => t.locale === locale.id).pop()

  }

  get hint() {
    return '문자열을 입력하세요. 상단의 탭을 클릭하여 다국어를 입력할 수 있습니다.'
  }

  // 다국어의 개수만큼 반환합니다
  getInputDatas() {

    let locales
    let datas

    locales = ipcRenderer.sendSync('locale-get-all')
    locales = locales.map(t => t.name)

    datas = []

    for (let name of locales) {
      datas.push(new VariableInputData(this, name))
    }

    return datas

  }

}

class ValueVariable extends Variable {

  constructor() {
    super(...arguments)
  }

  get text() {
    return this.value
  }

  get hint() {
    return '값을 입력하세요.'
  }

}

class FileVariable extends Variable {

  constructor() {
    super(...arguments)
  }

  get text() {
    return this.value
  }

  get hint() {
    return '파일의 경로를 입력하세요. 전부 지우면 다시 선택할 수 있습니다.'
  }

}

class RadioVariable extends Variable {

  constructor() {
    super(...arguments)
  }

  get text() {

    let t

    t = this.lists.filter(t => t.value == this.value)
    t = t.pop()

    if (!t) {
      return undefined
    }

    return t.text

  }

  get hint() {
    return '주어진 값 중에서 선택하세요.'
  }

}




class VariableParser {

  parseFromInformation(info) {

    switch (info.type) {

      case 'text':
        return new TextVariable(info)

      case 'value':
        return new ValueVariable(info)

      case 'file':
        return new FileVariable(info)

      case 'radio':
        return new RadioVariable(info)

      default:
        throw 'Invalid variable type.'

    }

  }

}

export {

  Variable,
  TextVariable,
  ValueVariable,
  FileVariable,
  RadioVariable,

  VariableParser,
  VariableInputData,

}