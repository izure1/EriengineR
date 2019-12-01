import url from 'url'


export default function getResolvedURI(urls, hash = '/') {

  let winURI

  winURI = url.parse(urls)
  winURI.hash = '#' + hash

  return url.format(winURI)

}