import GameObject from './GameObject'

import DatasetPosition from './vars/DATASET_POSITION'
import AttributeText from './vars/ATTRIBUTE_TEXT'
import StyleDefault from './vars/STYLE_DEFAULT'
import StyleText from './vars/STYLE_TEXT'
import PositionDefault from './vars/POSITION_DEFAULT'


class TextObject extends GameObject {

  constructor() {

    super()
    this.extendProperties('dataset', new DatasetPosition)
    this.extendProperties('attribute', new AttributeText)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('style', new StyleText)
    this.extendProperties('position', new PositionDefault)

  }

}


export default TextObject