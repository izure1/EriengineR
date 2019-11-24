import path from 'path'


export default function (itempath) {

  return path.basename(itempath, path.extname(itempath))

}