import fs from 'fs-extra'
import findDesign from '../design/find'
import DesignParser from '@game/designs/DesignParser'


export default async function (file) {

  let content

  try {
    content = await fs.readJSON(file)
  } catch (e) {
    return null
  }

  let design
  
  design = content.design
  design = await findDesign.call(this, design)

  if (!design) return null
  design = await fs.readJSON(design)


  let parser = new DesignParser
  let Factory = parser.getFactoryFromDesign(design)
  let designObj = new Factory
  designObj.from(design)


  if (!designObj.hasComponent('attribute')) return null
  if (!designObj.hasProperty('attribute', 'src')) return null


  return designObj.getParsedValue('attribute', 'src')

}