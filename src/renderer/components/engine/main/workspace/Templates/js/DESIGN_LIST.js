import image_background from '../image/logo_design_background.gif'
import image_actor from '../image/logo_design_actor.png'
import image_interface from '../image/logo_design_interface.gif'


export default [

  {
    name: '액터',
    ext: '.esactor',
    description: `
    <p>
      씬에 배치할 수 있는 객체입니다.
      비주얼노벨에서는 등장인물이 여기에 포함됩니다.
    </p>
    <p>
      2D 게임에서는 주인공과, NPC 등이 포함됩니다. 그리고 상호작용하는 것들 역시 액터로 취급됩니다.
      <br>
      가령 주인공이 몬스터를 공격할 수 있다면, 몬스터 역시 액터라 볼 수 있습니다.
    </p>`,
    image: image_actor
  },

  {
    name: '인터페이스',
    ext: '.esinterface',
    description: `
    <p>
      카메라의 위치에 상관없이 항상 화면에 고정되어 있는 객체입니다.
      <br>
      가령 대사창, 체력 게이지, 미니맵, 버튼 등이 여기에 포함됩니다.
    </p>
    <p>
      인터페이스는 플레이어에게 정보를 제공하거나, 상호작용을 돕는 용도로 사용됩니다.
    </p>`,
    image: image_interface
  },

  {
    name: '배경',
    ext: '.esbackground',
    description: `
    <p>
      씬의 배경화면을 의미합니다.
      <br>
      카메라의 위치에 따라 미묘하게 움직임으로써, 입체감을 더할 수 있습니다.
    </p>`,
    image: image_background
  }

]