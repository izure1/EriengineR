import glob from 'glob'


export default function (pattern, cwd, nodir = true) {

  return new Promise((resolve, reject) => {

    glob(pattern, {
      cwd,
      nodir,
      absolute: true
    }, (err, files) => {

      if (err) {
        reject(err)
        return
      }

      resolve(files)

    })

  })

}