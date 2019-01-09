export default function (source, targets) {

  if (!Array.isArray(targets)) {
    targets = [targets]
  }

  source = this.getScriptId(source)
  targets = targets.map(id => this.getScriptId(id))

  for (let target of targets) {

    this.jsPlumb.connect({
      source,
      target,
      endpoint: ['Dot', {
        radius: 6
      }],
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
      overlays: [
        ['Arrow', {
          id: 'arrow',
          location: 1
        }]
      ]
    })

  }

}