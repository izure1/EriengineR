class GameEvent {

  /**
   * 
   * @param {Object} target  Event target
   * @param {String} type  Event type
   * @param {Object} detail  Event Detail information
   */
  constructor(target, type, detail = null) {

    this.target = target
    this.type = type
    this.detail = detail

  }

}


export default GameEvent