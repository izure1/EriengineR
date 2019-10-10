export default function (id) {

  /**
   * 
   * FIXME
   * 
   * Vue 반응성 문제로 인해 변수의 레퍼런스가 꼬여버리는 오류를 수정하기 위한 임시 조치
   * 매개변수의 script 변수가 아닌, 항상 최신 정보를 담고 있는 this.scripts 에서 script 변수를 가져와 해당 내용으로 세이브합니다.
   * 
   */
  let origin

  origin = this.scripts.filter(t => t.id === id)
  origin = origin[0]

  if (!origin) {
    return
  }

  return origin

}