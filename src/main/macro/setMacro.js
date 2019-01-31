export default function (e, path, context) {

  let returnValue

  returnValue = {
    context,
    path
  }

  this.variables.macro = returnValue

  e.sender.send('macro-set', returnValue)
  e.returnValue = returnValue

}