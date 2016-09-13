/**
 * General source player, acts as an abstract class.
 * Audio and youtube inherit from this class.
 * @private
 */
class ihapSourcePlayer {
  /**
   * The source player module
   * @constructor
   * @param {Object} song
   * @param {Object} progress_bar
   * @private
   */
  constructor(song, progress_bar) {
    // emulate abstract class behaviour
    if (new.target === ihapSourcePlayer) {
      throw new TypeError("Cannot construct abstract instances directly");
    }

    this.markup = null;
    this.element = null;
    this.song = song;
    this.progress_bar = progress_bar;
    this.playing = false;
  }

  /**
   * Stub for the createMarkup method
   */
  createMarkup() {
  }

  /**
   * Stub for the play method. Responsibilites:
   * * Play the current song
   * * Do nothing if no song is set or song is already playing
   * @return {Boolean} true if song is playing
   */
  play() {
  }

  /**
   * Stub for the pause method. Responsibilites:
   * * Pause the current song
   * * Do nothing if no song is set or song is already playing
   * @return {Boolean} true if song is paused
   */
  pause() {
  }

  /**
   * Stub for the empty method. Responsibilites:
   * * Unload currentSong
   * * Reset timers
   * @return {Boolean} isEmpty
   */
  empty() {
  }

  /**
   * Stub for the isEmpty method. Responsibilites:
   * * Check if empty worked
   * @return {Boolean} isEmpty
   */
  isEmpty() {
  }

  /**
   * Stub for the setSong method. Responsibilites:
   * * Load / set the given song to the player
   * * Do not play automatically
   * @param {Object} song the song to set
   * @return {Boolean} true if given song == currentSong
   */
  setSong(song) {
  } // eslint-disable-line no-unused-vars

  /**
   * Stub for unload method. Responsibilites:
   * * Destroy self, including event listeners
   */
  unload() {
  }

  /**
   * Stub for onTimeUpdate method
   * @param callback
   */
  onTimeUpdate(callback) {
  }

  /**
   * Stub for seekTo meethod
   * @param time
   */
  seekTo(time){

  }
}
/**
 * Export the module
 */
export {ihapSourcePlayer as default}