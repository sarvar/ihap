class ihapSettings {
  /**
   * the settings
   * @constructor
   */
  constructor(settings) {
    // base
    this.container = document.querySelector(settings.container)

    // playlist
    this.playlist = {
      enabled: settings.playlist.enabled,
      embedded: settings.playlist.embedded,
      container: document.querySelector(settings.playlist.container)
    }

    // youtube
    this.youtube = {
      enabled: settings.youtube.enabled,
      embedded: settings.youtube.embedded,
      container: document.querySelector(settings.youtube.container)
    }
  }
}

export {
  ihapSettings as
  default
}
