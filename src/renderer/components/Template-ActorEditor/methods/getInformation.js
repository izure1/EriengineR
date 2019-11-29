import PROPERTIES from '../vars/PROPERTIES'


export default function (property) {

  let returnValue

  for (let p in PROPERTIES) {

    let information = PROPERTIES[p]

    if (p !== property) continue

    returnValue = information
    break

  }

  return returnValue

}