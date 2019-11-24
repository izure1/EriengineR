import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeText from './vars/ATTRIBUTE_TEXT'
import StyleDefault from './vars/STYLE_DEFAULT'
import StyleText from './vars/STYLE_TEXT'
import StylePosition from './vars/STYLE_POSITION'


class TextObject extends GameObject {

  constructor() {

    super()
    this.name = 'TextObject'
    this.type = 'text'
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeText)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('style', new StyleText)
    this.extendProperties('style', new StylePosition)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'text'
    }

    lve(name)
      .create(init)
      .attr(this.status.attribute)
      .css(this.status.style)
      .data(this.status.dataset)

  }

}


export default TextObject