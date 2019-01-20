export default function (script) {

  this.cancelConnecting()
  this.connection.source = script

  this.$nextTick(() => {

    this.jsPlumb.connect({
      source: this.getScriptId(script.id),
      target: this.getCursorPointerId,
      endpoint: 'Blank',
      anchor: [
        // left
        [0, 0.25],
        [0, 0.5],
        [0, 0.75],
        // right
        [1, 0.25],
        [1, 0.5],
        [1, 0.75],
        // top
        [0.25, 0],
        [0.5, 0],
        [0.75, 0],
        // bottom
        [0.25, 1],
        [0.5, 1],
        [0.75, 1]
      ],
      paintStyle: {
        stroke: 'red'
      },
      overlays: [
        ['Arrow', {
          id: 'arrow',
          location: 1
        }]
      ]
    })

  })

}