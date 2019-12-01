import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeRepeat from './vars/ATTRIBUTE_REPEAT'
import SpritesetDefault from './vars/SPRITESET_DEFAULT'
import StyleDefault from './vars/STYLE_DEFAULT'
import StylePosition from './vars/STYLE_POSITION'


class SpriteObject extends GameObject {

  constructor() {

    super()
    this.name = 'SpriteObject'
    this.type = 'sprite'
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeRepeat)
    this.extendProperties('spriteset', new SpritesetDefault)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('style', new StylePosition)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'sprite'
    }

    return lve(name)
      .create(init)
      .attr(this.getParsedComponent('attribute'))
      .css(this.getParsedComponent('style'))
      .data(this.getParsedComponent('dataset'))
      .sprite(this.getParsedComponent('spriteset'))

  }

}


export default SpriteObject