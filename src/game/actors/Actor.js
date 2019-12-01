import {
  ipcRenderer
} from 'electron'
import fs from 'fs-extra'
import DesignParser from '../designs/DesignParser'


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

  getDesign() {

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

    return designObj

  }

  getLveJSData(option) {

    let designObj = this.getDesign()
    if (!designObj) return {}

    let level = this.level
    let dataset = this.data
    let {
      x,
      y,
      z,
    } = this.position

    return {
      level,
      dataset,
      style: {
        left: x,
        bottom: y,
        perspective: z,
      }
    }

  }

}


export default Actor