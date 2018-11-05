import $ from 'jquery'
import 'jquery-ui/ui/widgets/resizable'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/resizable.css'
import resizeWorkspace from './resizeWorkspace'

export default function () {
  $(window).on('resize', resizeWorkspace)

  $('#workspace').resizable({
    handles: 's',
    minHeight: 30,
    resize: resizeWorkspace
  })

  resizeWorkspace()
};
