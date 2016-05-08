//= module imports ==//
import ihapAudio from './modules/ihap_audio'
import ihapControls from './modules/ihap_controls'
import ihapPlaylist from './modules/ihap_playlist'
import ihapProgressBar from './modules/ihap_progress_bar'
import ihapSongInformation from './modules/ihap_song_information'

export default class ihap {
  /**
   * @constructor
   */
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)
    this.playlist_container = document.getElementById(data.settings.playlist_container)

    this.audio = new ihapAudio()
    this.controls = new ihapControls()
    this.playlist = new ihapPlaylist(data.songs)
    this.progress_bar = new ihapProgressBar()
    this.song_information = new ihapSongInformation()
    this.moving_progress = false

    this.initializeihap()
  }

  /**
   * initialize the plugin. create required markup and add event listeners
   */
  initializeihap() {
    if (this.container == undefined) {
      throw ('Cannot find container "' + this.settings.container + '". Please make sure self an element with this id is present.')
    } else {
      this.createComponents()
      this.addListeners()

      if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
        this.setCurrentSong(this.playlist.songs[0])
      }
    }
  }

  /**
   * appends the html markup of each module
   */
  createComponents() {
    this.container.appendChild(this.audio.markup)
    this.container.appendChild(this.controls.markup)
    this.container.appendChild(this.progress_bar.markup)
    this.container.appendChild(this.song_information.markup)
    if (this.playlist_container != undefined)
      this.playlist_container.appendChild(this.playlist.markup)
  }

  /**
   * sets a song from the playlist to be the current song
   * @param {Object} song
   */
  setCurrentSong(song) {
    this.playlist.current_song_index = this.playlist.songs.indexOf(song)
    this.audio.setSong(song)
    this.updateProgressBar(0)
    if (this.audio.playing) this.audio.play()
  }

  /**
   * resets the progressbars values to 0
   */
  resetProgressBar() {
    let song_duration = this.audio.element.duration
    if (song_duration == undefined) {
      this.progress_bar.reset(0)
    } else {
      this.progress_bar.reset(song_duration)
    }
  }

  /**
   * updates the progress_bar visually (adjusts the width)
   * @param {Float} current_time: the current time playing
   */
  updateProgressBar(current_time) {
    this.progress_bar.updateBar(current_time)
  }

  //= interactions with the playlist =//
  /**
   * removes all songs from the playlist and stops playback
   */
  emptyPlaylist() {
    this.playlist.empty()
    this.audio.empty()
    this.resetProgressBar()
    this.updateProgressBar(0)
  }

  /**
   * appends a song to the current playlist
   * @param  {Array} songs: an array of songs, also accepts a single song
   */
  appendToPlaylist(songs) {
    this.playlist.appendSongs(songs)
  }

  /**
   * prepends a song to the current playlist
   * @param  {Array} songs: an array of songs, also accepts a single song
   */
  prependToPlaylist(songs) {
    this.playlist.prependSongs(songs)
  }

  /**
   * plays the next song in the playlist, or the first if the current song is the last
   */
  nextSong() {
    let next_song = this.playlist.getNextSong()
    this.setCurrentSong(next_song)
  }

  /**
   * plays the previous song in the playlist, or the last if the current song is the first
   */
  previousSong() {
    let previous_song = this.playlist.getPreviousSong()
    this.setCurrentSong(previous_song)
  }

  /**
   * adds event listeners
   */
  addListeners() {
    this.addAudioListeners()
    this.addControlsListeners()
    this.addProgressListeners()
  }

  /**
   * adds listeners for the audio element
   */
  addAudioListeners() {
    let self = this
      // update the progress_bar to match the current timestamp
    this.audio.element.addEventListener("timeupdate", function() {
        if (self.moving_progress == false) {
          self.updateProgressBar(this.currentTime)
        }
      })
      // reload the progress_bar after the song changed
    this.audio.element.addEventListener('canplay', function() {
        self.resetProgressBar()
        self.updateSongInformation()
      })
      // autoplay next song on finishing one
    this.audio.element.addEventListener('ended', function() {
      self.nextSong()
    })
  }

  /**
   *	adds listeners for the controls (button)
   */
  addControlsListeners() {
    let self = this
    this.controls.buttons.play.addEventListener('click', function() {
      self.audio.play()
    })
    this.controls.buttons.pause.addEventListener('click', function() {
      self.audio.pause()
    })
    this.controls.buttons.skip_next.addEventListener('click', function() {
      self.nextSong()
    })
    this.controls.buttons.skip_previous.addEventListener('click', function() {
      self.previousSong()
    })
  }

  /**
   * adds listeners for the progress bar
   */
  addProgressListeners() {
    let self = this
    this.progress_bar.markup.addEventListener('mousedown', function(e) {
      if (e.preventDefault) e.preventDefault()
      self.moving_progress = true
    })

    this.progress_bar.markup.addEventListener('mousemove', function(e) {
      if (self.moving_progress) {
        let duration = self.progress_bar.element.getAttribute('aria-valuemax')
        let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration)
        self.updateProgressBar(progress)
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
  updateSongInformation() {
    let song = this.playlist.songs[this.playlist.current_song_index]
    let title = song.title
    let artist = song.artist
    this.song_information.element.innerHTML = artist + ' - ' + title
  }

}

function calculate_progress(layerX, offsetLeft, offsetWidth, duration) {
  let p = ((layerX - offsetLeft) / offsetWidth)
  return duration * p
}
