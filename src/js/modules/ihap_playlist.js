export default class ihapPlaylist {
  /**
   * the playlist module
   * @constructor
   */
  constructor(songs) {
    this.markup = null
    this.element = null
    this.songs = null
    this.current_song_index = 0

    this.createMarkup()
    this.setSongs(songs)
  }

  /**
   * create the html for the playlist
   */
  createMarkup() {
    // wrapper
    let playlist_wrapper = document.createElement('div')
    playlist_wrapper.setAttribute('id', 'ihap_playlist_wrapper')

    // actual playlist
    let playlist = document.createElement('ul')
    playlist.setAttribute('id', 'ihap_playlist')

    // concat
    playlist_wrapper.appendChild(playlist)

    // set properties
    this.markup = playlist_wrapper
    this.element = playlist
  }

  /**
   * sets the songs and updates the playlist
   * @param {Array} songs: an array of songs. also accepts a single song
   */
  setSongs(songs) {
    if (songs != undefined) {
      if (!(songs instanceof Array))
        songs = [songs]

      this.songs = songs
      this._updatePlaylist(this.songs)
    }
  }

  /**
   * returns the next song in the playlist
   * @return {Object} the song
   */
  getNextSong() {
    if (this._songsPresent()) {
      let new_index = this.current_song_index + 1
      if (this.songs.length > 1 && this.songs.length > new_index) {
        var id = new_index
      } else {
        var id = 0
      }
    }
    return this.songs[id]
  }

  /**
   * return the previous song in the playlist
   * @return {object} the song
   */
  getPreviousSong() {
    if (this._songsPresent()) {
      let new_index = this.current_song_index - 1
      if (this.songs.length > 1 && new_index >= 0 && this.songs.length > new_index) {
        var id = new_index
      } else {
        var id = this.songs.length - 1
      }
    }
    return this.songs[id]
  }

  /**
   * resets the playlist
   */
  empty() {
    this.setSongs([])
    this.current_song_index = -1
  }

  /**
   * appends the given songs to the current playlist
   * @param {Array} songs: an array of song objects. also accepts a single song
   */
  appendSongs(songs) {
    if (songs != undefined) {
      let new_songs = this.songs.concat(songs)
      this.setSongs(new_songs)
    } else {}
  }

  /**
   * prepends the given songs to the current playlist
   * @param {Array} songs: an array of song objects. also accepts a single song
   */
  prependSongs(songs) {
    if (songs != undefined) {
      if (!(songs instanceof Array))
        songs = [songs]

      let new_songs = songs.concat(this.songs)
      this.setSongs(new_songs)
    }
  }

  //= privates =//
  /**
   * checks if songs are currently set in the playlist
   * @return {Bool} true if songs are present
   */
  _songsPresent() {
    return this.songs != undefined && this.songs != [] && this.current_song_index >= 0
  }

  /**
   * empties the html of the actual playlist
   */
  _resetPlaylist() {
    this.element.innerHTML = ''
  }

  /**
   * update the playlist with a new set of songs
   * @param  {Array} songs: an array of songs. also accepts a single song
   */
  _updatePlaylist(songs) {
    this._resetPlaylist()
    if (!(songs instanceof Array))
      songs = [songs]

    for (var i = 0; i < songs.length; i++) {
      let new_point = document.createElement('li')
      let new_point_content = document.createTextNode(songs[i].title)
      new_point.appendChild(new_point_content)
      this.element.appendChild(new_point)
    }
  }
}
