import read from './read'
import write from './write'


export default async function (language, text, uid) {

  let scenario

  scenario = await read.call(this, language)
  scenario.text[uid] = text

  await write.call(this, language, scenario)

}