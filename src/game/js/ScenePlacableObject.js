import GameObject from './GameObject'

import DEFAULT_STYLE from './vars/DEFAULT_STYLE'
import DEFAULT_POSITION from './vars/DEFAULT_POSITION'


class ScenePlacableObject extends GameObject {

  constructor() {

    super()

    this.extendProperties('style', new DEFAULT_STYLE)
    this.extendProperties('position', new DEFAULT_POSITION)
    
  }

  setPlace(x, y) {
    this.status.style.x = x
    this.status.style.y = y
  }


}


export default ScenePlacableObject