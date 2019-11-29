import createItem from '@common/js/createItem'


export default function (section) {

  let keys
  let name

  keys = Object.keys(section)
  
  name = '새로운_변수'
  name = createItem(keys, name)

  this.setProperty(section, name, null)

}