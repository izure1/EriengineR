import banner_design_background from '@/assets/img/banner_design_background.gif'
import banner_design_actor from '@/assets/img/banner_design_actor.png'
import banner_design_interface from '@/assets/img/banner_design_interface.gif'


export default [

  {
    name: '액터',
    ext: '.esdesign_actor',
    description: `
    <p>
      씬에 배치할 수 있는 객체입니다.
      비주얼노벨에서는 등장인물이 여기에 포함됩니다.
    </p>
    <p>
      2D 게임에서는 주인공과, NPC 등이 포함됩니다. 그리고 상호작용하는 것들 역시 액터로 취급됩니다.
      <br>
      가령 주인공이 몬스터를 공격할 수 있다면, 몬스터 역시 액터라 볼 수 있습니다.
      <br>
      나무를 벨 수 있다면, 나무 역시 액터라고 볼 수 있죠. 탄막 게임에서는 탄막도 액터라 볼 수 있습니다.
    </p>`,
    image: banner_design_actor,
    type: null
  },

  {
    name: '인터페이스',
    ext: '.esdesign_interface',
    description: `
    <p>
      카메라의 위치에 상관없이 항상 화면에 고정되어 있는 객체입니다.
      <br>
      가령 대사창, 체력 게이지, 미니맵, 버튼 등이 여기에 포함됩니다.
    </p>
    <p>
      인터페이스는 플레이어에게 정보를 제공하거나, 상호작용을 돕는 용도로 사용됩니다.
    </p>`,
    image: banner_design_interface,
    type: null
  },

  {
    name: '배경',
    ext: '.esdesign_background',
    description: `
    <p>
      씬의 배경화면을 의미합니다.
      <br>
      카메라의 위치에 따라 미묘하게 움직임으로써, 입체감을 더할 수 있습니다.
    </p>`,
    image: banner_design_background,
    type: 'image'
  }

]