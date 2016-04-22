export default class AudioPlayerControls {
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
   * create the basic html for the controls
   */
  createMarkup() {
    let controls_wrapper = document.createElement('div')
    controls_wrapper.setAttribute('id', 'controls_wrapper')
    // play button
    let play_button = document.createElement('i')
    play_button.setAttribute('id', 'play_button')
    play_button.setAttribute('class', 'mat-icon mat-icon-play')
    // pause button
    let pause_button = document.createElement('i')
    pause_button.setAttribute('id', 'pause_button')
    pause_button.setAttribute('class', 'mat-icon mat-icon-pause')
    // next button
    let next_button = document.createElement('i')
    next_button.setAttribute('id', 'next_button')
    next_button.setAttribute('class', 'mat-icon mat-icon-skip_next')
    // previous button
    let previous_button = document.createElement('i')
    previous_button.setAttribute('id', 'previous_button')
    previous_button.setAttribute('class', 'mat-icon mat-icon-skip_previous')

    controls_wrapper.appendChild(play_button)
    controls_wrapper.appendChild(pause_button)
		controls_wrapper.appendChild(previous_button)
    controls_wrapper.appendChild(next_button)

    this.buttons.play = play_button
    this.buttons.pause = pause_button
    this.buttons.skip_next = next_button
    this.buttons.skip_previous = previous_button

    this.markup = controls_wrapper
  }
}
