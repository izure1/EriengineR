import DesignParser from '@game/designs/DesignParser'


export default function (content) {

  // DesignParser 객체를 이용하여 디자인정보 JSON의 원시 Class 객체를 얻어옵니다
  // 이후 원시 Class를 이용하여 designObj 객체를 만들고, 디자인 정보를 복원합니다.
  let parser = new DesignParser
  let DesignFactory = parser.getFactoryFromDesign(content)

  let designObj
  designObj = new DesignFactory
  designObj.from(content)

  return designObj

}