import GameObject from './GameObject'

import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import AttributeMedia from './vars/ATTRIBUTE_MEDIA'


class AudioObject extends GameObject {

  constructor() {

    super()
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('attribute', new AttributeMedia)

  }

}


export default AudioObject