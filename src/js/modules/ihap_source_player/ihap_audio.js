/**
 * Module imports
 */
import ihapSourcePlayer from '../ihap_source_player'

/**
 * ihap audio module
 * @private
 */
class ihapAudio extends ihapSourcePlayer {
  /**
   * The audio module
   * @constructor
   * @private
   */
  constructor(song, playlist) {
    super(song, playlist);

    this.createMarkup();
    this.setSong(song);
  }

  /**
   * create the html for the audio element
   */
  createMarkup() {
    // wrapper
    let player_wrapper = document.createElement('div');
    player_wrapper.setAttribute('id', 'ihap_player_wrapper');

    // actual audio element
    let audio_player = document.createElement('audio');
    audio_player.setAttribute('id', 'ihap_player');
    audio_player.setAttribute('src', '');

    // combine wrapper & audio element
    player_wrapper.appendChild(audio_player);
    // set object properties
    this.markup = player_wrapper;
    this.element = audio_player;
  }

  /**
   * play the currently set song
   */
  play() {
    if (this.element.readyState == 4) {
      this.onCanPlay();
    } else {
      this.element.addEventListener('canplay', this.onCanPlay());
    }
  }

  onCanPlay() {
    if (!this.isEmpty()) {
      let self = this;
      this.element.play();
      this.playing = true;

      let song_duration = self.element.duration;
      if (song_duration == undefined) {
        this.progress_bar.reset(0.0)
      } else {
        this.progress_bar.reset(song_duration)
      }

      this.element.addEventListener('timeupdate', function () {
        self.progress_bar.updateBar(self.element.currentTime)
      })
    }
  }

  /**
   * pause the currently playing song
   */
  pause() {
    this.element.pause();
    this.playing = !this.element.paused;
    return this.element.paused;
  }

  /**
   * reset the audio element to inital state without src or duration
   */
  empty() {
    this.element.currentTime = 0; // property of actual audio element
    this.element.setAttribute('src', ''); // empty src
    this.element.setAttribute('aria-valuemax', '0'); // set duration to 0
  }

  isEmpty() {
    return this.element.getAttribute('src') == '';
  }

  /**
   * sets a new song to the audioplayer and loads it
   * @param {Object} song the song that should be set
   */
  setSong(song) {
    if (song != undefined && song.url != undefined) {
      this.element.currentTime = 0;
      this.element.setAttribute('src', song.url);
      this.element.load();
    } else {
      throw new Error('Invalid song');
    }
  }

  unload() {
    this.element.pause();
    this.element.remove();
    // remove event listeners? maybe not needed because element gets removed?
  }

  seekTo(time) {
    this.element.currentTime = time
  }
}
export {ihapAudio as default}
