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
    this.current_song_index = 0
    this.moving_progress = false

    this.initializeAudioPlayer()
  }

  initializeAudioPlayer() {
    this.createComponents()
    if (this.playlist.songs != undefined && this.playlist.songs.length != 0){
      this.setCurrentSong(this.playlist.songs[0])
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

  updateProgressBar(current_time) {
    var current_time = this.audio.element.currentTime
    this.progress_bar.updateBar(current_time)
  }

  nextSong() {
    this.audio.element.currentTime = 0
    this.playlist.nextSong(this)
  }

  previousSong() {
    this.audio.element.currentTime = 0
    this.playlist.previousSong(this)
  }

	addListeners() {
		var that = this
		//=== audio ===//
		this.audio.element.addEventListener("timeupdate", function() {
      that.updateProgressBar()
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
			that.controls.buttons.pause.className = "mat-icon mat-icon-pause"
		})
		this.controls.buttons.pause.addEventListener('click', function() {
			that.audio.element.pause()
			this.className += ' disabled'
		  that.controls.buttons.play.className = "mat-icon mat-icon-play"
		})
		this.controls.buttons.skip_next.addEventListener('click', function() {
			that.nextSong()
		})
		this.controls.buttons.skip_previous.addEventListener('click', function() {
			that.previousSong()
		})

		//=== progress ===//
		// this.progress_bar.element.addEventListener('click', function() {
		// 	that.audio.element.currentTime = this.value
		// })

    this.progress_bar.markup.addEventListener('mousedown', function(e) {
      //that.audio.element.removeEventListener('timeupdate', onTimeUpdate)
      if(e.preventDefault) e.preventDefault()
      console.log('mousedown!')
      that.moving_progress = true
      var x = e.pageX - this.offsetLeft
      var p = (x/this.offsetWidth)
      that.progress_bar.element.style.width = p*100 + '%'
    })

    this.progress_bar.markup.addEventListener('mousemove', function(e) {
      if(that.moving_progress)
        console.log('moving!')
        var x = e.pageX - this.offsetLeft
        var p = ((e.pageX - this.offsetLeft)/this.offsetWidth)
        var duration = that.progress_bar.element.getAttribute('aria-valuemax')
        that.updateProgressBar(duration*p)
    })

    this.progress_bar.markup.addEventListener('mouseup', function() {
      //that.audio.element.addEventListener('timeupdate', onTimeUpdate)
      console.log('mouseup!')
      that.moving_progress = false
    })
  }
}
