export default function appendItem(items, item, count = 0) {

  let newItem

  newItem =
    count ?
    item + `_${count}` :
    item

  if (items.indexOf(newItem) !== -1) {

    return appendItem(items, item, ++count)

  } else {

    return newItem

  }

}