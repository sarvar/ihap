/**
 * general source player. audio and youtube inherit from this class
 * @private
 */
class ihapSourcePlayer {
  /**
   * the source player module
   * @constructor
   * @private
   */
  constructor() {
    this.markup = null
    this.element = null
  }

  /**
   * stub for the createMarkup method
   */
  createMarkup() {}

  /**
   * stub for the play method
   */
  play() {}

  /**
   * stub for the pause method
   */
  pause() {}

  /**
   * stub for the empty method
   */
  empty() {}

  /**
   * stub for the isEmpty method
   */
  isEmpty() {}

  /**
   * stub for the setSong method
   */
  setSong() {}

}

export {ihapSourcePlayer as default}