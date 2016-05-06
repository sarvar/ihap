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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	  function ihap(data) {
	    _classCallCheck(this, ihap);
	
	    this.settings = data.settings;
	    this.container = document.getElementById(data.settings.container);
	
	    this.audio = new _ihap_audio2.default();
	    this.controls = new _ihap_controls2.default();
	    this.playlist = new _ihap_playlist2.default(data.songs);
	    this.progress_bar = new _ihap_progress_bar2.default();
	    this.song_information = new _ihap_song_information2.default();
	    this.moving_progress = false;
	
	    this.initializeihap();
	  }
	
	  _createClass(ihap, [{
	    key: 'initializeihap',
	    value: function initializeihap() {
	      if (this.container == undefined || this.container == undefined) {
	        throw 'Cannot find container "' + this.settings.container + '". Please make sure that an element with this id is present.';
	      } else {
	        this.createComponents();
	        if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
	          this.setCurrentSong(this.playlist.songs[0]);
	        }
	      }
	    }
	
	    /**
	     * creates the html markup
	     */
	
	  }, {
	    key: 'createComponents',
	    value: function createComponents() {
	      this.container.appendChild(this.audio.markup);
	      this.container.appendChild(this.controls.markup);
	      this.container.appendChild(this.progress_bar.markup);
	      this.container.appendChild(this.song_information.markup);
	
	      this.addListeners();
	    }
	  }, {
	    key: 'setCurrentSong',
	    value: function setCurrentSong(song) {
	      this.playlist.current_song_index = this.playlist.songs.indexOf(song);
	      this.audio.setSong(song);
	      this.updateProgressBar(0);
	      if (this.audio.playing) this.audio.play();
	    }
	  }, {
	    key: 'resetProgressBar',
	    value: function resetProgressBar() {
	      var song_duration = this.audio.element.duration;
	      this.progress_bar.refresh(song_duration);
	    }
	
	    /**
	     * updates the progress_bar visually (adjusts the width)
	     * @param {Float} current_time: the current time playing
	     */
	
	  }, {
	    key: 'updateProgressBar',
	    value: function updateProgressBar(current_time) {
	      this.progress_bar.updateBar(current_time);
	    }
	  }, {
	    key: 'nextSong',
	    value: function nextSong() {
	      var next_song = this.playlist.getNextSong();
	      this.setCurrentSong(next_song);
	    }
	  }, {
	    key: 'previousSong',
	    value: function previousSong() {
	      var previous_song = this.playlist.getPreviousSong();
	      this.setCurrentSong(previous_song);
	    }
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      this.addAudioListeners();
	      this.addControlsListeners();
	      this.addProgressListeners();
	    }
	
	    /**
	     * adds listeners for the audio element
	     */
	
	  }, {
	    key: 'addAudioListeners',
	    value: function addAudioListeners() {
	      var that = this;
	      // update the progress_bar to match the current timestamp
	      this.audio.element.addEventListener("timeupdate", function () {
	        if (that.moving_progress == false) {
	          that.updateProgressBar(this.currentTime);
	        }
	      });
	      // reload the progress_bar after the song changed
	      this.audio.element.addEventListener('canplay', function () {
	        that.resetProgressBar();
	        that.updateSongInformation();
	      });
	      // autoplay next song on finishing one
	      this.audio.element.addEventListener('ended', function () {
	        that.nextSong();
	      });
	    }
	
	    /**
	     *	adds listeners for the controls (button)
	     */
	
	  }, {
	    key: 'addControlsListeners',
	    value: function addControlsListeners() {
	      var that = this;
	      this.controls.buttons.play.addEventListener('click', function () {
	        that.audio.play();
	      });
	      this.controls.buttons.pause.addEventListener('click', function () {
	        that.audio.pause();
	      });
	      this.controls.buttons.skip_next.addEventListener('click', function () {
	        that.nextSong();
	      });
	      this.controls.buttons.skip_previous.addEventListener('click', function () {
	        that.previousSong();
	      });
	    }
	  }, {
	    key: 'addProgressListeners',
	    value: function addProgressListeners() {
	      var that = this;
	      this.progress_bar.markup.addEventListener('mousedown', function (e) {
	        if (e.preventDefault) e.preventDefault();
	        that.moving_progress = true;
	      });
	
	      this.progress_bar.markup.addEventListener('mousemove', function (e) {
	        if (that.moving_progress) {
	          var duration = that.progress_bar.element.getAttribute('aria-valuemax');
	          var progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
	          that.updateProgressBar(progress);
	        }
	      });
	
	      this.progress_bar.markup.addEventListener('mouseup', function (e) {
	        var duration = that.progress_bar.element.getAttribute('aria-valuemax');
	        var progress = calculate_progress(e.layerX, this.offsetLeft, this.offsetWidth, duration);
	        that.audio.element.currentTime = progress;
	        that.moving_progress = false;
	      });
	    }
	  }, {
	    key: 'updateSongInformation',
	    value: function updateSongInformation() {
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
	  function ihapAudio() {
	    _classCallCheck(this, ihapAudio);
	
	    this.markup = null;
	    this.element = null;
	    this.playing = false;
	
	    this.createMarkup();
	  }
	
	  /**
	   * create the basic html for the audio element
	   */
	
	
	  _createClass(ihapAudio, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var player_wrapper = document.createElement('div');
	      player_wrapper.setAttribute('id', 'ihap_player_wrapper');
	
	      // actual audio element
	      var audio_player = document.createElement('audio');
	      audio_player.setAttribute('id', 'player');
	      audio_player.setAttribute('src', '');
	
	      // combine wrapper & audio element
	      player_wrapper.appendChild(audio_player);
	
	      // set object properties
	      this.markup = player_wrapper;
	      this.element = audio_player;
	    }
	
	    /**
	     * play the current song
	     */
	
	  }, {
	    key: 'play',
	    value: function play() {
	      this.element.play();
	      this.playing = true;
	    }
	
	    /**
	     * pause the current song
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.element.pause();
	      this.playing = false;
	    }
	
	    /**
	     * sets a new song to the audioplayer and loads it
	     * @param {Song} song: the song that should be set
	     */
	
	  }, {
	    key: 'setSong',
	    value: function setSong(song) {
	      this.element.currentTime = 0;
	      this.element.setAttribute('src', song.url);
	      this.element.load();
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
	   * create the basic html for the controls
	   */
	
	
	  _createClass(ihapControls, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
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
	
	      controls_wrapper.appendChild(play_button);
	      controls_wrapper.appendChild(pause_button);
	      controls_wrapper.appendChild(previous_button);
	      controls_wrapper.appendChild(next_button);
	
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ihapPlaylist = function () {
	  function ihapPlaylist(songs) {
	    _classCallCheck(this, ihapPlaylist);
	
	    //this.markup = null
	    this.songs = songs;
	    this.current_song_index = 0;
	
	    //this.createMarkup()
	  }
	
	  // playlist currently has no markup. not visible in fronent yet
	  //createMarkup() {}
	
	  _createClass(ihapPlaylist, [{
	    key: "getNextSong",
	    value: function getNextSong() {
	      if (this.songs != undefined && this.songs != []) {
	        var new_index = this.current_song_index + 1;
	        if (this.songs.length > 1 && this.songs.length > new_index) {
	          var id = new_index;
	        } else {
	          var id = 0;
	        }
	      }
	      return this.songs[id];
	    }
	  }, {
	    key: "getPreviousSong",
	    value: function getPreviousSong() {
	      if (this.songs != undefined && this.songs != []) {
	        var new_index = this.current_song_index - 1;
	        if (this.songs.length > 1 && new_index >= 0 && this.songs.length > new_index) {
	          var id = new_index;
	        } else {
	          var id = this.songs.length - 1;
	        }
	      }
	      return this.songs[id];
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
	  function ihapProgressBar() {
	    _classCallCheck(this, ihapProgressBar);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
	  }
	
	  /**
	   * create the basic html for the progress bar. wrapper & input with type=range
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
	
	      progress_bar_wrapper.appendChild(progress_bar_background);
	      this.markup = progress_bar_wrapper;
	      this.element = progress_bar;
	    }
	
	    /**
	     * refreshes max value and current value of the progress bar to match the new song
	     * @param {Float} song_duration: the duration of the song currenty playing
	    */
	
	  }, {
	    key: 'refresh',
	    value: function refresh(song_duration) {
	      this.element.setAttribute("aria-valuemax", song_duration);
	      this.element.setAttribute("aria-valuenow", "0");
	    }
	
	    /**
	      * @param {Float} current_time: the current time of the song
	    */
	
	  }, {
	    key: 'updateBar',
	    value: function updateBar(current_time) {
	      this.element.setAttribute("aria-valuenow", current_time);
	      var song_duration = this.element.getAttribute('aria-valuemax');
	      var p = current_time / parseFloat(song_duration) * 100;
	      this.element.style.width = p + '%';
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
		function ihapSongInformation() {
			_classCallCheck(this, ihapSongInformation);
	
			this.markup = null;
			this.element = null;
	
			this.createMarkup();
		}
	
		_createClass(ihapSongInformation, [{
			key: 'createMarkup',
			value: function createMarkup() {
				var song_information_wrapper = document.createElement('div');
				song_information_wrapper.setAttribute('id', 'ihap_song_information_wrapper');
				song_information_wrapper.setAttribute('class', 'ihap_song_information_wrapper');
	
				var song_information = document.createElement('div');
				song_information.setAttribute('id', 'ihap_song_information_title');
				song_information.setAttribute('class', 'ihap_song_information_title');
	
				song_information_wrapper.appendChild(song_information);
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