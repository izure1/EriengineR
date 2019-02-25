function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}


export default function (script) {
  this.$root.$emit('createWorkspaceTab', script.id, script.id, 'SCRIPT-EDITOR', {})
  this.$root.$emit('setDataForWorkspaceTab', script.id, deepCopy(script))
}