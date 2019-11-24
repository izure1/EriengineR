import banner_design_background from '@/assets/img/banner_design_background.gif'
import banner_design_actor from '@/assets/img/banner_design_actor.png'
import banner_design_sprite from '@/assets/img/banner_design_sprite.png'
import banner_design_interface from '@/assets/img/banner_design_interface.gif'


// constructor
import ImageObject from '@game/designs/ImageObject'
import SpriteObject from '@game/designs/SpriteObject'
import TextObject from '@game/designs/TextObject'
import AudioObject from '@game/designs/AudioObject'
import VideoObject from '@game/designs/VideoObject'
import SpriteAnimation from '@game/designs/SpriteAnimation'
import ParticleObject from '@game/designs/ParticleObject'


export default [

  {
    name: '이미지',
    description: `
    <p>
      가장 많이 사용됩니다.
      <br>
      화면에 이미지를 그려넣고 싶을 때 사용합니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: ImageObject,
  },

  {
    name: '스프라이트',
    description: `
    <p>
      움직이는 이미지를 그려넣고 싶을 때 사용합니다.
      <br>
      가령 2D 게임일 경우, 움직이는 캐릭터를 스프라이트 객체로 만듭니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: SpriteObject,
  },

  {
    name: '스프라이트 애니메이션',
    description: `
    <p>
      스프라이트에서 사용될 애니메이션 정보입니다. 프레임은 0부터 시작합니다.
      <br>
      가령 위 이미지에서 0 ~ 3번 프레임은 "좌측으로 달리기", 4번 프레임은 "멈춤", 5 ~ 8번 프레임은 "우측으로 달리기"의 모션을 가지고 있습니다.
      <br>
      이처럼 프레임의 시작과 끝을 지정하여, 하나의 모션을 만들 수 있습니다.
    </p>
    `,
    image: banner_design_sprite,
    type: null,
    Factory: SpriteAnimation,
  },

  {
    name: '비디오',
    description: `
    <p>
      비디오를 재생하고 싶을 때 사용합니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: VideoObject,
  },

  {
    name: '오디오',
    description: `
    <p>
      오디오를 재생하고 싶을 때 사용합니다.
      <br>
      효과음, 배경음 등이 이곳에 해당됩니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: AudioObject,
  },

  {
    name: '텍스트',
    description: `
    <p>
      텍스트를 그리고 싶을 때 사용합니다.
      <br>
      텍스트를 꾸미고 기울기, 굵기 등 효과를 줄 수 있습니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: TextObject,
  },

  {
    name: '파티클 생성기',
    description: `
    <p>
      파티클 입자를 보여주고 싶을 때 사용합니다.
      <br>
      지정한 에셋의 이미지가 원하는 속도와 빈도로 생성되고 사라집니다.
    </p>
    `,
    image: null,
    type: null,
    Factory: ParticleObject,
  },

  // {
  //   name: '타이핑 텍스트',
  //   description: `
  //   <p>
  //     내용을 변경하면 글자가 타이핑되는 효과를 보여줍니다.
  //     <br>
  //     비주얼노벨의 경우, 대사창이 이곳에 해당됩니다. 
  //   </p>
  //   `,
  //   image: null,
  //   type: null,
  //   Factory: TextObject,
  // },

  // {
  //   name: 'GUI',
  //   description: `
  //   <p>
  //   Graphical User Interface 의 약자입니다. 흔히 인터페이스라고 불립니다.
  //   <br>
  //   버튼, HP, MP바, 인벤토리 등을 구현하는데 이 객체를 사용합니다.
  //   </p>
  //   `,
  //   image: null,
  //   type: null,
  //   Constructor: ScenePlacableObject,
  // }

]