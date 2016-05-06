import ihapAudio from './modules/ihap_audio'
import ihapControls from './modules/ihap_controls'
import ihapPlaylist from './modules/ihap_playlist'
import ihapProgressBar from './modules/ihap_progress_bar'
import ihapSongInformation from './modules/ihap_song_information'

export default class ihap {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)

    this.audio = new ihapAudio()
    this.controls = new ihapControls()
    this.playlist = new ihapPlaylist(data.songs)
    this.progress_bar = new ihapProgressBar()
    this.song_information = new ihapSongInformation()
    this.moving_progress = false

    this.initializeihap()
  }

  initializeihap() {
    if (this.container == undefined || this.container == undefined) {
      throw ('Cannot find container "' + this.settings.container + '". Please make sure that an element with this id is present.')
    } else {
      this.createComponents()
      if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
        this.setCurrentSong(this.playlist.songs[0])
      }
    }
  }

  /**
   * creates the html markup
   */
  createComponents() {
    this.container.appendChild(this.audio.markup)
    this.container.appendChild(this.controls.markup)
    this.container.appendChild(this.progress_bar.markup)
    this.container.appendChild(this.song_information.markup)

    this.addListeners()
  }

  setCurrentSong(song) {
    this.playlist.current_song_index = this.playlist.songs.indexOf(song)
    this.audio.setSong(song)
    this.updateProgressBar(0)
    if (this.audio.playing) this.audio.play()
  }

  resetProgressBar() {
    let song_duration = this.audio.element.duration
    this.progress_bar.refresh(song_duration)
  }

  /**
   * updates the progress_bar visually (adjusts the width)
   * @param {Float} current_time: the current time playing
   */
  updateProgressBar(current_time) {
    this.progress_bar.updateBar(current_time)
  }

  nextSong() {
    let next_song = this.playlist.getNextSong()
    this.setCurrentSong(next_song)
  }

  previousSong() {
    let previous_song = this.playlist.getPreviousSong()
    this.setCurrentSong(previous_song)
  }

  addListeners() {
    this.addAudioListeners()
    this.addControlsListeners()
    this.addProgressListeners()
  }

  /**
   * adds listeners for the audio element
   */
  addAudioListeners() {
    let that = this
      // update the progress_bar to match the current timestamp
    this.audio.element.addEventListener("timeupdate", function() {
        if (that.moving_progress == false) {
          that.updateProgressBar(this.currentTime)
        }
      })
      // reload the progress_bar after the song changed
    this.audio.element.addEventListener('canplay', function() {
        that.resetProgressBar()
        that.updateSongInformation()
      })
      // autoplay next song on finishing one
    this.audio.element.addEventListener('ended', function() {
      that.nextSong()
    })
  }

  /**
   *	adds listeners for the controls (button)
   */
  addControlsListeners() {
    let that = this
    this.controls.buttons.play.addEventListener('click', function() {
      that.audio.play()
    })
    this.controls.buttons.pause.addEventListener('click', function() {
      that.audio.pause()
    })
    this.controls.buttons.skip_next.addEventListener('click', function() {
      that.nextSong()
    })
    this.controls.buttons.skip_previous.addEventListener('click', function() {
      that.previousSong()
    })
  }

  addProgressListeners() {
    let that = this
    this.progress_bar.markup.addEventListener('mousedown', function(e) {
      if (e.preventDefault) e.preventDefault()
      that.moving_progress = true
    })

    this.progress_bar.markup.addEventListener('mousemove', function(e) {
      if (that.moving_progress) {
        let duration = that.progress_bar.element.getAttribute('aria-valuemax')
        let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration)
        that.updateProgressBar(progress)
      }
    })

    this.progress_bar.markup.addEventListener('mouseup', function(e) {
      let duration = that.progress_bar.element.getAttribute('aria-valuemax')
      let progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration)
      that.audio.element.currentTime = progress
      that.moving_progress = false
    })
  }

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
