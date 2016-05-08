export default class ihapPlaylist {
  constructor(songs) {
    this.markup = null
    this.element = null
    this.songs = null
    this.current_song_index = 0

    this.createMarkup()
    this.setSongs(songs)
  }

  /**
   * create the basic html for the playlist
   */
  createMarkup() {
    let playlist_wrapper = document.createElement('div')
    playlist_wrapper.setAttribute('id', 'ihap_playlist_wrapper')

    let playlist = document.createElement('ul')
    playlist.setAttribute('id', 'ihap_playlist')
    this.element = playlist

    playlist_wrapper.appendChild(playlist)
    this.markup = playlist_wrapper
  }

  setSongs(songs) {
    this.songs = songs
    this._updatePlaylist(this.songs)
  }

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

  empty() {
    this.songs = []
    this.current_song_index = -1
  }

  /**
   * appends the given songs to the current playlist
   * @param {Array} songs: an array of song objects. also accepts a single song
   */
  appendSongs(songs) {
    if (songs != undefined) {
      let new_songs = this.songs = this.songs.concat(songs)
      this.setSongs(new_songs)
    } else {
    }
  }

  /**
   * prepends the given songs to the current playlist
   * @param {Array} songs: an array of song objects. also accepts a single song
   */
  prependSongs(songs) {
    if (songs != undefined) {
      if (!(songs instanceof Array)) {
        songs = [songs]
      }
      let new_songs = this.songs = songs.concat(this.songs)
      this.setSongs(new_songs)
    }
  }

  //= privates =//

  _songsPresent() {
    return this.songs != undefined && this.songs != [] && this.current_song_index >= 0
  }

  _resetPlaylist() {
    this.element.innerHTML = ''
  }

  _updatePlaylist(songs) {
    this._resetPlaylist()
    for (var i = 0; i < songs.length; i++) {
      let new_point = document.createElement('li')
      let new_point_content = document.createTextNode(songs[i].title)
      new_point.appendChild(new_point_content)
      this.element.appendChild(new_point)
    }
  }
}
