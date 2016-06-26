/**
 * module imports
 */
import ihapSourcePlayer from '../ihap_source_player';
import * as YoutubeApiHelper from '../helpers/youtube_api_helper';

/**
 * ihap youtube module
 * @private
 */
class ihapYoutube extends ihapSourcePlayer {
  /**
   * the youtube module
   * @constructor
   * @private
   */
  constructor(song) {
    super(song);

    this.createMarkup();
    this.setSong(song);
  }

  createMarkup() {
  }

  play() {
  }

  pause() {
  }

  empty() {
  }

  isEmpty() {
  }

  setSong(song) {
    console.log('yt setSong')
    let that = this;
    let p = YoutubeApiHelper.loadYoutubeApi(
      function () {
        YoutubeApiHelper.loadYoutubeVideo(
          'youtube_player',
          song.getYoutubeId(),
          function (e) {
            that.onYoutubeReady(e)
          },
          function (e) {
            that.onYoutubeStateChange(e)
          },
          function (e) {
            that.onYoutubeError(e)
          }
        )
      }
    );
  }

  unload() {
  }

  /**
   * Youtube api callbacks
   */

  /**
   * Callback that is passed to the onReady event of the YT api
   * @param e
   */
  onYoutubeReady(e) {
    console.log('YT Video ready: ' + e.data)
  }

  /**
   * Callback that is passed to the onStateChange event of the YT api
   * @param e
   */
  onYoutubeStateChange(e) {
    console.log('New state: ' + e.data)
  }

  /**
   * Callback that is passed to the onError event of the YT api
   * @param e
   */
  onYoutubeError(e) {
    console.log('Youtube error: ' + e.data)
  }
}

export {ihapYoutube as default}