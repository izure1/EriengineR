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

    return lve.createSprite(name, this.component.sprite.src, this.component.sprite)

  }

}


export default SpriteAnimation