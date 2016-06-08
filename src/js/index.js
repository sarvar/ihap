//= module imports ==//
import ihapAudio from './modules/ihap_audio'
import ihapControls from './modules/ihap_controls'
import ihapPlaylist from './modules/ihap_playlist'
import ihapProgressBar from './modules/ihap_progress_bar'
import ihapSettings from './modules/ihap_settings'
import ihapSongInformation from './modules/ihap_song_information'

export default class ihap {
  /**
   * @constructor
   */
  constructor(data) {
    // modules
    this.settings = new ihapSettings(data.settings)
    this.audio = new ihapAudio()
    this.controls = new ihapControls()
    this.playlist = new ihapPlaylist(data.songs)
    this.progress_bar = new ihapProgressBar()
    this.song_information = new ihapSongInformation()

    // props
    this.moving_progress = false

    this._initializeihap()
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
    this.audio.play()
  }

  /**
   * pause the current song
   * @return {Bool} returns true on successfull pause
   */
  pause() {
    return this.audio.pause()
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
    this.playlist.empty()
    this.audio.empty()
    this._resetProgressBar()
    this._updateProgressBar(0)
  }

  /**
   * sets a song from the playlist to be the current song
   * @param {Object} song
   */
  changeSong(song) {
    if (this.playlist.songs.indexOf(song) != undefined) {
      this.playlist.current_song_index = this.playlist.songs.indexOf(song)
      this.audio.setSong(song)
      this._resetProgressBar()
      this._updateProgressBar(0)
      if (this.audio.playing) this.audio.play()
    }
  }

  /**
   * reset the playlist and set new songs
   * @param {Array} songs the songs to set
   * @return {Array} songs the new playlist
   */
  setPlaylist(songs) {
    this.emptyPlaylist()
    this.appendToPlaylist(songs)
    return this.getPlaylist()
  }

  /**
   * gets the playlist
   * @return {Array} the current songs in the playlist
   */
  getPlaylist() {
    return this.playlist.songs
  }

  /**
   * appends a song to the current playlist
   * @param  {Array} songs an array of songs, also accepts a single song
   * @return {Array} the new playlist
   */
  appendToPlaylist(songs) {
    this.playlist.appendSongs(songs)
    this._loadFirstSong()
    return this.getPlaylist()
  }

  /**
   * prepends a song to the current playlist
   * @param  {Array} songs an array of songs, also accepts a single song
   * @return {Array} the new playlist
   */
  prependToPlaylist(songs) {
    this.playlist.prependSongs(songs)
    this._loadFirstSong()
    return this.getPlaylist()
  }

  /**
   * returns the currently playing song
   * @return {Object} the currently playing song
   */
  getCurrentSong() {
    return this.playlist.songs[this.playlist.current_song_index]
  }

  /**
   * returns the current song index
   * @return {Integer} index of the currently playing song in the playlist
   */
  getCurrentSongIndex() {
    return this.playlist.current_song_index
  }

  /**
   * removes the given song(s) from the playlist
   * @param  {Array} songs the song(s) to removes
   * @return {Array}       the new playlist
   */
  removeFromPlaylist(songs) {
      this.playlist.removeSongs(songs)
      return this.playlist.songs
    }

  /**
   * ***************
   * private methods
   * ***************
   */

  /**
   * initialize the plugin. create required markup and add event listeners
   */
  _initializeihap() {
    if (this.settings.container == undefined) {
      throw ('Cannot find container "' + this.settings.container + '". Please make sure self an element with this id is present.')
    } else {
      this._createComponents()
      this._addListeners()

      this._loadFirstSong()
    }
  }

  /**
   * appends the html markup of each module
   */
  _createComponents() {
    this.settings.container.appendChild(this.audio.markup)
    this.settings.container.appendChild(this.controls.markup)
    this.settings.container.appendChild(this.progress_bar.markup)
    this.settings.container.appendChild(this.song_information.markup)
    if (this.settings.playlist.container != undefined)
      this.settings.playlist.container.appendChild(this.playlist.markup)
  }

  /**
   * resets the progressbars values to 0
   */
  _resetProgressBar() {
    let song_duration = this.audio.element.duration
    if (song_duration == undefined) {
      this.progress_bar.reset(0)
    } else {
      this.progress_bar.reset(song_duration)
    }
  }

  /**
   * updates the progress_bar visually (adjusts the width)
   * @param {Float} current_time the current time playing
   */
  _updateProgressBar(current_time) {
    this.progress_bar.updateBar(current_time)
  }

  _loadFirstSong() {
    if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
      if (this.audio.is_empty())
        this.changeSong(this.playlist.songs[0])
    }
  }

  /**
   * adds event listeners
   */
  _addListeners() {
    this._addAudioListeners()
    this._addControlsListeners()
    this._addProgressListeners()
  }

  /**
   * adds listeners for the audio element
   */
  _addAudioListeners() {
    let self = this
      // update the progress_bar to match the current timestamp
    this.audio.element.addEventListener("timeupdate", function() {
        if (self.moving_progress == false) {
          self._updateProgressBar(this.currentTime)
        }
      })
      // reload the progress_bar after the song changed
    this.audio.element.addEventListener('canplay', function() {
        self._resetProgressBar()
        self._updateSongInformation()
      })
      // autoplay next song on finishing one
    this.audio.element.addEventListener('ended', function() {
      self.skip_next()
    })
  }

  /**
   *	adds listeners for the controls (button)
   */
  _addControlsListeners() {
    let self = this
    this.controls.buttons.play.addEventListener('click', function() {
      self.play()
    })
    this.controls.buttons.pause.addEventListener('click', function() {
      self.pause()
    })
    this.controls.buttons.skip_next.addEventListener('click', function() {
      self.skip_next()
    })
    this.controls.buttons.skip_previous.addEventListener('click', function() {
      self.skip_prev()
    })
  }

  /**
   * adds listeners for the progress bar
   */
  _addProgressListeners() {
    let self = this
    this.progress_bar.markup.addEventListener('mousedown', function(e) {
      if (e.preventDefault) e.preventDefault()
      self.moving_progress = true
    })

    this.progress_bar.markup.addEventListener('mousemove', function(e) {
      if (self.moving_progress) {
        let duration = self.progress_bar.element.getAttribute('aria-valuemax')
        let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration)
        self._updateProgressBar(progress)
      }
    })

    this.progress_bar.markup.addEventListener('mouseup', function(e) {
      let duration = self.progress_bar.element.getAttribute('aria-valuemax')
      let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration)
      self.audio.element.currentTime = progress
      self.moving_progress = false
    })
  }

  /**
   * updates the song title & artist in the frontend
   */
  _updateSongInformation() {
    let song = this.getCurrentSong()
    let title = song.title
    let artist = song.artist

    this.song_information.updateMeta(title, artist)
  }

}

function calculate_progress(layerX, offsetLeft, offsetWidth, duration) {
  let p = ((layerX - offsetLeft) / offsetWidth)
  return duration * p
}
