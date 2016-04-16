export default class AudioPlayerPlaylist {
  constructor(that, songs) {
    //this.markup = null
    this.songs = songs
    this.current_song_index = null

    //this.createMarkup()
    this.addListeners(that)
  }

  // playlist currently has no markup. not visible in fronent yet
  //createMarkup() {}

  addListeners() {}

  nextSong(that) {
    if (this.songs != undefined && this.songs.length > 1){
			var playing = that.audio.element.paused !== true || playing
			var new_index = this.current_song_index + 1
			if (this.songs.length > new_index) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = 0
			}
      this.setCurrentSong(that, this.songs[this.current_song_index])
			if (playing === true) {
				that.audio.element.play()
			}
    }
  }

  previousSong(that) {
    if (this.songs != undefined && this.songs.length > 1){
      var playing = that.audio.element.paused !== true
      var new_index = this.current_song_index - 1
      if (new_index >= 0) {
        this.current_song_index = new_index
      } else {
        this.current_song_index = this.songs.length - 1
      }
      this.setCurrentSong(that, this.songs[this.current_song_index])
      if (playing === true) {
        that.audio.element.play()
      }
    }
  }

  setCurrentSong(that, song){
    that.audio.element.setAttribute('src', song.url)
    that.audio.element.load()
  }
}
