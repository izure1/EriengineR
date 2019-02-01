import updateLanguage from './update'


export default function (e, name) {

  this.variables.project.information.language = name
  
  updateLanguage.call(this)

  let {
    language
  } = this.variables.project.information

  e.sender.send('language-set-default', language)
  e.returnValue = language

}