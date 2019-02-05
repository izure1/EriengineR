import removeLanguage from './remove'


export default function (e, language) {

  removeLanguage.call(this, language)

  e.sender.send('language-remove')
  e.returnValue = null

}