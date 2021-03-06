class ihapAudio {
  /**
   * the audio module
   * @constructor
   */
  constructor() {
    this.markup = null
    this.element = null
    this.playing = false

    this.createMarkup()
  }

  /**
   * create the html for the audio element
   */
  createMarkup() {
    // wrapper
    let player_wrapper = document.createElement('div')
    player_wrapper.setAttribute('id', 'ihap_player_wrapper')

    // actual audio element
    let audio_player = document.createElement('audio')
    audio_player.setAttribute('id', 'ihap_player')
    audio_player.setAttribute('src', '')

    // combine wrapper & audio element
    player_wrapper.appendChild(audio_player)

    // set object properties
    this.markup = player_wrapper
    this.element = audio_player
  }

  /**
   * play the currently set song
   */
  play() {
    if (this.element.readyState == 4) {
      this.onCanPlay()
    } else {
      this.element.addEventListener('canplay', this.onCanPlay())
    }
  }

  onCanPlay() {
    if (!this.is_empty()) {
      this.element.play()
      this.playing = true
    }
  }

  /**
   * pause the currently playing song
   */
  pause() {
    this.element.pause()
    this.playing = !this.element.paused
    return this.element.paused
  }

  /**
   * reset the audio element to inital state without src or duration
   */
  empty() {
    this.element.currentTime = 0 // property of actual audio element
    this.element.setAttribute('src', '') // empty src
    this.element.setAttribute('aria-valuemax', '0') // set duration to 0
  }

  is_empty() {
    return this.element.getAttribute('src') == ''
  }

  /**
   * sets a new song to the audioplayer and loads it
   * @param {Song} song the song that should be set
   */
  setSong(song) {
    if (song != undefined && song.url != undefined) {
      this.element.currentTime = 0
      this.element.setAttribute('src', song.url)
      this.element.load()
    } else {
      throw new Error('Invalid song')
    }
  }
}
export {
  ihapAudio as
  default
}
