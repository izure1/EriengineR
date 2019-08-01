import banner_design_background from '@/assets/img/banner_design_background.gif'
import banner_design_actor from '@/assets/img/banner_design_actor.png'
import banner_design_interface from '@/assets/img/banner_design_interface.gif'


export default [

  {
    name: '이미지',
    ext: '.esdesign_image',
    description: `
    <p>
      가장 많이 사용됩니다.
      <br>
      화면에 이미지를 그려넣고 싶을 때 사용합니다.
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: '스프라이트',
    ext: '.esdesign_sprite',
    description: `
    <p>
      움직이는 이미지를 그려넣고 싶을 때 사용합니다.
      <br>
      가령 2D 게임일 경우, 움직이는 캐릭터를 스프라이트 객체로 만듭니다.
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: '비디오',
    ext: '.esdesign_video',
    description: `
    <p>
      비디오를 재생하고 싶을 때 사용합니다.
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: '오디오',
    ext: '.esdesign_audio',
    description: `
    <p>
      오디오를 재생하고 싶을 때 사용합니다.
      <br>
      효과음, 배경음 등이 이곳에 해당됩니다.
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: '텍스트',
    ext: '.esdesign_text',
    description: `
    <p>
      텍스트를 그리고 싶을 때 사용합니다.
      <br>
      텍스트를 꾸미고 기울기, 굵기 등 효과를 줄 수 있습니다.
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: '타이핑 텍스트',
    ext: '.esdesign_typing',
    description: `
    <p>
      내용을 변경하면 글자가 타이핑되는 효과를 보여줍니다.
      <br>
      비주얼노벨의 경우, 대사창이 이곳에 해당됩니다. 
    </p>
    `,
    image: null,
    type: null
  },

  {
    name: 'GUI',
    ext: '.esdesign_gui',
    description: `
    <p>
    Graphical User Interface 의 약자입니다. 흔히 인터페이스라고 불립니다.
    <br>
    버튼, HP, MP바, 인벤토리 등을 구현하는데 이 객체를 사용합니다.
    </p>
    `,
    image: null,
    type: null
  }

]