import banner_design_image from '@/assets/img/banner_design_image.png'
import banner_design_square from '@/assets/img/banner_design_square.png'
import banner_design_circle from '@/assets/img/banner_design_circle.png'
import banner_design_video from '@/assets/img/banner_design_video.gif'
import banner_design_text from '@/assets/img/banner_design_text.png'
import banner_design_sprite from '@/assets/img/banner_design_sprite.gif'

import REGEXP from '@/assets/js/REGEXP'


export default [

  {
    name: '이미지',
    value: 'image',
    description: `
    <p>
      가장 많이 사용될 객체입니다. 화면에 이미지를 표현합니다.
      <br>
      단, 움직이는 이미지를 의미하는 것은 아닙니다. 재생되는 이미지는 <span class="light-green--text">'스프라이트'</span> 타입을 참고하세요.
    </p>
    `,
    image: banner_design_image,
    src: REGEXP.image.source
  },

  {
    name: '텍스트',
    value: 'text',
    description: `
    <p>
      화면에 글자를 표현합니다. 크기와 색상 등을 조절할 수 있습니다.
      <br>
      줄바꿈이 가능하며, 내용물을 바꿀 수 있습니다.
    </p>
    `,
    image: banner_design_text,
    src: null
  },

  {
    name: '스프라이트',
    value: 'sprite',
    description: `
    <p>
      움직이는 이미지입니다. 2D 게임에서 주로 사용됩니다.
      <br>
      재생 속도를 조절할 수 있습니다.
    </p>
    `,
    image: banner_design_sprite,
    src: REGEXP.image.source
  },

  {
    name: '비디오',
    value: 'video',
    description: `
    <p>
      동영상을 재생합니다. 스프라이트와의 차이점은, 사운드가 포함되어 있다는 점입니다.
      <br>
      재생 속도를 조절할 수 있습니다.
    </p>
    `,
    image: banner_design_video,
    src: REGEXP.video.source
  },

  {
    name: '사각형',
    value: 'square',
    description: `
    <p>
      사각형을 표현합니다.
    </p>
    `,
    image: banner_design_square,
    src: null
  },

  {
    name: '원형',
    value: 'circle',
    description: `
    <p>
      원을 표현합니다.
    </p>
    `,
    image: banner_design_circle,
    src: null
  }

]