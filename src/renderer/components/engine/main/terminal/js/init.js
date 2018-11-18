import $ from 'jquery'

export default function () {
  let firstBtn
  let container
  let input

  firstBtn = document.querySelector('.terminal-header > a')
  container = document.querySelector('.terminal-container')

  if (firstBtn) {
    firstBtn.click()
  }

  container.addEventListener('mousedown', function () {

    input = document.querySelector('.terminal-footer > input')

    if (!input) return
    
    setTimeout(() => {
      input.focus()
    }, 0)

  })

};