export default class ihapPlaylist {
  constructor(songs) {
    //this.markup = null
    this.songs = songs
    this.current_song_index = 0

    //this.createMarkup()
  }

  // playlist currently has no markup. not visible in fronent yet
  //createMarkup() {}

  getNextSong() {
    if (this.songs != undefined && this.songs != []) {
      let new_index = this.current_song_index + 1
      if (this.songs.length > 1 && this.songs.length > new_index) {
        var id = new_index
      } else {
        var id = 0
      }
    }
    return this.songs[id]
  }

  getPreviousSong() {
    if (this.songs != undefined && this.songs != []) {
      let new_index = this.current_song_index - 1
      if (this.songs.length > 1 && new_index >= 0 && this.songs.length > new_index) {
        var id = new_index
      } else {
        var id = this.songs.length - 1
      }
    }
    return this.songs[id]
  }

  setCurrentSong(that, song) {
    that.audio.element.setAttribute('src', song.url)
    that.audio.element.load()
  }
}
