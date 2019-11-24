function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}


export default function (script) {
  this.$root.$emit('create-workspace', script.id, script.id, 'SCRIPT-EDITOR', {})
  this.$root.$emit('set-data-workspace', script.id, deepCopy(script))
}