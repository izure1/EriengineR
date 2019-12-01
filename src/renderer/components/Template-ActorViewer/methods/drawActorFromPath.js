import fs from 'fs-extra'
import Actor from '@game/actors/Actor'


export default function (file) {

  let actor
  let content

  try {
    content = fs.readJSONSync(file)
  } catch (e) {
    return null
  }

  actor = new Actor
  actor.from(content)


  let designObj = actor.getDesign()
  if (!designObj) return null


  let object

  // 디자인으로부터 LveJS 월드에 객체를 생성합니다
  object = designObj.buildToRenderer(actor.name, this.lve)
  // 액터에서 추가 데이터를 받습니다 (level, data, position 등)
  object.attr(actor.getLveJSData())

}