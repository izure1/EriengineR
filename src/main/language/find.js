import get from './get'
import read from './read'


export default async function (uid) {

  let languages
  let scenario
  let text

  languages = await get.call(this)
  text = {}
  
  for (let language of languages) {
    
    scenario = await read.call(this, language.name)
    text[language.id] = scenario.text[uid]

  }

  return text

}