export default function (e) {

  if (this.configurable) {

    this.contextmenu_info.open = true
    this.contextmenu_info.x = e.clientX
    this.contextmenu_info.y = e.clientY
    
    e.currentTarget.focus()

  }

}