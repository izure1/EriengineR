import get from './get'
import read from './read'
import write from './write'


export default async function (text, uuid) {

  let scenario
  let languages

  languages = await get.call(this)

  for (let language of languages) {

    scenario = await read.call(this, language.name)
    scenario.text[uuid] = text

    await write.call(this, language.name, scenario)

  }

}