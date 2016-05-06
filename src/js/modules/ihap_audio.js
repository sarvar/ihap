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
    try {
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
    } catch (e) {
      console.log("Could not create markup for audio element: " + e)
    }
  }

  /**
   * play the current song
   */
  play() {
    try {
      this.element.play()
      this.playing = true
    } catch (e) {
      console.log("Could not play: " + e)
    }
  }

  /**
   * pause the current song
   */
  pause() {
    try {
      this.element.pause()
      this.playing = false
    } catch (e) {
      console.log("Could not pause: " + e)
    }
  }

  /**
   * sets a new song to the audioplayer and loads it
   * @param {Song} song: the song that should be set
   */
  setSong(song) {
    try {
      this.element.setAttribute('src', song.url)
      this.element.load()
    } catch (e) {
      console.log("Could not set song: " + e)
    }
  }
}
