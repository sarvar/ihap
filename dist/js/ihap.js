(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ihap", [], factory);
	else if(typeof exports === 'object')
		exports["ihap"] = factory();
	else
		root["ihap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //= module imports ==//
	
	
	var _ihap_audio = __webpack_require__(1);
	
	var _ihap_audio2 = _interopRequireDefault(_ihap_audio);
	
	var _ihap_controls = __webpack_require__(2);
	
	var _ihap_controls2 = _interopRequireDefault(_ihap_controls);
	
	var _ihap_playlist = __webpack_require__(3);
	
	var _ihap_playlist2 = _interopRequireDefault(_ihap_playlist);
	
	var _ihap_progress_bar = __webpack_require__(4);
	
	var _ihap_progress_bar2 = _interopRequireDefault(_ihap_progress_bar);
	
	var _ihap_song_information = __webpack_require__(5);
	
	var _ihap_song_information2 = _interopRequireDefault(_ihap_song_information);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihap = function () {
	  /**
	   * @constructor
	   */
	
	  function ihap(data) {
	    _classCallCheck(this, ihap);
	
	    this.settings = data.settings;
	    this.container = document.getElementById(data.settings.container);
	    this.playlist_container = document.getElementById(data.settings.playlist_container);
	
	    this.audio = new _ihap_audio2.default();
	    this.controls = new _ihap_controls2.default();
	    this.playlist = new _ihap_playlist2.default(data.songs);
	    this.progress_bar = new _ihap_progress_bar2.default();
	    this.song_information = new _ihap_song_information2.default();
	    this.moving_progress = false;
	
	    this._initializeihap();
	  }
	
	  /**
	   * ******************
	   * public api methods
	   * ******************
	   */
	
	  /**
	   * ********************
	   * basic audio controls
	   * ********************
	   */
	
	  /**
	   * plays the current song
	   */
	
	
	  _createClass(ihap, [{
	    key: 'play',
	    value: function play() {
	      this.audio.play();
	    }
	
	    /**
	     * pause the current song
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.audio.pause();
	    }
	
	    /**
	     * plays the next song in the playlist, or the first if the current song is the last
	     */
	
	  }, {
	    key: 'next',
	    value: function next() {
	      var next_song = this.playlist.getNextSong();
	      this.changeSong(next_song);
	    }
	
	    /**
	     * plays the previous song in the playlist, or the last if the current song is the first
	     */
	
	  }, {
	    key: 'prev',
	    value: function prev() {
	      var previous_song = this.playlist.getPreviousSong();
	      this.changeSong(previous_song);
	    }
	
	    /**
	     * *********************
	     * playlist interactions
	     * *********************
	     */
	
	    /**
	    * removes all songs from the playlist (visually and in the background) and stops playback
	    */
	
	  }, {
	    key: 'emptyPlaylist',
	    value: function emptyPlaylist() {
	      this.playlist.empty();
	      this.audio.empty();
	      this._resetProgressBar();
	      this._updateProgressBar(0);
	    }
	
	    /**
	     * sets a song from the playlist to be the current song
	     * @param {Object} song
	     */
	
	  }, {
	    key: 'changeSong',
	    value: function changeSong(song) {
	      this.playlist.current_song_index = this.playlist.songs.indexOf(song);
	      this.audio.setSong(song);
	      this._resetProgressBar();
	      this._updateProgressBar(0);
	      if (this.audio.playing) this.audio.play();
	    }
	
	    /**
	     * reset the playlist and set new songs
	     * @param {Array} songs
	     */
	
	  }, {
	    key: 'setPlaylist',
	    value: function setPlaylist(songs) {
	      this.emptyPlaylist();
	      this.appendToPlaylist(songs);
	    }
	
	    /**
	     * appends a song to the current playlist
	     * @param  {Array} songs an array of songs, also accepts a single song
	     */
	
	  }, {
	    key: 'appendToPlaylist',
	    value: function appendToPlaylist(songs) {
	      this.playlist.appendSongs(songs);
	      this._loadFirstSong();
	    }
	
	    /**
	     * prepends a song to the current playlist
	     * @param  {Array} songs an array of songs, also accepts a single song
	     */
	
	  }, {
	    key: 'prependToPlaylist',
	    value: function prependToPlaylist(songs) {
	      this.playlist.prependSongs(songs);
	      this._loadFirstSong();
	    }
	
	    /**
	     * returns the currently playing song
	     * @return {Object} the currently playing song
	     */
	
	  }, {
	    key: 'getCurrentSong',
	    value: function getCurrentSong() {
	      return this.playlist.songs[this.playlist.current_song_index];
	    }
	
	    /**
	     * returns the current song index
	     * @return {Integer} index of the currently playing song in the playlist
	     */
	
	  }, {
	    key: 'getCurrentSongIndex',
	    value: function getCurrentSongIndex() {
	      return this.playlist.current_song_index;
	    }
	
	    /**
	     * ***************
	     * private methods
	     * ***************
	     */
	
	    /**
	     * initialize the plugin. create required markup and add event listeners
	     */
	
	  }, {
	    key: '_initializeihap',
	    value: function _initializeihap() {
	      if (this.container == undefined) {
	        throw 'Cannot find container "' + this.settings.container + '". Please make sure self an element with this id is present.';
	      } else {
	        this._createComponents();
	        this._addListeners();
	
	        this._loadFirstSong();
	      }
	    }
	
	    /**
	     * appends the html markup of each module
	     */
	
	  }, {
	    key: '_createComponents',
	    value: function _createComponents() {
	      this.container.appendChild(this.audio.markup);
	      this.container.appendChild(this.controls.markup);
	      this.container.appendChild(this.progress_bar.markup);
	      this.container.appendChild(this.song_information.markup);
	      if (this.playlist_container != undefined) this.playlist_container.appendChild(this.playlist.markup);
	    }
	
	    /**
	     * resets the progressbars values to 0
	     */
	
	  }, {
	    key: '_resetProgressBar',
	    value: function _resetProgressBar() {
	      var song_duration = this.audio.element.duration;
	      if (song_duration == undefined) {
	        this.progress_bar.reset(0);
	      } else {
	        this.progress_bar.reset(song_duration);
	      }
	    }
	
	    /**
	     * updates the progress_bar visually (adjusts the width)
	     * @param {Float} current_time the current time playing
	     */
	
	  }, {
	    key: '_updateProgressBar',
	    value: function _updateProgressBar(current_time) {
	      this.progress_bar.updateBar(current_time);
	    }
	  }, {
	    key: '_loadFirstSong',
	    value: function _loadFirstSong() {
	      if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
	        if (this.audio.is_empty()) this.changeSong(this.playlist.songs[0]);
	      }
	    }
	
	    /**
	     * adds event listeners
	     */
	
	  }, {
	    key: '_addListeners',
	    value: function _addListeners() {
	      this._addAudioListeners();
	      this._addControlsListeners();
	      this._addProgressListeners();
	    }
	
	    /**
	     * adds listeners for the audio element
	     */
	
	  }, {
	    key: '_addAudioListeners',
	    value: function _addAudioListeners() {
	      var self = this;
	      // update the progress_bar to match the current timestamp
	      this.audio.element.addEventListener("timeupdate", function () {
	        if (self.moving_progress == false) {
	          self._updateProgressBar(this.currentTime);
	        }
	      });
	      // reload the progress_bar after the song changed
	      this.audio.element.addEventListener('canplay', function () {
	        self._resetProgressBar();
	        self._updateSongInformation();
	      });
	      // autoplay next song on finishing one
	      this.audio.element.addEventListener('ended', function () {
	        self.next();
	      });
	    }
	
	    /**
	     *	adds listeners for the controls (button)
	     */
	
	  }, {
	    key: '_addControlsListeners',
	    value: function _addControlsListeners() {
	      var self = this;
	      this.controls.buttons.play.addEventListener('click', function () {
	        self.audio.play();
	      });
	      this.controls.buttons.pause.addEventListener('click', function () {
	        self.audio.pause();
	      });
	      this.controls.buttons.skip_next.addEventListener('click', function () {
	        self.next();
	      });
	      this.controls.buttons.skip_previous.addEventListener('click', function () {
	        self.prev();
	      });
	    }
	
	    /**
	     * adds listeners for the progress bar
	     */
	
	  }, {
	    key: '_addProgressListeners',
	    value: function _addProgressListeners() {
	      var self = this;
	      this.progress_bar.markup.addEventListener('mousedown', function (e) {
	        if (e.preventDefault) e.preventDefault();
	        self.moving_progress = true;
	      });
	
	      this.progress_bar.markup.addEventListener('mousemove', function (e) {
	        if (self.moving_progress) {
	          var duration = self.progress_bar.element.getAttribute('aria-valuemax');
	          var progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
	          self._updateProgressBar(progress);
	        }
	      });
	
	      this.progress_bar.markup.addEventListener('mouseup', function (e) {
	        var duration = self.progress_bar.element.getAttribute('aria-valuemax');
	        var progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
	        self.audio.element.currentTime = progress;
	        self.moving_progress = false;
	      });
	    }
	
	    /**
	     * updates the song title & artist in the frontend
	     */
	
	  }, {
	    key: '_updateSongInformation',
	    value: function _updateSongInformation() {
	      var song = this.playlist.songs[this.playlist.current_song_index];
	      var title = song.title;
	      var artist = song.artist;
	      this.song_information.element.innerHTML = artist + ' - ' + title;
	    }
	  }]);
	
	  return ihap;
	}();
	
	exports.default = ihap;
	
	
	function calculate_progress(layerX, offsetLeft, offsetWidth, duration) {
	  var p = (layerX - offsetLeft) / offsetWidth;
	  return duration * p;
	}
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapAudio = function () {
	  /**
	   * the audio module
	   * @constructor
	   */
	
	  function ihapAudio() {
	    _classCallCheck(this, ihapAudio);
	
	    this.markup = null;
	    this.element = null;
	    this.playing = false;
	
	    this.createMarkup();
	  }
	
	  /**
	   * create the html for the audio element
	   */
	
	
	  _createClass(ihapAudio, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var player_wrapper = document.createElement('div');
	      player_wrapper.setAttribute('id', 'ihap_player_wrapper');
	
	      // actual audio element
	      var audio_player = document.createElement('audio');
	      audio_player.setAttribute('id', 'ihap_player');
	      audio_player.setAttribute('src', '');
	
	      // combine wrapper & audio element
	      player_wrapper.appendChild(audio_player);
	
	      // set object properties
	      this.markup = player_wrapper;
	      this.element = audio_player;
	    }
	
	    /**
	     * play the currently set song
	     */
	
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.element.readyState == 4) {
	        this.onCanPlay();
	      } else {
	        this.element.addEventListener('canplay', this.onCanPlay());
	      }
	    }
	  }, {
	    key: 'onCanPlay',
	    value: function onCanPlay() {
	      if (!this.is_empty()) {
	        this.element.play();
	        this.playing = true;
	      }
	    }
	
	    /**
	     * pause the currently playing song
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.element.pause();
	      this.playing = false;
	    }
	
	    /**
	     * reset the audio element to inital state without src or duration
	     */
	
	  }, {
	    key: 'empty',
	    value: function empty() {
	      this.element.currentTime = 0; // property of actual audio element
	      this.element.setAttribute('src', ''); // empty src
	      this.element.setAttribute('aria-valuemax', '0'); // set duration to 0
	    }
	  }, {
	    key: 'is_empty',
	    value: function is_empty() {
	      return this.element.getAttribute('src') == '';
	    }
	
	    /**
	     * sets a new song to the audioplayer and loads it
	     * @param {Song} song the song that should be set
	     */
	
	  }, {
	    key: 'setSong',
	    value: function setSong(song) {
	      if (song != undefined && song.url != undefined) {
	        this.element.currentTime = 0;
	        this.element.setAttribute('src', song.url);
	        this.element.load();
	      } else {
	        throw new Error('Invalid song');
	      }
	    }
	  }]);
	
	  return ihapAudio;
	}();
	
	exports.default = ihapAudio;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapControls = function () {
	  /**
	   * the module for the player controls
	   * @constructor
	   */
	
	  function ihapControls() {
	    _classCallCheck(this, ihapControls);
	
	    this.markup = null;
	    this.buttons = {
	      play: null,
	      pause: null,
	      skip_next: null,
	      skip_previous: null
	    };
	
	    this.createMarkup();
	  }
	
	  /**
	   * create the html for the controls
	   */
	
	
	  _createClass(ihapControls, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var controls_wrapper = document.createElement('div');
	      controls_wrapper.setAttribute('id', 'ihap_controls_wrapper');
	      controls_wrapper.setAttribute('class', 'ihap_controls_wrapper');
	      // play button
	      var play_button = document.createElement('i');
	      play_button.setAttribute('id', 'ihap_controls_play_button');
	      play_button.setAttribute('class', 'material-icons ihap_controls_play_button');
	      play_button.innerHTML = 'play_arrow';
	      // pause button
	      var pause_button = document.createElement('i');
	      pause_button.setAttribute('id', 'ihap_controls_pause_button');
	      pause_button.setAttribute('class', 'material-icons ihap_controls_pause_button');
	      pause_button.innerHTML = 'pause';
	      // next button
	      var next_button = document.createElement('i');
	      next_button.setAttribute('id', 'ihap_controls_next_button');
	      next_button.setAttribute('class', 'material-icons ihap_controls_next_button');
	      next_button.innerHTML = 'skip_next';
	      // previous button
	      var previous_button = document.createElement('i');
	      previous_button.setAttribute('id', 'ihap_controls_previous_button');
	      previous_button.setAttribute('class', 'material-icons ihap_controls_previous_button');
	      previous_button.innerHTML = 'skip_previous';
	
	      // concat
	      controls_wrapper.appendChild(play_button);
	      controls_wrapper.appendChild(pause_button);
	      controls_wrapper.appendChild(previous_button);
	      controls_wrapper.appendChild(next_button);
	
	      // set properties
	      this.buttons.play = play_button;
	      this.buttons.pause = pause_button;
	      this.buttons.skip_next = next_button;
	      this.buttons.skip_previous = previous_button;
	      this.markup = controls_wrapper;
	    }
	  }]);
	
	  return ihapControls;
	}();
	
	exports.default = ihapControls;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapPlaylist = function () {
	  /**
	   * the playlist module
	   * @constructor
	   */
	
	  function ihapPlaylist(songs) {
	    _classCallCheck(this, ihapPlaylist);
	
	    this.markup = null;
	    this.element = null;
	    this.songs = [];
	    this.current_song_index = 0;
	
	    this.createMarkup();
	    this.setSongs(songs);
	  }
	
	  /**
	   * create the html for the playlist
	   */
	
	
	  _createClass(ihapPlaylist, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var playlist_wrapper = document.createElement('div');
	      playlist_wrapper.setAttribute('id', 'ihap_playlist_wrapper');
	      playlist_wrapper.setAttribute('class', 'ihap_playlist_wrapper');
	
	      // actual playlist
	      var playlist = document.createElement('ul');
	      playlist.setAttribute('id', 'ihap_playlist');
	      playlist.setAttribute('class', 'ihap_playlist');
	
	      // concat
	      playlist_wrapper.appendChild(playlist);
	
	      // set properties
	      this.markup = playlist_wrapper;
	      this.element = playlist;
	    }
	
	    /**
	     * sets the songs and updates the playlist
	     * @param {Array} songs an array of songs. also accepts a single song
	     */
	
	  }, {
	    key: 'setSongs',
	    value: function setSongs(songs) {
	      if (songs != undefined) {
	        if (!(songs instanceof Array)) songs = [songs];
	
	        this.songs = songs;
	        this._updatePlaylist(this.songs);
	      }
	    }
	
	    /**
	     * returns the next song in the playlist
	     * @return {Object} song the next song
	     */
	
	  }, {
	    key: 'getNextSong',
	    value: function getNextSong() {
	      if (this._songsPresent()) {
	        var new_index = this.current_song_index + 1;
	        if (this.songs.length > 1 && this.songs.length > new_index) {
	          var id = new_index;
	        } else {
	          var id = 0;
	        }
	      }
	      return this.songs[id];
	    }
	
	    /**
	     * return the previous song in the playlist
	     * @return {object} song the previous song
	     */
	
	  }, {
	    key: 'getPreviousSong',
	    value: function getPreviousSong() {
	      if (this._songsPresent()) {
	        var new_index = this.current_song_index - 1;
	        if (this.songs.length > 1 && new_index >= 0 && this.songs.length > new_index) {
	          var id = new_index;
	        } else {
	          var id = this.songs.length - 1;
	        }
	      }
	      return this.songs[id];
	    }
	
	    /**
	     * resets the playlist
	     */
	
	  }, {
	    key: 'empty',
	    value: function empty() {
	      this.setSongs([]);
	      this.current_song_index = -1;
	    }
	
	    /**
	     * appends the given songs to the current playlist
	     * @param {Array} songs an array of song objects. also accepts a single song
	     */
	
	  }, {
	    key: 'appendSongs',
	    value: function appendSongs(songs) {
	      if (songs != undefined) {
	        var new_songs = this.songs.concat(songs);
	        this.setSongs(new_songs);
	      }
	    }
	
	    /**
	     * prepends the given songs to the current playlist
	     * @param {Array} songs an array of song objects. also accepts a single song
	     */
	
	  }, {
	    key: 'prependSongs',
	    value: function prependSongs(songs) {
	      if (songs != undefined) {
	        if (!(songs instanceof Array)) songs = [songs];
	
	        var new_songs = songs.concat(this.songs);
	        this.setSongs(new_songs);
	      }
	    }
	
	    //= privates =//
	    /**
	     * checks if songs are currently set in the playlist
	     * @return {Bool} result true if songs are present
	     */
	
	  }, {
	    key: '_songsPresent',
	    value: function _songsPresent() {
	      return this.songs != undefined && this.songs != [] && this.current_song_index >= 0;
	    }
	
	    /**
	     * empties the html of the actual playlist
	     */
	
	  }, {
	    key: '_resetPlaylist',
	    value: function _resetPlaylist() {
	      this.element.innerHTML = '';
	    }
	
	    /**
	     * update the playlist with a new set of songs
	     * @param  {Array} songs an array of songs. also accepts a single song
	     */
	
	  }, {
	    key: '_updatePlaylist',
	    value: function _updatePlaylist(songs) {
	      this._resetPlaylist();
	      if (!(songs instanceof Array)) songs = [songs];
	
	      for (var i = 0; i < songs.length; i++) {
	        var new_point = document.createElement('li');
	        var new_point_content = document.createTextNode(songs[i].title);
	        new_point.appendChild(new_point_content);
	        this.element.appendChild(new_point);
	      }
	    }
	  }]);
	
	  return ihapPlaylist;
	}();
	
	exports.default = ihapPlaylist;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapProgressBar = function () {
	  /**
	   * the progressbar module
	   * @constructor
	   */
	
	  function ihapProgressBar() {
	    _classCallCheck(this, ihapProgressBar);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
	  }
	
	  /**
	   * create the html for the progress bar
	   */
	
	
	  _createClass(ihapProgressBar, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var progress_bar_wrapper = document.createElement('div');
	      progress_bar_wrapper.setAttribute('id', 'ihap_progress_bar_wrapper');
	      progress_bar_wrapper.setAttribute('class', 'ihap_progress_bar_wrapper');
	
	      // actual bar
	      var progress_bar = document.createElement('div');
	      progress_bar.setAttribute('id', 'ihap_progress_bar');
	      progress_bar.setAttribute('class', 'ihap_progress_bar');
	      progress_bar.setAttribute('aria-valuenow', '0');
	      progress_bar.setAttribute('aria-valuemin', '0');
	
	      // grey background
	      var progress_bar_background = document.createElement('div');
	      progress_bar_background.setAttribute('id', 'ihap_progress_bar_background');
	      progress_bar_background.setAttribute('class', 'ihap_progress_bar_background');
	      progress_bar_background.appendChild(progress_bar);
	
	      // concat
	      progress_bar_wrapper.appendChild(progress_bar_background);
	
	      // set properties
	      this.markup = progress_bar_wrapper;
	      this.element = progress_bar;
	    }
	
	    /**
	     * resets max value and current value of the progress bar to match the new song
	     * @param {Float} song_duration the duration of the song currenty playing
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset(song_duration) {
	      if (song_duration != undefined && song_duration != NaN && song_duration > 0) {
	        this.element.setAttribute("aria-valuemax", song_duration);
	        this.element.setAttribute("aria-valuenow", "0");
	      }
	    }
	
	    /**
	     * updates the progressbar visually - sets its width
	     * @param {Float} current_time the current time of the song
	     */
	
	  }, {
	    key: 'updateBar',
	    value: function updateBar(current_time) {
	      if (current_time != undefined && current_time != NaN && current_time >= 0) {
	        this.element.setAttribute("aria-valuenow", current_time);
	        var song_duration = this.element.getAttribute('aria-valuemax');
	        var p = current_time / parseFloat(song_duration) * 100;
	        this.element.style.width = p + '%';
	      }
	    }
	  }]);
	
	  return ihapProgressBar;
	}();
	
	exports.default = ihapProgressBar;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapSongInformation = function () {
	  /**
	   * the song information module
	   * @constructor
	   */
	
	  function ihapSongInformation() {
	    _classCallCheck(this, ihapSongInformation);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
	  }
	
	  /**
	   * creates the html markup for the song information
	   */
	
	
	  _createClass(ihapSongInformation, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var song_information_wrapper = document.createElement('div');
	      song_information_wrapper.setAttribute('id', 'ihap_song_information_wrapper');
	      song_information_wrapper.setAttribute('class', 'ihap_song_information_wrapper');
	
	      // actual info div
	      var song_information = document.createElement('div');
	      song_information.setAttribute('id', 'ihap_song_information_title');
	      song_information.setAttribute('class', 'ihap_song_information_title');
	
	      // concat
	      song_information_wrapper.appendChild(song_information);
	
	      // set properties
	      this.element = song_information;
	      this.markup = song_information_wrapper;
	    }
	  }]);
	
	  return ihapSongInformation;
	}();
	
	exports.default = ihapSongInformation;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ihap.js.map