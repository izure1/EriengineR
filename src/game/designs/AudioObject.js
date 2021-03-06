import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import AttributeRepeat from './vars/ATTRIBUTE_REPEAT'
import VideosetDefault from './vars/VIDEOSET_DEFAULT'


class AudioObject extends GameObject {

  constructor() {

    super()
    this.name = 'AudioObject'
    this.type = null
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('attribute', new AttributeRepeat)
    this.extendProperties('videoset', new VideosetDefault)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'video'
    }

    return lve(name)
      .create(init)
      .attr(this.getParsedComponent('attribute'))
      .attr('videoset', this.getParsedComponent('videoset'))
      .data(this.getParsedComponent('dataset'))

  }

}


export default AudioObject