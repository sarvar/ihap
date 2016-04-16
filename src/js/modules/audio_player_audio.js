export default class AudioPlayerAudio {
  constructor() {
    this.markup = null
    this.element = null

    this.createMarkup()
  }

  /**
   * create the basic html for the audio element
   */
  createMarkup() {
    // wrapper
    var player_wrapper = document.createElement('div')
    player_wrapper.setAttribute('id', 'player_wrapper')

    // actual audio element
    var audio_player = document.createElement('audio')
    audio_player.setAttribute('id', 'player')
    audio_player.setAttribute('src', '')

    player_wrapper.appendChild(audio_player)

    this.markup = player_wrapper
    this.element = audio_player
  }
}
