export default function (x, reverse = false) {

  let {
    cameraPersp,
    cameraDefaultPersp,
  } = this
  
  let zoom = (cameraDefaultPersp - cameraPersp) / cameraDefaultPersp

  return reverse ? (x / zoom) : (x * zoom)
  
}