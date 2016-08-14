/**
 * YoutubeApiHelper provides wrapper methods to interact with the youtube api
 */

/**
 * Load youtubes iframe api
 * @param {Function} callback executed on successful load
 */
export function loadYoutubeApi(callback) {
  // only load if undefined
  if (window.yt == undefined) {
    console.log('will load api')
    // load yt api asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    // insert iframe api before the first scripttag
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // fired when api is loaded successfully
    window.onYouTubeIframeAPIReady = function () {
      console.log('callback will come!')
      return callback()
    }
  } else {
    return callback()
  }
}

/**
 * Load youtube video
 * @param {String | HTMLElement } wrapper id of the dom element for the video player or an actual dom element
 * @param {String} videoId id of the youtube video
 * @param {Function} onReady callback to execute once video is ready
 * @param {Function} onStateChange callback to execute on videos state change (e.g. play/pause)
 * @param {Function} onError callback to execute on error
 * @returns {YT.Player} the youtube player element
 */
export function loadYoutubeVideo(wrapper, videoId, onReady, onStateChange, onError) {
  console.log('loadYoutubeVideo')
  // eslint-disable-next-line
  return new YT.Player(wrapper, {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      'onReady': onReady,
      'onStateChange': onStateChange,
      'onError': onError
    }
  });
}