import $ from 'jquery'

export default function () {

  let vh
  let wh
  let $workspace
  let $terminal

  $(document).ready(function () {

    $workspace = $('#workspace')
    $terminal = $('#terminal')

    vh = document.documentElement.clientHeight - 30
    wh = $workspace.height()

    $workspace.resizable('option', 'maxHeight', vh - 63)
    $terminal.css('height', vh - wh)

  })
  
};