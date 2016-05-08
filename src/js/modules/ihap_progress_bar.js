export default class ihapProgressBar {
  /**
   * the progressbar module
   * @constructor
   */
  constructor() {
    this.markup = null
    this.element = null

    this.createMarkup()
  }

  /**
   * create the html for the progress bar
   */
  createMarkup() {
    // wrapper
    let progress_bar_wrapper = document.createElement('div')
    progress_bar_wrapper.setAttribute('id', 'ihap_progress_bar_wrapper')
    progress_bar_wrapper.setAttribute('class', 'ihap_progress_bar_wrapper')

    // actual bar
    let progress_bar = document.createElement('div')
    progress_bar.setAttribute('id', 'ihap_progress_bar')
    progress_bar.setAttribute('class', 'ihap_progress_bar')
    progress_bar.setAttribute('aria-valuenow', '0')
    progress_bar.setAttribute('aria-valuemin', '0')

    // grey background
    let progress_bar_background = document.createElement('div')
    progress_bar_background.setAttribute('id', 'ihap_progress_bar_background')
    progress_bar_background.setAttribute('class', 'ihap_progress_bar_background')
    progress_bar_background.appendChild(progress_bar)

    // concat
    progress_bar_wrapper.appendChild(progress_bar_background)

    // set properties
    this.markup = progress_bar_wrapper
    this.element = progress_bar
  }

  /**
   * resets max value and current value of the progress bar to match the new song
   * @param {Float} song_duration the duration of the song currenty playing
   */
  reset(song_duration) {
    if (song_duration != undefined && song_duration != NaN && song_duration > 0) {
      this.element.setAttribute("aria-valuemax", song_duration)
      this.element.setAttribute("aria-valuenow", "0")
    }
  }

  /**
   * updates the progressbar visually - sets its width
   * @param {Float} current_time the current time of the song
   */
  updateBar(current_time) {
    if (current_time != undefined && current_time != NaN && current_time >= 0) {
      this.element.setAttribute("aria-valuenow", current_time)
      let song_duration = this.element.getAttribute('aria-valuemax')
      let p = (current_time / parseFloat(song_duration)) * 100
      this.element.style.width = p + '%'
    }
  }
}
