// name to avoid naming conflicts with the actual 'Audio' class
export default class AudioElement {
  constructor(that) {
    this.markup = null
    this.element = null

    this.createMarkup()
    this.addListeners(that)
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

  /**
   * adds the event listeners for the audio element
   * @param {Object} that: the AudioPlayer parent object
   */
  addListeners(that) {
    this.element.addEventListener("timeupdate", function() {
      that.updateProgress()
    })
    this.element.addEventListener('canplay', function() {
      that.refreshProgressBar()
    })
		this.element.addEventListener('ended', function() {
			that.nextSong(true)
		})
  }
}
