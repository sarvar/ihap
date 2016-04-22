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
    let progress_bar_wrapper = document.createElement('div')
    progress_bar_wrapper.setAttribute('id', 'progress_bar_wrapper')

    // actual bar
    let progress_bar = document.createElement('div')
    progress_bar.setAttribute('id', 'progress_bar')
    progress_bar.setAttribute('aria-valuenow', '0')
    progress_bar.setAttribute('aria-valuemin', '0')

		let progress_bar_background = document.createElement('div')
		progress_bar_background.setAttribute('id', 'progress_bar_background')
		progress_bar_background.appendChild(progress_bar)

    progress_bar_wrapper.appendChild(progress_bar_background)
    this.markup = progress_bar_wrapper
    this.element = progress_bar
  }

  /**
   * refreshes max value and current value of the progress bar to match the new song
   * @param {Float} song_duration: the duration of the song currenty playing
  */
  refresh(song_duration) {
    this.element.setAttribute("aria-valuemax", song_duration)
    this.element.setAttribute("aria-valuenow", "0")
  }

	/**
   * @param {Float} current_time: the current time of the song
	*/
  updateBar(current_time) {
    this.element.setAttribute("aria-valuenow", current_time)
		let song_duration = this.element.getAttribute('aria-valuemax')
    let p = (current_time / parseInt(song_duration)) * 100
    this.element.style.width = p + '%'
  }
}
