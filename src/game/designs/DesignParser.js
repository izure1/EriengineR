import DESIGN_LISTS from './vars/DESIGN_LISTS'
import GameObject from '@game/designs/parents/GameObject'


class DesignParser {

  getFactoryFromDesign(info) {

    let design = DESIGN_LISTS.filter(DESIGN => {
      let tmp = new DESIGN.Factory
      return tmp.name === info.name
    }).pop()

    return design ? design.Factory : GameObject 

  }

}


export default DesignParser