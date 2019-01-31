import removeLanguage from './remove'
import updateLanguage from './update'


export default function (e, language) {

  removeLanguage.call(this, language)
  updateLanguage.call(this)

  e.sender.send('language-remove')
  e.returnValue = null

}