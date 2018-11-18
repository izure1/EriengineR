class Receiver {

  constructor(el, alertor = null) {
    this.el = el
    this.alertor = alertor
  }

  print(user, content, classes) {

    let out
    let count
    let timestamp

    timestamp = new Date()
    timestamp = timestamp.toLocaleString()

    out = document.createElement('p')
    out.classList.add(classes)
    out.innerHTML = `<span style="color: black">[${timestamp} <span style="color: green">~${user}</span>]</span> ${content}`


    if (this.alertor) {

      count = this.alertor.textContent
      count++

      if (isNaN(count)) {
        count = 1
      }

      this.alertor.textContent = count

    }

    this.el.appendChild(out)

  }

}


export default Receiver