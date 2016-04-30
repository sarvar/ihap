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
    this.current_song_index = 0
    this.moving_progress = false

    this.initializeihap()
  }

  initializeihap() {
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
		this.container.appendChild(this.song_information.markup)

		this.addListeners()
  }

  setCurrentSong(song){
    this.playlist.setCurrentSong(this, song)
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
    this.audio.element.currentTime = 0
		this.updateProgressBar(0)
    this.playlist.nextSong(this)
  }

  previousSong() {
    this.audio.element.currentTime = 0
		this.updateProgressBar(0)
    this.playlist.previousSong(this)
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
      if(that.moving_progress == false){
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
			that.nextSong(true)
		})
	}

	/**
	 *	adds listeners for the controls (button)
	*/
	addControlsListeners() {
		let that = this
		this.controls.buttons.play.addEventListener('click', function() {
			that.audio.element.play()
		})
		this.controls.buttons.pause.addEventListener('click', function() {
			that.audio.element.pause()
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
			if(e.preventDefault) e.preventDefault()
			that.moving_progress = true
		})

		this.progress_bar.markup.addEventListener('mousemove', function(e) {
			if(that.moving_progress){
				let p = ((e.layerX - this.offsetLeft)/this.offsetWidth)
				let duration = that.progress_bar.element.getAttribute('aria-valuemax')
				that.updateProgressBar(duration*p)
			}
		})

		this.progress_bar.markup.addEventListener('mouseup', function(e) {
			let p = ((e.layerX - this.offsetLeft)/this.offsetWidth)
			let duration = that.progress_bar.element.getAttribute('aria-valuemax')
			that.moving_progress = false
			that.audio.element.currentTime = duration*p
		})
	}

	updateSongInformation() {
		let song = this.playlist.songs[this.current_song_index]
		let title = song.title
		let artist = song.artist
		this.song_information.element.innerHTML = artist + ' - ' + title
	}

}
