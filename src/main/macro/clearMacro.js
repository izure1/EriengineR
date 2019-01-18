export default function clearMacro(e) {

  this.variables.macro = null
  e.returnValue = undefined

}