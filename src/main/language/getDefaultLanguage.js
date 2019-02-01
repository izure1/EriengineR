export default function (e) {

  let returnValue

  returnValue = this.variables.project.information.language

  e.sender.send('language-get-default', returnValue)
  e.returnValue = returnValue

}