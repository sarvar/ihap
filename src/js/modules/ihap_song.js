/**
 * song
 * @private
 */
class ihapSong {
  /**
   * the song module
   * @constructor
   * @private
   */
  constructor(song) {
    this.title = song.title
    this.artist = song.artist
    this.id = song.id
    this.url = song.url

    this.type = this._getType()
  }

  /**
   * get the type of the song based on its url
   * @returns {String} type
   * @private
   */
  _getType() {
    let regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g
    if (this.url.match(regex)) {
      return 'youtube_video'
    } else {
      return 'song'
    }
  }

  /**
   * extracts the youtube video id from the url
   * @returns {String} the id
   * @returns {Boolean} false if song is no youtube video
   */
  getYoutubeId() {
    if (this.type == 'youtube_video') {
      var id_regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
      return this.url.match(id_regex)[1]
    } else {
      return false
    }
  }
}

export {
  ihapSong as
    default
}
