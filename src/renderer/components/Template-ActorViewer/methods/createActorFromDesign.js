export default function (name, design) {

  // design 객체를 LveJS 월드에 붙여넣습니다.
  design.buildToRenderer(name, this.lve)

  return this.lve(name).get()

}