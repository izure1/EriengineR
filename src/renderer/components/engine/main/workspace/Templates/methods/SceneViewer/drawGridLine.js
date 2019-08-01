function drawLine(c, color, start, end) {

  c.strokeStyle = color
  c.lineWidth = 1

  start = start.map(t => t -= 0.5)
  end = end.map(t => t -= 0.5)

  c.beginPath()
  c.moveTo(start[0], start[1])
  c.lineTo(end[0], end[1])
  c.stroke()

}

export default function () {

  let c
  let w, h
  let g, r

  c = this.lve.getRenderStates()

  if (!c.ready) {
    return
  }

  c = c.value
  c = c[0]

  w = this.lve.current.canvas.width
  h = this.lve.current.canvas.height
  g = this.getValidGridGap
  r = this.gridColor

  if (isNaN(g)) {
    return
  }

  for (let i = g; i < w; i += g) {
    drawLine(c, r, [i, 0], [i, h])
  }

  for (let i = g; i < h; i += g) {
    drawLine(c, r, [0, i], [w, i])
  }

}