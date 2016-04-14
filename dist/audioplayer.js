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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AudioPlayer = function () {
	  function AudioPlayer(data) {
	    _classCallCheck(this, AudioPlayer);
	
	    this.settings = data.settings;
	    this.container = document.getElementById(data.settings.container);
	    this.songs = data.songs;
	    this.current_song_index = null;
	    this.audio = null;
	    this.progress_bar = null;
	    this.play_button = null;
	    this.pause_button = null;
	
	    this.initializeAudioPlayer();
	  }
	
	  _createClass(AudioPlayer, [{
	    key: 'initializeAudioPlayer',
	    value: function initializeAudioPlayer() {
	      this.createComponents();
	      if (this.songs != undefined && this.songs.length != 0) {
	        this.setCurrentSong(this.songs[0]);
	        this.current_song_index = 0;
	      }
	    }
	  }, {
	    key: 'createComponents',
	    value: function createComponents() {
	      this.createPlayer();
	      this.createControls();
	      this.createProgress();
	      this.addEventListeners();
	    }
	  }, {
	    key: 'createPlayer',
	    value: function createPlayer() {
	      var player_wrapper = document.createElement('div');
	      player_wrapper.setAttribute('id', 'player_wrapper');
	
	      var audio_player = document.createElement('audio');
	      audio_player.setAttribute('id', 'player');
	      audio_player.setAttribute('src', '');
	
	      player_wrapper.appendChild(audio_player);
	      this.container.appendChild(player_wrapper);
	
	      this.audio = document.getElementById('player');
	    }
	  }, {
	    key: 'createControls',
	    value: function createControls() {
	      var controls_wrapper = document.createElement('div');
	      controls_wrapper.setAttribute('id', 'controls_wrapper');
	      // play button
	      this.play_button = document.createElement('i');
	      this.play_button.setAttribute('id', 'play_button');
	      this.play_button.setAttribute('class', 'mat-icon mat-icon-play');
	      // pause button
	      this.pause_button = document.createElement('i');
	      this.pause_button.setAttribute('id', 'pause_button');
	      this.pause_button.setAttribute('class', 'mat-icon mat-icon-pause');
	      // next button
	      var next_button = document.createElement('i');
	      next_button.setAttribute('id', 'next_button');
	      next_button.setAttribute('class', 'mat-icon mat-icon-skip_next');
	      // previous button
	      var previous_button = document.createElement('i');
	      previous_button.setAttribute('id', 'previous_button');
	      previous_button.setAttribute('class', 'mat-icon mat-icon-skip_previous');
	
	      controls_wrapper.appendChild(this.play_button);
	      controls_wrapper.appendChild(this.pause_button);
	      controls_wrapper.appendChild(previous_button);
	      controls_wrapper.appendChild(next_button);
	      this.container.appendChild(controls_wrapper);
	    }
	  }, {
	    key: 'createProgress',
	    value: function createProgress() {
	      //'<input type="range" id="song-progress" min="0" max="360" value="0" />'
	
	      var progress_bar_wrapper = document.createElement('div');
	      progress_bar_wrapper.setAttribute('id', 'progress_bar_wrapper');
	      this.progress_bar = document.createElement('input');
	      this.progress_bar.setAttribute('id', 'song-progress');
	      this.progress_bar.setAttribute('min', '0');
	      this.progress_bar.setAttribute('value', '0');
	      this.progress_bar.setAttribute('type', 'range');
	
	      progress_bar_wrapper.appendChild(this.progress_bar);
	      this.container.appendChild(progress_bar_wrapper);
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      var that = this;
	      this.audio.addEventListener("timeupdate", function () {
	        that.updateProgress();
	      });
	      this.audio.addEventListener('canplay', function () {
	        that.refreshProgressBar();
	      });
	      this.audio.addEventListener('ended', function () {
	        that.nextSong(true);
	      });
	      this.progress_bar.addEventListener('click', function (e) {
	        var new_time = (e.pageX - this.offsetLeft) * this.max / this.offsetWidth;
	        that.audio.currentTime = new_time;
	      });
	
	      this.play_button.addEventListener('click', function () {
	        that.audio.play();
	        this.className += ' disabled';
	        that.pause_button.className = "mat-icon mat-icon-pause";
	      });
	      this.pause_button.addEventListener('click', function () {
	        that.audio.pause();
	        this.className += ' disabled';
	        that.play_button.className = "mat-icon mat-icon-play";
	      });
	      document.getElementById('next_button').addEventListener('click', function () {
	        that.nextSong();
	      });
	      document.getElementById('previous_button').addEventListener('click', function () {
	        that.previousSong();
	      });
	    }
	  }, {
	    key: 'setCurrentSong',
	    value: function setCurrentSong(song) {
	      this.audio.setAttribute('src', song.url);
	      this.audio.load();
	    }
	  }, {
	    key: 'refreshProgressBar',
	    value: function refreshProgressBar() {
	      this.progress_bar.setAttribute("max", this.audio.duration);
	      this.progress_bar.setAttribute("value", "0");
	    }
	  }, {
	    key: 'updateProgress',
	    value: function updateProgress() {
	      this.progress_bar.value = this.audio.currentTime;
	      var value = this.progress_bar.value / this.progress_bar.max;
	      this.progress_bar.style.backgroundImage = ['-webkit-gradient(', 'linear, ', 'left top, ', 'right top, ', 'color-stop(' + value + ', orange), ', 'color-stop(' + value + ', lightgrey)', ')'].join('');
	    }
	  }, {
	    key: 'nextSong',
	    value: function nextSong(playing) {
	      if (this.songs != undefined && this.songs.length > 1) {
	        var playing = this.audio.paused !== true || playing;
	        var new_index = this.current_song_index + 1;
	        if (this.songs.length > new_index) {
	          this.current_song_index = new_index;
	        } else {
	          this.current_song_index = 0;
	        }
	        this.setCurrentSong(this.songs[this.current_song_index]);
	        if (playing === true) {
	          this.audio.play();
	        }
	      }
	    }
	  }, {
	    key: 'previousSong',
	    value: function previousSong() {
	      if (this.songs != undefined && this.songs.length > 1) {
	        var playing = this.audio.paused !== true;
	        var new_index = this.current_song_index - 1;
	        if (new_index >= 0) {
	          this.current_song_index = new_index;
	        } else {
	          this.current_song_index = this.songs.length - 1;
	        }
	        this.setCurrentSong(this.songs[this.current_song_index]);
	        if (playing === true) {
	          this.audio.play();
	        }
	      }
	    }
	  }]);
	
	  return AudioPlayer;
	}();

	exports.default = AudioPlayer;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=audioplayer.js.map