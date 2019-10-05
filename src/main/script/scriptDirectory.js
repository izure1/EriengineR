import sceneDirectory from '../scene/sceneDirectory'


export default async function () {
  return await sceneDirectory.call(this, 1)
}