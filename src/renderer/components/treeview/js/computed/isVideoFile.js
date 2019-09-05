import REGEXP from '@/assets/js/REGEXP'


export default function () {
  return REGEXP.video.test(this.tree.name)
}