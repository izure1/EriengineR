import REGEXP from '@/assets/js/vars/REGEXP'


export default function () {
  return REGEXP.video.test(this.tree.name)
}