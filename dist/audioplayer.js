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
	
	var _audio_player_audio = __webpack_require__(1);
	
	var _audio_player_audio2 = _interopRequireDefault(_audio_player_audio);
	
	var _audio_player_controls = __webpack_require__(2);
	
	var _audio_player_controls2 = _interopRequireDefault(_audio_player_controls);
	
	var _audio_player_playlist = __webpack_require__(3);
	
	var _audio_player_playlist2 = _interopRequireDefault(_audio_player_playlist);
	
	var _audio_player_progress_bar = __webpack_require__(4);
	
	var _audio_player_progress_bar2 = _interopRequireDefault(_audio_player_progress_bar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayer = function () {
	  function AudioPlayer(data) {
	    _classCallCheck(this, AudioPlayer);
	
	    this.settings = data.settings;
	    this.container = document.getElementById(data.settings.container);
	
	    this.audio = new _audio_player_audio2.default();
	    this.controls = new _audio_player_controls2.default();
	    this.playlist = new _audio_player_playlist2.default(data.songs);
	    this.progress_bar = new _audio_player_progress_bar2.default();
	
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
	
	      this.addListeners();
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
	  }, {
	    key: 'addListeners',
	    value: function addListeners() {
	      var that = this;
	      //=== audio ===//
	      this.audio.element.addEventListener("timeupdate", function () {
	        that.updateProgress();
	      });
	      this.audio.element.addEventListener('canplay', function () {
	        that.refreshProgressBar();
	      });
	      this.audio.element.addEventListener('ended', function () {
	        that.nextSong(true);
	      });
	
	      //=== controls ===//
	      this.controls.buttons.play.addEventListener('click', function () {
	        that.audio.element.play();
	        this.className += ' disabled';
	        //that.pause_button.className = "mat-icon mat-icon-pause"
	      });
	      this.controls.buttons.pause.addEventListener('click', function () {
	        that.audio.element.pause();
	        this.className += ' disabled';
	        //  that.play_button.className = "mat-icon mat-icon-play"
	      });
	      this.controls.buttons.skip_next.addEventListener('click', function () {
	        that.nextSong();
	      });
	      this.controls.buttons.skip_previous.addEventListener('click', function () {
	        that.previousSong();
	      });
	
	      //=== progress ===//
	      this.progress_bar.element.addEventListener('click', function (e) {
	        //var new_time = (e.pageX - this.offsetLeft) * this.max / this.offsetWidth
	        that.audio.element.currentTime = this.value;
	      });
	    }
	  }]);
	
	  return AudioPlayer;
	}();

	exports.default = AudioPlayer;
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
	
	var AudioPlayerAudio = function () {
	  function AudioPlayerAudio() {
	    _classCallCheck(this, AudioPlayerAudio);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
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
	  }]);
	
	  return AudioPlayerAudio;
	}();

	exports.default = AudioPlayerAudio;
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
	
	var AudioPlayerControls = function () {
	  function AudioPlayerControls() {
	    _classCallCheck(this, AudioPlayerControls);
	
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
	  }]);
	
	  return AudioPlayerControls;
	}();

	exports.default = AudioPlayerControls;
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
	
	var AudioPlayerPlaylist = function () {
	  function AudioPlayerPlaylist(songs) {
	    _classCallCheck(this, AudioPlayerPlaylist);
	
	    //this.markup = null
	    this.songs = songs;
	    this.current_song_index = null;
	
	    //this.createMarkup()
	  }
	
	  // playlist currently has no markup. not visible in fronent yet
	  //createMarkup() {}
	
	  _createClass(AudioPlayerPlaylist, [{
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
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayerProgressBar = function () {
	  function AudioPlayerProgressBar() {
	    _classCallCheck(this, AudioPlayerProgressBar);
	
	    this.markup = null;
	    this.element = null;
	
	    this.createMarkup();
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