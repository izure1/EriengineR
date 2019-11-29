import PROPERTIES from '../vars/PROPERTIES'


export default function (property) {

  let information = this.getInformation(property)

  if (!information) {
    return true
  }

  return !!information.exclude

}