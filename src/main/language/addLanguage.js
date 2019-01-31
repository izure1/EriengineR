import addLanguage from './add'
import updateLanguage from './update'


export default function (e, language) {

  addLanguage.call(this, language)
  updateLanguage.call(this)

  e.sender.send('language-add')
  e.returnValue = null

}