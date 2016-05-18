class ihapSong {
  /**
   * the song module
   * @constructor
   */
  constructor(song) {
    this.title = song.title
    this.artist = song.artist
    this.id = song.id
    this.url = song.url

    this.type = null

    this._setType()
  }

  _setType() {
    if (this.url.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g)) {
      this.type = 'youtube_video'
    } else {
      this.type = 'song'
    }
  }
}

export { ihapSong as default }
