class ihapState {
  /**
   * the state module. holds the current state of the player:
   * audio
   * * playing
   * playlist
   * * songs
   * * current_song_index
   * progress
   * * moving
   * @constructor
   */
  constructor() {
    this.audio = {
      playing: false
    }

    this.playlist = {
      songs: [],
      current_song_index: 0
    }

    this.progress = {
      moving: false
    }
  }
}

export { ihapState as default }
