import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import AttributeRepeat from './vars/ATTRIBUTE_REPEAT'
import VideosetDefault from './vars/VIDEOSET_DEFAULT'
import StyleDefault from './vars/STYLE_DEFAULT'
import StylePosition from './vars/STYLE_POSITION'


class VideoObject extends GameObject {

  constructor() {

    super()
    this.name = 'VideoObject'
    this.type = 'video'
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('attribute', new AttributeRepeat)
    this.extendProperties('videoset', new VideosetDefault)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('style', new StylePosition)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'video'
    }

    lve(name)
      .create(init)
      .attr(this.status.attribute)
      .attr('videoset', this.status.videoset)
      .css(this.status.style)
      .data(this.status.dataset)

  }

}


export default VideoObject