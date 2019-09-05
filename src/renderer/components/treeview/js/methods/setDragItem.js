export default function (e) {

  if (this.configurable) {
    e.dataTransfer.setData('filePath', this.tree.path)
  }
  
}