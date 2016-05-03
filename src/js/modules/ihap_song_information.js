export default class ihapSongInformation {
  constructor() {
    this.markup = null
    this.element = null

    this.createMarkup()
  }

	createMarkup() {
		let song_information_wrapper = document.createElement('div')
		song_information_wrapper.setAttribute('id', 'ihap_song_information_wrapper')
		song_information_wrapper.setAttribute('class', 'ihap_song_information_wrapper')

		let song_information = document.createElement('div')
		song_information.setAttribute('id', 'ihap_song_information_title')
		song_information.setAttribute('class', 'ihap_song_information_title')

		song_information_wrapper.appendChild(song_information)
		this.element = song_information
		this.markup = song_information_wrapper
	}
}
