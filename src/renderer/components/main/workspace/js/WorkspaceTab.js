class WorkspaceTab {

  constructor(id, name, onclick = function () {}, onclose = function () {}) {
    this.id = id
    this.name = name
    this.onclick = onclick
    this.onclose = onclose
    this.selected = false;
  }

}


export default WorkspaceTab