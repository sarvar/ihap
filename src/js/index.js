import ProgressBar from './modules/progress_bar'

export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)
    this.songs = data.songs
    this.current_song_index = null
    this.audio = null
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
    this.createPlayer()
    this.createControls()
    this.container.appendChild(this.progress_bar.markup)
    this.addEventListeners()
  }

  createPlayer() {
    var player_wrapper = document.createElement('div')
    player_wrapper.setAttribute('id', 'player_wrapper')

    var audio_player = document.createElement('audio')
    audio_player.setAttribute('id', 'player')
    audio_player.setAttribute('src', '')

    player_wrapper.appendChild(audio_player)
    this.container.appendChild(player_wrapper)

    this.audio = document.getElementById('player')
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
    this.audio.addEventListener("timeupdate", function() {
      that.updateProgress()
    })
    this.audio.addEventListener('canplay', function() {
      that.refreshProgressBar()
    })
		this.audio.addEventListener('ended', function() {
			that.nextSong(true)
		})
    this.play_button.addEventListener('click', function() {
      that.audio.play()
      this.className += ' disabled'
      that.pause_button.className = "mat-icon mat-icon-pause"
    })
    this.pause_button.addEventListener('click', function() {
      that.audio.pause()
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
    this.audio.setAttribute('src', song.url)
    this.audio.load()
  }

  refreshProgressBar() {
    var song_duration = this.audio.duration
    this.progress_bar.refresh(song_duration)
  }

  updateProgress() {
    var current_time = this.audio.currentTime
    this.progress_bar.update(current_time)
  }

  nextSong(playing) {
    if (this.songs != undefined && this.songs.length > 1){
			var playing = this.audio.paused !== true || playing
			var new_index = this.current_song_index + 1
			if (this.songs.length > new_index) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = 0
			}
      this.setCurrentSong(this.songs[this.current_song_index])
			if (playing === true) {
				this.audio.play()
			}
    }
  }

  previousSong() {
    if (this.songs != undefined && this.songs.length > 1){
			var playing = this.audio.paused !== true
			var new_index = this.current_song_index - 1
			if (new_index >= 0) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = this.songs.length - 1
			}
      this.setCurrentSong(this.songs[this.current_song_index])
			if (playing === true) {
				this.audio.play()
    	}
    }
  }

}
