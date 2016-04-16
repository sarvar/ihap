export default class AudioPlayerProgressBar {
  constructor(that) {
    this.markup = null
    this.element = null

    this.createMarkup()
    this.addListeners(that)
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
   * adds the event listeners for the progress bar
   * @param {Object} that: the AudioPlayer parent object
   */
  addListeners(that) {
    this.element.addEventListener('click', function(e) {
      //var new_time = (e.pageX - this.offsetLeft) * this.max / this.offsetWidth
      that.audio.element.currentTime = this.value
    })
  }

  /**
   * refreshes max value and current value of the progress bar to match the new song
   * @param {Float} song_duration: the duration of the song currenty playing
  */
  refresh(song_duration) {
    this.element.setAttribute("max", song_duration)
    this.element.setAttribute("value", "0")
  }

  /**
   * updates the progress bar visually, moves the left background to the right
   * @param {Float} current_time: the current time the song is playing at
  */
  update(current_time) {
    this.element.value = current_time
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
