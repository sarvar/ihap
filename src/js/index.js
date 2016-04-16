import AudioPlayerAudio from './modules/audio_player_audio'
import AudioPlayerControls from './modules/audio_player_controls'
import AudioPlayerPlaylist from './modules/audio_player_playlist'
import AudioPlayerProgressBar from './modules/audio_player_progress_bar'

export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)

    this.audio = new AudioPlayerAudio()
    this.controls = new AudioPlayerControls()
    this.playlist = new AudioPlayerPlaylist(data.songs)
    this.progress_bar = new AudioPlayerProgressBar()

    this.initializeAudioPlayer()
  }

  initializeAudioPlayer() {
    this.createComponents()
    if (this.playlist.songs != undefined && this.playlist.songs.length != 0){
      this.setCurrentSong(this.playlist.songs[0])
      this.current_song_index = 0
    }
  }

  /**
   * creates the html markup
  */
  createComponents() {
    this.container.appendChild(this.audio.markup)
    this.container.appendChild(this.controls.markup)
    this.container.appendChild(this.progress_bar.markup)

		this.addListeners()
  }

  setCurrentSong(song){
    this.playlist.setCurrentSong(this, song)
  }

  refreshProgressBar() {
    var song_duration = this.audio.element.duration
    this.progress_bar.refresh(song_duration)
  }

  updateProgress() {
    var current_time = this.audio.element.currentTime
    this.progress_bar.update(current_time)
  }

  nextSong() {
    this.playlist.nextSong(this)
  }

  previousSong() {
    this.playlist.previousSong(this)
  }

	addListeners() {
		var that = this
		//=== audio ===//
		this.audio.element.addEventListener("timeupdate", function() {
			that.updateProgress()
		})
		this.audio.element.addEventListener('canplay', function() {
			that.refreshProgressBar()
		})
		this.audio.element.addEventListener('ended', function() {
			that.nextSong(true)
		})

		//=== controls ===//
		this.controls.buttons.play.addEventListener('click', function() {
			that.audio.element.play()
			this.className += ' disabled'
			//that.pause_button.className = "mat-icon mat-icon-pause"
		})
		this.controls.buttons.pause.addEventListener('click', function() {
			that.audio.element.pause()
			this.className += ' disabled'
		//  that.play_button.className = "mat-icon mat-icon-play"
		})
		this.controls.buttons.skip_next.addEventListener('click', function() {
			that.nextSong()
		})
		this.controls.buttons.skip_previous.addEventListener('click', function() {
			that.previousSong()
		})

		//=== progress ===//
		this.progress_bar.element.addEventListener('click', function(e) {
			//var new_time = (e.pageX - this.offsetLeft) * this.max / this.offsetWidth
			that.audio.element.currentTime = this.value
		})
	}

}
