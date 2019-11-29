import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import StyleDefault from './vars/STYLE_DEFAULT'
import StylePosition from './vars/STYLE_POSITION'


class ImageObject extends GameObject {

  constructor() {

    super()
    this.name = 'ImageObject'
    this.type = 'image'
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('style', new StylePosition)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'image'
    }

    lve(name)
      .create(init)
      .attr(this.component.attribute)
      .css(this.component.style)
      .data(this.component.dataset)

  }

}


export default ImageObject