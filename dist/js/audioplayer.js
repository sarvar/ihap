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
	
	var _audio_player_song_information = __webpack_require__(5);
	
	var _audio_player_song_information2 = _interopRequireDefault(_audio_player_song_information);
	
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
			this.song_information = new _audio_player_song_information2.default();
			this.current_song_index = 0;
			this.moving_progress = false;
	
			this.initializeAudioPlayer();
		}
	
		_createClass(AudioPlayer, [{
			key: 'initializeAudioPlayer',
			value: function initializeAudioPlayer() {
				this.createComponents();
				if (this.playlist.songs != undefined && this.playlist.songs.length != 0) {
					this.setCurrentSong(this.playlist.songs[0]);
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
				this.playlist.setCurrentSong(this, song);
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
				this.audio.element.currentTime = 0;
				this.updateProgressBar(0);
				this.playlist.nextSong(this);
			}
		}, {
			key: 'previousSong',
			value: function previousSong() {
				this.audio.element.currentTime = 0;
				this.updateProgressBar(0);
				this.playlist.previousSong(this);
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
					that.nextSong(true);
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
					that.audio.element.play();
				});
				this.controls.buttons.pause.addEventListener('click', function () {
					that.audio.element.pause();
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
						var x = e.pageX - this.offsetLeft;
						var p = (e.pageX - this.offsetLeft) / this.offsetWidth;
						var duration = that.progress_bar.element.getAttribute('aria-valuemax');
						that.updateProgressBar(duration * p);
					}
				});
	
				this.progress_bar.markup.addEventListener('mouseup', function (e) {
					var x = e.pageX - this.offsetLeft;
					var p = (e.pageX - this.offsetLeft) / this.offsetWidth;
					var duration = that.progress_bar.element.getAttribute('aria-valuemax');
					that.moving_progress = false;
					that.audio.element.currentTime = duration * p;
				});
			}
		}, {
			key: 'updateSongInformation',
			value: function updateSongInformation() {
				var song = this.playlist.songs[this.current_song_index];
				var title = song.title;
				var artist = song.artist;
				this.song_information.element.innerHTML = artist + ' - ' + title;
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
	      play_button.setAttribute('class', 'material-icons');
	      play_button.innerHTML = 'play_arrow';
	      // pause button
	      var pause_button = document.createElement('i');
	      pause_button.setAttribute('id', 'pause_button');
	      pause_button.setAttribute('class', 'material-icons');
	      pause_button.innerHTML = 'pause';
	      // next button
	      var next_button = document.createElement('i');
	      next_button.setAttribute('id', 'next_button');
	      next_button.setAttribute('class', 'material-icons');
	      next_button.innerHTML = 'skip_next';
	      // previous button
	      var previous_button = document.createElement('i');
	      previous_button.setAttribute('id', 'previous_button');
	      previous_button.setAttribute('class', 'material-icons');
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
	        var new_index = that.current_song_index + 1;
	        if (this.songs.length > new_index) {
	          that.current_song_index = new_index;
	        } else {
	          that.current_song_index = 0;
	        }
	        this.setCurrentSong(that, this.songs[that.current_song_index]);
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
	        var new_index = that.current_song_index - 1;
	        if (new_index >= 0) {
	          that.current_song_index = new_index;
	        } else {
	          that.current_song_index = this.songs.length - 1;
	        }
	        this.setCurrentSong(that, this.songs[that.current_song_index]);
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
	      var progress_bar = document.createElement('div');
	      progress_bar.setAttribute('id', 'progress_bar');
	      progress_bar.setAttribute('aria-valuenow', '0');
	      progress_bar.setAttribute('aria-valuemin', '0');
	
	      // grey background
	      var progress_bar_background = document.createElement('div');
	      progress_bar_background.setAttribute('id', 'progress_bar_background');
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
	      var p = current_time / parseInt(song_duration) * 100;
	      this.element.style.width = p + '%';
	    }
	  }]);
	
	  return AudioPlayerProgressBar;
	}();

	exports.default = AudioPlayerProgressBar;
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
	
	var AudioPlayerSongInformation = function () {
		function AudioPlayerSongInformation() {
			_classCallCheck(this, AudioPlayerSongInformation);
	
			this.markup = null;
			this.element = null;
	
			this.createMarkup();
		}
	
		_createClass(AudioPlayerSongInformation, [{
			key: 'createMarkup',
			value: function createMarkup() {
				var song_information_wrapper = document.createElement('div');
				song_information_wrapper.setAttribute('id', 'song_information_wrapper');
	
				var song_information = document.createElement('div');
				song_information.setAttribute('id', 'song_information_title');
	
				song_information_wrapper.appendChild(song_information);
				this.element = song_information;
				this.markup = song_information_wrapper;
			}
		}]);
	
		return AudioPlayerSongInformation;
	}();

	exports.default = AudioPlayerSongInformation;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=audioplayer.js.map