(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AudioPlayer", [], factory);
	else if(typeof exports === 'object')
		exports["AudioPlayer"] = factory();
	else
		root["AudioPlayer"] = factory();
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
	
	var _audio_player_audio = __webpack_require__(5);
	
	var _audio_player_audio2 = _interopRequireDefault(_audio_player_audio);
	
	var _audio_player_controls = __webpack_require__(6);
	
	var _audio_player_controls2 = _interopRequireDefault(_audio_player_controls);
	
	var _audio_player_playlist = __webpack_require__(7);
	
	var _audio_player_playlist2 = _interopRequireDefault(_audio_player_playlist);
	
	var _audio_player_progress_bar = __webpack_require__(8);
	
	var _audio_player_progress_bar2 = _interopRequireDefault(_audio_player_progress_bar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayer = function () {
	  function AudioPlayer(data) {
	    _classCallCheck(this, AudioPlayer);
	
	    this.settings = data.settings;
	    this.container = document.getElementById(data.settings.container);
	
	    this.audio = new _audio_player_audio2.default(this);
	    this.controls = new _audio_player_controls2.default(this);
	    this.playlist = new _audio_player_playlist2.default(this, data.songs);
	    this.progress_bar = new _audio_player_progress_bar2.default(this);
	
	    this.initializeAudioPlayer();
	  }
	
	  _createClass(AudioPlayer, [{
	    key: 'initializeAudioPlayer',
	    value: function initializeAudioPlayer() {
	      this.createComponents();
	      if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
	        this.setCurrentSong(this.playlist.songs[0]);
	        this.current_song_index = 0;
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
	    }
	  }, {
	    key: 'setCurrentSong',
	    value: function setCurrentSong(song) {
	      this.playlist.setCurrentSong(this, song);
	    }
	  }, {
	    key: 'refreshProgressBar',
	    value: function refreshProgressBar() {
	      var song_duration = this.audio.element.duration;
	      this.progress_bar.refresh(song_duration);
	    }
	  }, {
	    key: 'updateProgress',
	    value: function updateProgress() {
	      var current_time = this.audio.element.currentTime;
	      this.progress_bar.update(current_time);
	    }
	  }, {
	    key: 'nextSong',
	    value: function nextSong() {
	      this.playlist.nextSong(this);
	    }
	  }, {
	    key: 'previousSong',
	    value: function previousSong() {
	      this.playlist.previousSong(this);
	    }
	  }]);
	
	  return AudioPlayer;
	}();

	exports.default = AudioPlayer;
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayerAudio = function () {
	  function AudioPlayerAudio(that) {
	    _classCallCheck(this, AudioPlayerAudio);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
	    this.addListeners(that);
	  }
	
	  /**
	   * create the basic html for the audio element
	   */
	
	
	  _createClass(AudioPlayerAudio, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var player_wrapper = document.createElement('div');
	      player_wrapper.setAttribute('id', 'player_wrapper');
	
	      // actual audio element
	      var audio_player = document.createElement('audio');
	      audio_player.setAttribute('id', 'player');
	      audio_player.setAttribute('src', '');
	
	      player_wrapper.appendChild(audio_player);
	
	      this.markup = player_wrapper;
	      this.element = audio_player;
	    }
	
	    /**
	     * adds the event listeners for the audio element
	     * @param {Object} that: the AudioPlayer parent object
	     */
	
	  }, {
	    key: 'addListeners',
	    value: function addListeners(that) {
	      this.element.addEventListener("timeupdate", function () {
	        that.updateProgress();
	      });
	      this.element.addEventListener('canplay', function () {
	        that.refreshProgressBar();
	      });
	      this.element.addEventListener('ended', function () {
	        that.nextSong(true);
	      });
	    }
	  }]);
	
	  return AudioPlayerAudio;
	}();

	exports.default = AudioPlayerAudio;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayerControls = function () {
	  function AudioPlayerControls(that) {
	    _classCallCheck(this, AudioPlayerControls);
	
	    this.markup = null;
	    this.buttons = {
	      play: null,
	      pause: null,
	      skip_next: null,
	      skip_previous: null
	    };
	
	    this.createMarkup();
	    this.addListeners(that);
	  }
	
	  /**
	   * create the basic html for the controls
	   */
	
	
	  _createClass(AudioPlayerControls, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      var controls_wrapper = document.createElement('div');
	      controls_wrapper.setAttribute('id', 'controls_wrapper');
	      // play button
	      var play_button = document.createElement('i');
	      play_button.setAttribute('id', 'play_button');
	      play_button.setAttribute('class', 'mat-icon mat-icon-play');
	      // pause button
	      var pause_button = document.createElement('i');
	      pause_button.setAttribute('id', 'pause_button');
	      pause_button.setAttribute('class', 'mat-icon mat-icon-pause');
	      // next button
	      var next_button = document.createElement('i');
	      next_button.setAttribute('id', 'next_button');
	      next_button.setAttribute('class', 'mat-icon mat-icon-skip_next');
	      // previous button
	      var previous_button = document.createElement('i');
	      previous_button.setAttribute('id', 'previous_button');
	      previous_button.setAttribute('class', 'mat-icon mat-icon-skip_previous');
	
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
	  }, {
	    key: 'addListeners',
	    value: function addListeners(that) {
	      this.buttons.play.addEventListener('click', function () {
	        that.audio.element.play();
	        this.className += ' disabled';
	        //that.pause_button.className = "mat-icon mat-icon-pause"
	      });
	      this.buttons.pause.addEventListener('click', function () {
	        that.audio.element.pause();
	        this.className += ' disabled';
	        //  that.play_button.className = "mat-icon mat-icon-play"
	      });
	      this.buttons.skip_next.addEventListener('click', function () {
	        that.nextSong();
	      });
	      this.buttons.skip_previous.addEventListener('click', function () {
	        that.previousSong();
	      });
	    }
	  }]);
	
	  return AudioPlayerControls;
	}();

	exports.default = AudioPlayerControls;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayerPlaylist = function () {
	  function AudioPlayerPlaylist(that, songs) {
	    _classCallCheck(this, AudioPlayerPlaylist);
	
	    //this.markup = null
	    this.songs = songs;
	    this.current_song_index = null;
	
	    //this.createMarkup()
	    this.addListeners(that);
	  }
	
	  // playlist currently has no markup. not visible in fronent yet
	  //createMarkup() {}
	
	  _createClass(AudioPlayerPlaylist, [{
	    key: 'addListeners',
	    value: function addListeners() {}
	  }, {
	    key: 'nextSong',
	    value: function nextSong(that) {
	      if (this.songs != undefined && this.songs.length > 1) {
	        var playing = that.audio.element.paused !== true || playing;
	        var new_index = this.current_song_index + 1;
	        if (this.songs.length > new_index) {
	          this.current_song_index = new_index;
	        } else {
	          this.current_song_index = 0;
	        }
	        this.setCurrentSong(that, this.songs[this.current_song_index]);
	        if (playing === true) {
	          that.audio.element.play();
	        }
	      }
	    }
	  }, {
	    key: 'previousSong',
	    value: function previousSong(that) {
	      if (this.songs != undefined && this.songs.length > 1) {
	        var playing = that.audio.element.paused !== true;
	        var new_index = this.current_song_index - 1;
	        if (new_index >= 0) {
	          this.current_song_index = new_index;
	        } else {
	          this.current_song_index = this.songs.length - 1;
	        }
	        this.setCurrentSong(that, this.songs[this.current_song_index]);
	        if (playing === true) {
	          that.audio.element.play();
	        }
	      }
	    }
	  }, {
	    key: 'setCurrentSong',
	    value: function setCurrentSong(that, song) {
	      that.audio.element.setAttribute('src', song.url);
	      that.audio.element.load();
	    }
	  }]);
	
	  return AudioPlayerPlaylist;
	}();

	exports.default = AudioPlayerPlaylist;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayerProgressBar = function () {
	  function AudioPlayerProgressBar(that) {
	    _classCallCheck(this, AudioPlayerProgressBar);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
	    this.addListeners(that);
	  }
	
	  /**
	   * create the basic html for the progress bar. wrapper & input with type=range
	   */
	
	
	  _createClass(AudioPlayerProgressBar, [{
	    key: 'createMarkup',
	    value: function createMarkup() {
	      // wrapper
	      var progress_bar_wrapper = document.createElement('div');
	      progress_bar_wrapper.setAttribute('id', 'progress_bar_wrapper');
	
	      // actual bar
	      var progress_bar = document.createElement('input');
	      progress_bar.setAttribute('id', 'progress_bar');
	      progress_bar.setAttribute('min', '0');
	      progress_bar.setAttribute('value', '0');
	      progress_bar.setAttribute('type', 'range');
	
	      progress_bar_wrapper.appendChild(progress_bar);
	      this.markup = progress_bar_wrapper;
	      this.element = progress_bar;
	    }
	
	    /**
	     * adds the event listeners for the progress bar
	     * @param {Object} that: the AudioPlayer parent object
	     */
	
	  }, {
	    key: 'addListeners',
	    value: function addListeners(that) {
	      this.element.addEventListener('click', function (e) {
	        //var new_time = (e.pageX - this.offsetLeft) * this.max / this.offsetWidth
	        that.audio.element.currentTime = this.value;
	      });
	    }
	
	    /**
	     * refreshes max value and current value of the progress bar to match the new song
	     * @param {Float} song_duration: the duration of the song currenty playing
	    */
	
	  }, {
	    key: 'refresh',
	    value: function refresh(song_duration) {
	      this.element.setAttribute("max", song_duration);
	      this.element.setAttribute("value", "0");
	    }
	
	    /**
	     * updates the progress bar visually, moves the left background to the right
	     * @param {Float} current_time: the current time the song is playing at
	    */
	
	  }, {
	    key: 'update',
	    value: function update(current_time) {
	      this.element.value = current_time;
	      var value = this.element.value / this.element.max;
	      this.element.style.backgroundImage = ['-webkit-gradient(', 'linear, ', 'left top, ', 'right top, ', 'color-stop(' + value + ', orange), ', 'color-stop(' + value + ', lightgrey)', ')'].join('');
	    }
	  }]);
	
	  return AudioPlayerProgressBar;
	}();

	exports.default = AudioPlayerProgressBar;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=audioplayer.js.map