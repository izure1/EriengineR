export default function (e) {

  let returnValue

  returnValue = this.variables.macro

  e.sender.send('macro-get', returnValue)
  e.returnValue = returnValue

}