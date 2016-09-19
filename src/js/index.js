'use strict';

/**
 * module imports
 */
import ihapAudio from './modules/ihap_source_player/ihap_audio'
import ihapYoutube from './modules/ihap_source_player/ihap_youtube'
import ihapControls from './modules/ihap_controls'
import ihapPlaylist from './modules/ihap_playlist'
import ihapProgressBar from './modules/ihap_progress_bar'
import ihapSettings from './modules/ihap_settings'
import ihapSongInformation from './modules/ihap_song_information'

/**
 * ihap main class
 */
class ihap {
  /**
   * @constructor
   * @param {Object} data settings / songs
   */
  constructor(data) {
    // modules
    this.settings = new ihapSettings(data.settings);
    this.controls = new ihapControls();
    this.playlist = new ihapPlaylist(data.songs);
    this.progress_bar = new ihapProgressBar();
    this.song_information = new ihapSongInformation();
    this.player = null;

    // props
    this.moving_progress = false;

    this._initializeihap();
  }

  /**
   * ******************
   * public api methods
   * ******************
   */

  /**
   * ********************
   * basic audio controls
   * ********************
   */

  /**
   * plays the current song
   */
  play() {
    this.playSong(this.getCurrentSong())
  }

  /**
   * pause the current song
   * @return {Boolean} returns true on successfull pause
   */
  pause() {
    this.pauseSong(this.getCurrentSong())
  }

  /**
   * plays the next song in the playlist, or the first if the current song is the last
   * @return {Object} the next song thats now set
   */
  skip_next() {
    let next_song = this.playlist.getNextSong()
    this.changeSong(next_song)
    return next_song
  }

  /**
   * plays the previous song in the playlist, or the last if the current song is the first
   * @return {Object} the previous song that is now set
   */
  skip_prev() {
    let previous_song = this.playlist.getPreviousSong()
    this.changeSong(previous_song)
    return previous_song
  }

  /**
   * *********************
   * playlist interactions
   * *********************
   */

  /**
   * gets the next song
   * @return {Object} the next song in the playlist
   */
  getNextSong() {
    return this.playlist.getNextSong()
  }

  /**
   * gets the previous song
   * @return {Object} the previous song in the playlist
   */
  getPreviousSong() {
    return this.playlist.getPreviousSong()
  }

  /**
   * removes all songs from the playlist (visually and in the background) and stops playback
   */
  emptyPlaylist() {
    this.playlist.empty();
    //this.audio.empty()
    this._resetProgressBar(0);
    this._updateProgressBar(0);
  }

  /**
   * sets a song from the playlist to be the current song
   * @param {Object} song
   */
  changeSong(song) {
    let self = this;
    let was_playing = (this.player && this.player.playing) || false;

    // reset the progress bar
    this._resetProgressBar(0);
    this._updateProgressBar(0);

    // destroy existing players
    this.unloadPlayer();

    // empty song info
    this.song_information.emptyMeta();

    // TODO: rework this. we do not want to pass the progressbar to the player! maybe use mediator pattern for another
    //   class that handles communication ?
    switch (song.type) {
      case 'youtube':
        this.player = new ihapYoutube(song, self.progress_bar);
        break;
      default:
        this.player = new ihapAudio(song, self.progress_bar);
        break;
    }
    this.player.markup.addEventListener('play', function (e) {
      console.log('i just received the play event! yay');
    });
    // set current song
    this.playlist.current_song_index = this.playlist.songs.indexOf(song);
    this._updateSongInformation();

    if (was_playing)
      self.play();
  }

  /**
   * reset the playlist and set new songs
   * @param {Array} songs the songs to set
   * @return {Array} songs the new playlist
   */
  setPlaylist(songs) {
    this.emptyPlaylist();
    this.appendToPlaylist(songs);
    return this.getPlaylist();
  }

  /**
   * gets the playlist
   * @return {Array} the current songs in the playlist
   */
  getPlaylist() {
    return this.playlist.songs;
  }

  /**
   * appends a song to the current playlist
   * @param  {Array} songs an array of songs, also accepts a single song
   * @return {Array} the new playlist
   */
  appendToPlaylist(songs) {
    this.playlist.appendSongs(songs);

    if (!this.player) {
      this._loadFirstSong();
    }
    return this.getPlaylist();
  }

  /**
   * prepends a song to the current playlist
   * @param  {Array} songs an array of songs, also accepts a single song
   * @return {Array} the new playlist
   */
  prependToPlaylist(songs) {
    this.playlist.prependSongs(songs);
    this._loadFirstSong();
    return this.getPlaylist();
  }

  /**
   * returns the currently playing song
   * @return {Object} the currently playing song
   */
  getCurrentSong() {
    return this.playlist.songs[this.playlist.current_song_index];
  }

  /**
   * returns the current song index
   * @return {Number} index of the currently playing song in the playlist
   */
  getCurrentSongIndex() {
    return this.playlist.current_song_index;
  }

  /**
   * removes the given song(s) from the playlist
   * @param  {Array} songs the song(s) to removes
   * @return {Array}       the new playlist
   */
  removeFromPlaylist(songs) {
    this.playlist.removeSongs(songs);
    return this.playlist.songs;
  }

