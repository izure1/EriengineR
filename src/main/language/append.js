import read from './read'
import write from './write'


export default async function (language, text, uuid) {

  let scenario

  scenario = await read.call(this, language)
  scenario[uuid] = text

  await write.call(this, language, scenario)

}