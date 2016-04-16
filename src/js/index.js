import AudioPlayerAudio from './modules/audio_player_audio'
import PlayerControls from './modules/player_controls'
import Playlist from './modules/playlist'
import ProgressBar from './modules/progress_bar'

export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)

    this.audio = new AudioPlayerAudio(this)
    this.controls = new PlayerControls(this)
    this.playlist = new Playlist(this, data.songs)
    this.progress_bar = new ProgressBar(this)

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

}
