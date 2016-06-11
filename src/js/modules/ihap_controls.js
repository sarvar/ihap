/**
 * module to handle controls
 * @private
 */
class ihapControls {
  /**
   * the module for the player controls
   * @constructor
   * @private
   */
  constructor() {
    this.markup = null
    this.buttons = {
      play: null,
      pause: null,
      skip_next: null,
      skip_previous: null
    }

    this.createMarkup()
  }

  /**
   * create the html for the controls
   */
  createMarkup() {
    // wrapper
    let controls_wrapper = document.createElement('div')
    controls_wrapper.setAttribute('id', 'ihap_controls_wrapper')
    controls_wrapper.setAttribute('class', 'ihap_controls_wrapper')
    // play button
    let play_button = document.createElement('i')
    play_button.setAttribute('id', 'ihap_controls_play_button')
    play_button.setAttribute('class', 'material-icons ihap_controls_play_button')
    play_button.innerHTML = 'play_arrow'
    // pause button
    let pause_button = document.createElement('i')
    pause_button.setAttribute('id', 'ihap_controls_pause_button')
    pause_button.setAttribute('class', 'material-icons ihap_controls_pause_button')
    pause_button.innerHTML = 'pause'
    // next button
    let next_button = document.createElement('i')
    next_button.setAttribute('id', 'ihap_controls_next_button')
    next_button.setAttribute('class', 'material-icons ihap_controls_next_button')
    next_button.innerHTML = 'skip_next'
    // previous button
    let previous_button = document.createElement('i')
    previous_button.setAttribute('id', 'ihap_controls_previous_button')
    previous_button.setAttribute('class', 'material-icons ihap_controls_previous_button')
    previous_button.innerHTML = 'skip_previous'

    // concat
    controls_wrapper.appendChild(play_button)
    controls_wrapper.appendChild(pause_button)
		controls_wrapper.appendChild(previous_button)
    controls_wrapper.appendChild(next_button)

    // set properties
    this.buttons.play = play_button
    this.buttons.pause = pause_button
    this.buttons.skip_next = next_button
    this.buttons.skip_previous = previous_button
    this.markup = controls_wrapper
  }
}

export { ihapControls as default }
