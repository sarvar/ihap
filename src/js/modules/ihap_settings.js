/**
 * Settings module
 * simply sets properties based on the options given by the user
 */
class ihapSettings {
  /**
   * the settings
   * @constructor
   * @private
   */
  constructor(settings) {
    // base
    this.container = document.querySelector(settings.container);

    // playlist
    this.playlist = {
      enabled: settings.playlist.enabled,
      embedded: settings.playlist.embedded,
      container: document.querySelector(settings.playlist.container)
    };

    // youtube
    this.youtube = {
      enabled: settings.youtube.enabled,
      mode: settings.youtube.mode || 'external',
      external_container: document.querySelector(settings.youtube.external_container)
    }
  }
}

export {
  ihapSettings as
  default
}
