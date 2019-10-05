import Script from '@common/js/Script'


export default function (script = new Script) {

  let {
    x,
    y
  } = script.position

  let {
    width,
    height
  } = this.$el.getBoundingClientRect()

  this.$el.scrollLeft = x - (width / 2) + 300
  this.$el.scrollTop = y - (height / 2) + 100

}