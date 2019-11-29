import {
  ipcRenderer
} from 'electron'

import fs from 'fs-extra'
import DesignParser from '@game/designs/DesignParser'


class Actor {

  constructor() {

    this.name = null
    this.design = null
    this.level = 'main'
    this.data = {}
    this.position = {
      x: 0,
      y: 0,
      z: 0,
    }

  }

  from({
    name,
    design,
    level,
    data,
    position
  }) {

    this.name = name
    this.design = design
    this.level = level
    this.data = data
    this.position = position

  }

  getComponent(property) {

    let filepath
    let content

    filepath = ipcRenderer.sendSync('design-get-path', this.design)

    if (!filepath) {
      return null
    }

    try {
      content = fs.readJSONSync(filepath)
    } catch (e) {
      return null
    }


    let designParser = new DesignParser
    let Factory, designObj

    Factory = designParser.getFactoryFromDesign(content)

    designObj = new Factory
    designObj.from(content)


    return designObj.getComponent(property)

  }

}


export default Actor