export default class AudioPlayerProgressBar {
  constructor() {
    this.markup = null
    this.element = null

    this.createMarkup()
  }

  /**
   * create the basic html for the progress bar. wrapper & input with type=range
   */
  createMarkup() {
    // wrapper
    var progress_bar_wrapper = document.createElement('div')
    progress_bar_wrapper.setAttribute('id', 'progress_bar_wrapper')

    // actual bar
    var progress_bar = document.createElement('input')
    progress_bar.setAttribute('id', 'progress_bar')
    progress_bar.setAttribute('min', '0')
    progress_bar.setAttribute('value', '0')
    progress_bar.setAttribute('type', 'range')

    progress_bar_wrapper.appendChild(progress_bar)
    this.markup = progress_bar_wrapper
    this.element = progress_bar
  }

  /**
   * refreshes max value and current value of the progress bar to match the new song
   * @param {Float} song_duration: the duration of the song currenty playing
  */
  refresh(song_duration) {
    this.element.setAttribute("max", song_duration)
    this.element.setAttribute("value", "0")
  }

  updateThumb(current_time) {
    this.element.value = current_time
  }

  updateBar(current_time) {
    var value = this.element.value/this.element.max;
    this.element.style.backgroundImage = [
      '-webkit-gradient(',
        'linear, ',
        'left top, ',
        'right top, ',
        'color-stop(' + value + ', orange), ',
        'color-stop(' + value + ', lightgrey)',
      ')'
    ].join('');
  }
}