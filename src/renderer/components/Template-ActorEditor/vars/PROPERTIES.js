/**
 * 
 * @description
 * 
 * exclude: 이 속성은 액터 정보 편집기에서 보이지 않습니다 (v-if="!information.exclude")
 * description: 이 속성의 간단한 정보를 사용자에게 보여줍니다.
 * writable: 이 속성을 수정할 수 있는지 여부를 지정합니다. 기본값은 false 입니다.
 * configurable: 이 속성이 Object 자료형일 때, 새로운 속성을 추가할 수 있습니다. 기본값은 false 입니다.
 * component: 이 속성이 Object 자료형일 때, 이 액터가 참조하고 있는 디자인.esdesign 파일에서 지정된 component 속성값을 받아옵니다.
 * 
 */
export default {

  name: {
    title: '이름',
    description: '이 객체의 실제 이름입니다. 같은 씬에서 중복되어선 안됩니다.',
    writable: true,
  },

  design: {
    description: '이 객체가 참조하고 있는 디자인입니다. 건드리지 마십시오.',
    exclude: true,
    writable: false,
  },

  level: {
    title: '레벨',
    description: '이 객체가 소속된 레벨을 설정합니다. 현재 카메라의 레벨보다 하위 레벨에 있는 객체는 보이지 않습니다. 하위 레벨은 <b>::레벨명</b>처럼 구분지을 수 있습니다. 기본값은 main 입니다.',
    writable: true,
  },

  data: {
    title: '변수',
    description: '이 객체가 가지고 있는 데이터 정보입니다. 해당 객체가 참조하고 있는 디자인의 Dataset을 기본값으로 가지고 있습니다.',
    component: 'dataset',
    writable: true,
  },

  position: {
    title: '좌표',
    description: '이 객체의 좌표입니다.',
    writable: true,
  }

}