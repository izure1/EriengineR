const EMPTY_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='


export default function (e, dataTransfer) {

  if (this.configurable) {

    let image = new Image

    image.src = EMPTY_IMAGE_SRC

    dataTransfer.setData('text/path', this.tree.path)
    e.dataTransfer.setDragImage(image, 0, 0)
    
  }

}