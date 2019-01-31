export default function (e, msg) {

  let returnValue

  returnValue = this.variables.project.information.languages

  e.sender.send('language-get', returnValue)
  e.returnValue = returnValue

}