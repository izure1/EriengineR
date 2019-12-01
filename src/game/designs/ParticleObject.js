import GameObject from './parents/GameObject'

import DatasetDefault from './vars/DATASET_DEFAULT'
import AttributeDefault from './vars/ATTRIBUTE_DEFAULT'
import AttributeAsset from './vars/ATTRIBUTE_ASSET'
import ParticlesetDefault from './vars/PARTICLESET_DEFAULT'
import StylePosition from './vars/STYLE_POSITION'


class ParticleObject extends GameObject {

  constructor() {

    super()
    this.name = 'ParticleObject'
    this.type = 'particle'
    this.extendProperties('dataset', new DatasetDefault)
    this.extendProperties('attribute', new AttributeDefault)
    this.extendProperties('attribute', new AttributeAsset)
    this.extendProperties('particleset', new ParticlesetDefault)
    this.extendProperties('style', new StylePosition)

  }

  buildToRenderer(name, lve) {

    let init = {
      type: 'particle'
    }

    return lve(name)
      .create(init)
      .attr(this.getParsedComponent('attribute'))
      .data(this.getParsedComponent('dataset'))
      .particle(this.getParsedComponent('particleset'))

  }

}


export default ParticleObject