  /**
   * ***************
   * private methods
   * ***************
   */

  /**
   * initialize the plugin. create required markup and add event listeners
   * @private
   */
  _initializeihap() {
    if (this.settings.container == undefined) {
      throw ('Cannot find container "' + this.settings.container + '". ' +
      'Please make sure self an element with this id is present.');
    } else {
      this._createComponents();
      this._addListeners();

      this._loadFirstSong();
    }
  }

  /**
   * appends the html markup of each module
   * @private
   */
  _createComponents() {
    this.settings.container.appendChild(this.controls.markup);
    this.settings.container.appendChild(this.progress_bar.markup);
    this.settings.container.appendChild(this.song_information.markup);
    if (this.settings.playlist.container != undefined)
      this.settings.playlist.container.appendChild(this.playlist.markup);
  }

  /**
   * resets the progressbars values to 0
   * @param {number} song_duration
   * @private
   */
  _resetProgressBar(song_duration) {
    if (song_duration == undefined) {
      this.progress_bar.reset(0.0);
    } else {
      this.progress_bar.reset(song_duration);
    }
  }

  loadPlayer() {
    // load player
    // init module
    // append to dom
  }

  unloadPlayer() {
    if (this.player != null)
      this.player.unload();
    // remove event listeners
  }

  playSong(song) {
    this.player.play();
  }

  pauseSong(song) {
    this.player.pause();
  }


  /**
   * ==================== yt
   */


  /**
   * updates the progress_bar visually (adjusts the width)
   * @param {Number} current_time the current time playing
   * @private
   */
  _updateProgressBar(current_time) {
    this.progress_bar.updateBar(current_time);
  }

  /**
   * load the first song in the playlist
   * @private
   */
  _loadFirstSong() {
    if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
//      if (this.audio.isEmpty())
      this.changeSong(this.playlist.songs[0]);
    }
  }

  /**
   * adds event listeners
   * @private
   */
  _addListeners() {
    //this._addAudioListeners()
    this._addControlsListeners();
    this._addProgressListeners();
  }

  /**
   * adds listeners for the audio element
   * @private
   */
  _addAudioListeners() {
    let self = this
    // update the progress_bar to match the current timestamp
    // this.audio.element.addEventListener("timeupdate", function () {
    //   if (self.moving_progress == false) {
    //     self._updateProgressBar(this.currentTime)
    //   }
    // })
    // reload the progress_bar after the song changed
    // this.audio.element.addEventListener('canplay', function () {
    //   let duration = self.audio.element.duration
    //   self._resetProgressBar(duration)
    //   self._updateSongInformation()
    // })
    // autoplay next song on finishing one
    this.audio.element.addEventListener('ended', function () {
      self.skip_next()
    })
  }

  /**
   * adds listeners for the controls (button)
   * @private
   */
  _addControlsListeners() {
    let self = this;
    this.controls.buttons.play.addEventListener('click', function () {
      self.play();
      self.controls.buttons.play.classList.add('active');
      self.controls.buttons.pause.classList.remove('active');
    })
    this.controls.buttons.pause.addEventListener('click', function () {
      self.pause();
      self.controls.buttons.pause.classList.add('active');
      self.controls.buttons.play.classList.remove('active');
    })
    this.controls.buttons.skip_next.addEventListener('click', function () {
      self.skip_next()
      self.controls.buttons.pause.classList.remove('active');
      self.controls.buttons.play.classList.remove('active');
    })
    this.controls.buttons.skip_previous.addEventListener('click', function () {
      self.skip_prev()
      self.controls.buttons.pause.classList.remove('active');
      self.controls.buttons.play.classList.remove('active');
    })
  }

  /**
   * adds listeners for the progress bar
   * @private
   */
  _addProgressListeners() {
    let self = this;
    this.progress_bar.markup.addEventListener('mousedown', function (e) {
      if (e.preventDefault) e.preventDefault();
      self.moving_progress = true
    });

    this.progress_bar.markup.addEventListener('mousemove', function (e) {
      if (self.moving_progress) {
        let duration = self.progress_bar.element.getAttribute('aria-valuemax');
        let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
        self._updateProgressBar(progress)
      }
    });

    this.progress_bar.markup.addEventListener('mouseup', function (e) {
      let duration = self.progress_bar.element.getAttribute('aria-valuemax');
      let time = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
      self.player.seekTo(time);
      self.moving_progress = false
    })
  }

  /**
   * updates the song title & artist in the frontend
   * @private
   */
  _updateSongInformation() {
    let song = this.getCurrentSong();
    let title = song.title;
    let artist = song.artist;

    this.song_information.updateMeta(title, artist)
  }

}

/**
 * helper to calculate the progress
 * @param layerX
 * @param offsetLeft
 * @param offsetWidth
 * @param duration
 * @returns {number}
 */
function calculate_progress(layerX, offsetLeft, offsetWidth, duration) {
  let p = ((layerX - offsetLeft) / offsetWidth)
  return duration * p
}

export {
  ihap as
    default
}