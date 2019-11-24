export default function (e) {

  switch (e.which) {
    case 1:
      this.isMouseLeftDown = false
      break

    case 2:
      this.isMouseWheelDown = false
      break
      
    case 3:
      this.isMouseRightDown = false
      break
  }

}