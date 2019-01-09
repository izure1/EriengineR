export default function (script) {
  this.$root.$emit('createWorkspaceTab', script.id, script.id, 'SCRIPT-EDITOR', {})
  this.$root.$emit('setDataForWorkspaceTab', script.id, script)
}