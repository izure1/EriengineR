import PROPERTIES from '../vars/PROPERTIES'


export default function (value, property) {

  let information = this.getInformation(value)

  if (!information) {
    return
  }

  return information[property]

}