export default function () {

  let g
  let m

  m = this.gridGapMin
  g = this.gridGap - 0

  if (isNaN(g)) {
    g = m
  }

  if (g < m) {
    g = m
  }

  return g

}