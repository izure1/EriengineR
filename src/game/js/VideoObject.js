import GameObject from './GameObject'

import DatasetPosition from './vars/DATASET_POSITION'
import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import AttributeMedia from './vars/ATTRIBUTE_MEDIA'
import StyleDefault from './vars/STYLE_DEFAULT'
import PositionDefault from './vars/POSITION_DEFAULT'


class VideoObject extends GameObject {

  constructor() {

    super()
    this.extendProperties('dataset', new DatasetPosition)
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('attribute', new AttributeMedia)
    this.extendProperties('style', new StyleDefault)
    this.extendProperties('position', new PositionDefault)

  }

}


export default VideoObject