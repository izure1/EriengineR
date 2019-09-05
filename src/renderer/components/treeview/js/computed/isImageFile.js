import REGEXP from '@/assets/js/REGEXP'


export default function () {
  return REGEXP.image.test(this.tree.name)
}