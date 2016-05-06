export default class ihapPlaylist {
  constructor(songs) {
    //this.markup = null
    this.songs = songs
    this.current_song_index = null

    //this.createMarkup()
  }

  // playlist currently has no markup. not visible in fronent yet
  //createMarkup() {}

  nextSong(that) {
    if (this.songs != undefined && this.songs.length > 1) {
      let playing = that.audio.playing
      let new_index = that.current_song_index + 1
      if (this.songs.length > new_index) {
        that.current_song_index = new_index
      } else {
        that.current_song_index = 0
      }
      this.setCurrentSong(that, this.songs[that.current_song_index])
      if (playing === true) {
        that.audio.element.play()
      }
    }
  }

  previousSong(that) {
    if (this.songs != undefined && this.songs.length > 1) {
      let playing = that.audio.playing
      let new_index = that.current_song_index - 1
      if (new_index >= 0) {
        that.current_song_index = new_index
      } else {
        that.current_song_index = this.songs.length - 1
      }
      this.setCurrentSong(that, this.songs[that.current_song_index])
      if (playing === true) {
        that.audio.element.play()
      }
    }
  }

  setCurrentSong(that, song) {
    that.audio.element.setAttribute('src', song.url)
    that.audio.element.load()
  }
}
