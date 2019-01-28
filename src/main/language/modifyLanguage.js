import modifyLanguage from './modify'
import updateLanguage from './update'


export default function (e, origin, after) {

  let languages

  e.sender.send('language-modify', modifyLanguage(this.variables.project.information.languages, origin, after))
  updateLanguage.call(this, e)

}