export default class ihapAudio {
  constructor() {
    this.markup = null
    this.element = null
    this.playing = false

    this.createMarkup()
  }

  /**
   * create the basic html for the audio element
   */
  createMarkup() {
    // wrapper
    let player_wrapper = document.createElement('div')
    player_wrapper.setAttribute('id', 'ihap_player_wrapper')

    // actual audio element
    let audio_player = document.createElement('audio')
    audio_player.setAttribute('id', 'player')
    audio_player.setAttribute('src', '')

    // combine wrapper & audio element
    player_wrapper.appendChild(audio_player)

    // set object properties
    this.markup = player_wrapper
    this.element = audio_player
  }

  /**
   * play the current song
   */
  play() {
    this.element.play()
    this.playing = true
  }

  /**
   * pause the current song
   */
  pause() {
    this.element.pause()
    this.playing = false
  }

  empty() {
    this.element.currentTime = 0
    this.element.setAttribute('src', '')
    this.element.setAttribute('aria-valuemax', '0')
  }

  /**
   * sets a new song to the audioplayer and loads it
   * @param {Song} song: the song that should be set
   */
  setSong(song) {
    this.element.currentTime = 0
    this.element.setAttribute('src', song.url)
    this.element.load()
  }
}
