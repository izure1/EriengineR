import REGEXP from '@/assets/js/vars/REGEXP'


export default function () {
  return REGEXP.image.test(this.tree.name)
}