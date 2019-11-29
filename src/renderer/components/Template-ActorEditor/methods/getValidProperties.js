import Actor from '@common/js/Actor'


export default function (property) {

  if (!(this.actor instanceof Actor)) {
    return {}
  }

  // 이 속성과 연결된 디자인 객체의 컴포넌트를 가져옵니다
  let component = this.getPropertyDetail(property, 'component')

  let defaultComponent = this.actor.getComponent(component)
  let actorOwnComponent = this.actor[property]

  // 만일 연결된 컴포넌트가 없다면, 액터 객체가 가지고 있는 원본을 보여줍니다
  if (!defaultComponent) {
    return actorOwnComponent
  }


  let validComponent = {}

  // 만일 액터에서 해당 속성값을 가지고 있었다면, 해당 값으로 업데이트합니다
  for (let p in defaultComponent) {

    validComponent[p] = defaultComponent[p]

    if (actorOwnComponent.hasOwnProperty(p)) {
      validComponent[p] = actorOwnComponent[p]
    }
    
  }

  return validComponent

}