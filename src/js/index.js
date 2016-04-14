import AudioElement from './modules/audio_element'
import PlayerControls from './modules/player_controls'
import ProgressBar from './modules/progress_bar'

export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)
    this.songs = data.songs
    this.current_song_index = null

    this.audio = new AudioElement(this)
    this.progress_bar = new ProgressBar(this)
    this.controls = new PlayerControls(this)

    this.play_button = null
    this.pause_button = null
    this.initializeAudioPlayer()
  }

  initializeAudioPlayer() {
    this.createComponents()
    if (this.songs != undefined && this.songs.length != 0){
      this.setCurrentSong(this.songs[0])
      this.current_song_index = 0
    }
  }

  createComponents() {
    this.container.appendChild(this.audio.markup)
    this.container.appendChild(this.controls.markup)
    this.container.appendChild(this.progress_bar.markup)
  }

  setCurrentSong(song){
    this.audio.element.setAttribute('src', song.url)
    this.audio.element.load()
  }

  refreshProgressBar() {
    var song_duration = this.audio.element.duration
    this.progress_bar.refresh(song_duration)
  }

  updateProgress() {
    var current_time = this.audio.element.currentTime
    this.progress_bar.update(current_time)
  }

  nextSong(playing) {
    if (this.songs != undefined && this.songs.length > 1){
			var playing = this.audio.element.paused !== true || playing
			var new_index = this.current_song_index + 1
			if (this.songs.length > new_index) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = 0
			}
      this.setCurrentSong(this.songs[this.current_song_index])
			if (playing === true) {
				this.audio.element.play()
			}
    }
  }

  previousSong() {
    if (this.songs != undefined && this.songs.length > 1){
			var playing = this.audio.element.paused !== true
			var new_index = this.current_song_index - 1
			if (new_index >= 0) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = this.songs.length - 1
			}
      this.setCurrentSong(this.songs[this.current_song_index])
			if (playing === true) {
				this.audio.element.play()
    	}
    }
  }

}
