import path from 'path'


export default function (itempath) {

  let ext

  ext = path.extname(itempath)
  ext = ext.toLowerCase()

  switch (ext) {

    case '.woff':
    case '.woff2':
      return 'fonticons'

    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
      return 'image'

    case '.mp3':
      return 'audiotrack'

    case '.mp4':
    case '.webm':
      return 'movie'

    case '.esscript':
      return 'code'

    case '.json':
      return 'language'

    default:
      return 'attachment'

  }

}