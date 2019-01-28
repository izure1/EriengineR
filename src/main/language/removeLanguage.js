import removeLanguage from './remove'
import updateLanguage from './update'


export default function (e, language) {

  removeLanguage.call(this, language)
  updateLanguage.call(this, e)

  e.sender.send('language-remove')

}