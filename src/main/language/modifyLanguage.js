import modifyLanguage from './modify'
import updateLanguage from './update'


export default function (e, origin, after) {

  let languages
  let returnValue

  returnValue = modifyLanguage(this.variables.project.information.languages, origin, after)
  updateLanguage.call(this)

  e.sender.send('language-modify', returnValue)
  e.returnValue = returnValue

}