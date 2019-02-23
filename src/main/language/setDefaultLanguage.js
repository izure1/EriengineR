import updateLanguage from './update'


export default function (e, id) {

  this.variables.project.information.language = id
  
  updateLanguage.call(this)

  let {
    language
  } = this.variables.project.information

  e.sender.send('language-set-default', language)
  e.returnValue = language

}