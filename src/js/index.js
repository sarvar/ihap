import ProgressBar from './modules/progress_bar'
import AudioElement from './modules/audio_element'

export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)
    this.songs = data.songs
    this.current_song_index = null

    this.audio = new AudioElement(this)
    this.progress_bar = new ProgressBar(this)
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
    this.createControls()
    this.container.appendChild(this.progress_bar.markup)
    this.addEventListeners()
  }

  createControls() {
    var controls_wrapper = document.createElement('div')
    controls_wrapper.setAttribute('id', 'controls_wrapper')
    // play button
    this.play_button = document.createElement('i')
    this.play_button.setAttribute('id', 'play_button')
    this.play_button.setAttribute('class', 'mat-icon mat-icon-play')
    // pause button
    this.pause_button = document.createElement('i')
    this.pause_button.setAttribute('id', 'pause_button')
    this.pause_button.setAttribute('class', 'mat-icon mat-icon-pause')
    // next button
    var next_button = document.createElement('i')
    next_button.setAttribute('id', 'next_button')
    next_button.setAttribute('class', 'mat-icon mat-icon-skip_next')
    // previous button
    var previous_button = document.createElement('i')
    previous_button.setAttribute('id', 'previous_button')
    previous_button.setAttribute('class', 'mat-icon mat-icon-skip_previous')

    controls_wrapper.appendChild(this.play_button)
    controls_wrapper.appendChild(this.pause_button)
		controls_wrapper.appendChild(previous_button)
    controls_wrapper.appendChild(next_button)
    this.container.appendChild(controls_wrapper)
  }

  addEventListeners() {
    var that = this

    this.play_button.addEventListener('click', function() {
      that.audio.element.play()
      this.className += ' disabled'
      that.pause_button.className = "mat-icon mat-icon-pause"
    })
    this.pause_button.addEventListener('click', function() {
      that.audio.element.pause()
      this.className += ' disabled'
      that.play_button.className = "mat-icon mat-icon-play"
    })
    document.getElementById('next_button').addEventListener('click', function() {
      that.nextSong()
    })
    document.getElementById('previous_button').addEventListener('click', function() {
      that.previousSong()
    })
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
