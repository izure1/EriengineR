import Lve from 'lve'


function createInterface(lve) {

  let camera
  let camera_axis

  camera = lve('__camera__').create({
    type: 'camera'
  })

  camera_axis = lve('__camera_axis__').create({
    type: 'text',
    text: '( 0, 0, 0 )'
  })

  return {
    camera,
    camera_axis
  }

}


function designInterface(o) {

  let {
    camera,
    camera_axis
  } = o

  camera.use()

  camera_axis.css({
    fontSize: 15,
    borderWidth: 5,
    borderColor: 'white',
    color: 'grey',
    position: 'fixed',
    left: 20,
    bottom: 20,
    zIndex: 1,
    cursor: 'pointer'
  })

}


function attachEvent(o) {

  let {
    camera,
    camera_axis
  } = o


  camera.on('animateupdate', e => {

    let x, y, z

    switch (e.property) {

      case 'left':
      case 'bottom':
      case 'perspective':
        x = e.target.style.left
        y = e.target.style.bottom
        z = e.target.style.perspective
        break

    }

    camera_axis.attr('text', `( ${~~x}, ${~~y}, ${~~z} )`)

  })

  camera_axis.on('click', e => {

    camera.animate({
      left: 0,
      bottom: 0,
      perspective: 0
    }, 1000, 'easeOutExpo')

  })

  camera_axis.on('mouseover', e => {
    e.target.css('color', 'red')
  }).on('mouseout', e => {
    e.target.css('color', 'grey')
  })

}

export default function () {

  if (this.lve.getRenderStates().ready) {
    this.lve.current.canvas.removeEventListener('click', this.clickHandler)
    this.lve.destroy()
    this.lve = new Lve
  }

  // 카메라와 기본 인터페이스 생성
  let {
    camera,
    camera_axis
  } = createInterface(this.lve)

  // 기본 인터페이스 꾸미기
  designInterface({
    camera,
    camera_axis
  })

  // 인터페이스 이벤트 추가
  attachEvent({
    camera,
    camera_axis
  })


  // 월드 초기화

  this.lve.init({
    canvas: `#${this.getCanvasId}`
  }).ready(() => {

    this.lve('test').create({
      type: 'square'
    }).css({
      borderWidth: 2,
      borderColor: '#0075c8',
      color: 'transparent'
    }).attr('physics', 'static')

    this.lve('ground').create({
      type: 'square'
    }).css({
      width: 1000,
      height: 50,
      color: 'grey',
      bottom: -250
    }).attr('physics', 'static')

    this.lve.extendDrawEnd(() => {
      this.drawGridLine()
    })

  })


  this.lve.current.canvas.addEventListener('click', this.clickHandler)

}