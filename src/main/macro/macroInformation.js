import macroList from './macroList'


export default async function (id) {

  let list
  let contexts

  list = await macroList.call(this)

  for (let column in list) {

    contexts = list[column]
    for (let macro of contexts) {

      if (macro.id !== id) {
        continue
      }

      return macro

    }

  }

  return null

}