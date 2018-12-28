import url from 'url'
import path from 'path'


export default function getResolvedURI(urls, hash = '/') {

  let winURI

  winURI = url.parse(urls)
  winURI.hash = '#' + hash

  return url.format(winURI)

}