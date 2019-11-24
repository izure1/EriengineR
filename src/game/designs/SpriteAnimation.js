import GameObject from './parents/GameObject'

import SpriteAnimDefault from './vars/SPRITEANIM_DEFAULT'


class SpriteAnimation extends GameObject {

  constructor() {

    super()
    this.name = 'SpriteAnimation'
    this.type = null
    this.extendProperties('sprite', new SpriteAnimDefault)

  }

  buildToRenderer(name, lve) {

    lve.createSprite(name, this.status.sprite.src, this.status.sprite)

  }

}


export default SpriteAnimation