export default class ihapSongInformation {
  /**
   * the song information module
   * @constructor
   */
  constructor() {
    this.markup = null
    this.element = null

    this.createMarkup()
  }

  /**
   * creates the html markup for the song information
   */
	createMarkup() {
    // wrapper
		let song_information_wrapper = document.createElement('div')
		song_information_wrapper.setAttribute('id', 'ihap_song_information_wrapper')
		song_information_wrapper.setAttribute('class', 'ihap_song_information_wrapper')

    // actual info div
		let song_information = document.createElement('div')
		song_information.setAttribute('id', 'ihap_song_information_title')
		song_information.setAttribute('class', 'ihap_song_information_title')

    // concat
		song_information_wrapper.appendChild(song_information)

    // set properties
		this.element = song_information
		this.markup = song_information_wrapper
	}
}
