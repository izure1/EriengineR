import Actor from '@game/actors/Actor'


export default function (property) {

  if (!(this.actor instanceof Actor)) {
    return {}
  }

  // 이 속성과 연결된 디자인 객체의 컴포넌트를 가져옵니다
  let component = this.getPropertyDetail(property, 'component')
  let designObj = this.actor.getDesign()

  if (!designObj) return {}
  if (!designObj.hasComponent(component)) return {}

  let defaultComponent = designObj.getComponent(component)
  let actorOwnComponent = this.actor[property]


  // 만일 액터에서 해당 속성값을 가지고 있었다면, 해당 값으로 업데이트합니다
  let validComponent = {}
  for (let p in defaultComponent) {
    validComponent[p] =
      actorOwnComponent.hasOwnProperty(p) ?
      actorOwnComponent[p] : defaultComponent[p]
  }

  return validComponent

}