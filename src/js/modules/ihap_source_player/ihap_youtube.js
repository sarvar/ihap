/**
 * module imports
 */
import ihapSourcePlayer from '../ihap_source_player';
import * as YoutubeApiHelper from '../helpers/youtube_api_helper';
import * as ihapEvents from '../helpers/custom_events';

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
  constructor(song, progress_bar, auto_play) {
    super(song, progress_bar, auto_play);

    this.createMarkup();
    this.setSong(song, auto_play);
    this.progressInterval = null;
  }

  createMarkup() {
    let youtube_wrapper = document.createElement('div');
    youtube_wrapper.setAttribute('id', 'youtube_wrapper');

    // set properties
    this.markup = youtube_wrapper
  }

  play() {
    console.log('play clicked');
    let self = this;
    if (this.element != null) {
      this.playing = true;
      self.element.playVideo();

      let song_duration = self.element.getDuration();
      if (song_duration == undefined) {
        self.progress_bar.reset(0.0)
      } else {
        self.progress_bar.reset(song_duration)
      }

      // there is no listener for currentTime for youtube, we have to poll
      this.progressInterval = setInterval(function () {
        self.progress_bar.updateBar(self.element.getCurrentTime());
      }, 250);

      let event = new Event('play');
      self.markup.dispatchEvent(event);
    }
  }

  pause() {
    if (this.element != null) {
      this.element.pauseVideo();
      this.playing = false;
    }
  }

  empty() {
  }

  isEmpty() {
  }

  setSong(song, auto_play) {
    console.log('yt setSong');
    let that = this;
    YoutubeApiHelper.loadYoutubeApi(
      function () {
        that.element = YoutubeApiHelper.loadYoutubeVideo(
          song.container,
          song.getYoutubeId(),
          function (e) {
            that.onYoutubeReady(e, auto_play)
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
    this.element.destroy(); // yt api function that removes the iframe and rebuilds the initial dom element
    window.clearInterval(this.progressInterval)
  }

  seekTo(time) {
    this.element.seekTo(time)
  }

  /**
   * Youtube api callbacks
   */

  /**
   * Callback that is passed to the onReady event of the YT api
   * @param event
   */
  onYoutubeReady(event, auto_play) {
    console.log('YT Video ready: ');
    this.element = event.target;
    console.log(auto_play);
    if (auto_play){
      this.play();
    }
  }

  /**
   * Callback that is passed to the onStateChange event of the YT api
   * @param event
   */
  onYoutubeStateChange(event) {
    console.log('New state: ' + event.data)
  }

  /**
   * Callback that is passed to the onError event of the YT api
   * @param event
   */
  onYoutubeError(event) {
    console.log('Youtube error: ' + event.data)
  }
}

export {ihapYoutube as default}