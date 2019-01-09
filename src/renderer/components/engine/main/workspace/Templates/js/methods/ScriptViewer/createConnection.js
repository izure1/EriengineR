export default function (script) {

  this.cancelConnecting()
  this.connection.source = script
  
  this.$nextTick(() => {

    this.jsPlumb.connect({
      source: this.getScriptId(script.id),
      target: this.getCursorPointerId,
      endpoint: 'Blank',
      overlays: [
        ['Arrow', {
          id: 'arrow',
          location: 1
        }]
      ]
    })

  })

}