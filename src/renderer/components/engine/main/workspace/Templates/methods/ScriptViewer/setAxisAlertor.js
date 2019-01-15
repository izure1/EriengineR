export default function () {

  for (let i = 0; i < this.pos.max; i += this.pos.grid) {
    this.pos.x.push(i)
    this.pos.y.push(i)
  }

}