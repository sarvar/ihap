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
	    this.player = null;
	    this.progress_bar = null;
	
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
	
	      this.player = document.getElementById('player');
	    }
	  }, {
	    key: 'createControls',
	    value: function createControls() {
	      var controls_wrapper = document.createElement('div');
	      controls_wrapper.setAttribute('id', 'controls_wrapper');
	      // play button
	      var play_button = document.createElement('button');
	      var play_text = document.createTextNode('Play');
	      play_button.appendChild(play_text);
	      play_button.setAttribute('id', 'play_button');
	      // pause button
	      var pause_button = document.createElement('button');
	      var pause_text = document.createTextNode('Pause');
	      pause_button.appendChild(pause_text);
	      pause_button.setAttribute('id', 'pause_button');
	      // next button
	      var next_button = document.createElement('button');
	      var next_text = document.createTextNode('next');
	      next_button.appendChild(next_text);
	      next_button.setAttribute('id', 'next_button');
	      // previous button
	      var previous_button = document.createElement('button');
	      var previous_text = document.createTextNode('previous');
	      previous_button.appendChild(previous_text);
	      previous_button.setAttribute('id', 'previous_button');
	
	      controls_wrapper.appendChild(play_button);
	      controls_wrapper.appendChild(pause_button);
	      controls_wrapper.appendChild(next_button);
	      controls_wrapper.appendChild(previous_button);
	      this.container.appendChild(controls_wrapper);
	    }
	  }, {
	    key: 'createProgress',
	    value: function createProgress() {
	      this.progress_bar = document.createElement('progress');
	      this.progress_bar.setAttribute('id', 'progress_bar');
	      this.progress_bar.setAttribute('min', '0');
	      this.progress_bar.setAttribute('value', '0');
	
	      this.container.appendChild(this.progress_bar);
	    }
	  }, {
	    key: 'addEventListeners',
	    value: function addEventListeners() {
	      var that = this;
	      this.player.addEventListener("timeupdate", function () {
	        that.updateProgress();
	      });
	      this.player.addEventListener('canplay', function () {
	        that.refreshProgressBar();
	      });
	
	      document.getElementById('play_button').addEventListener('click', function () {
	        that.player.play();
	      });
	      document.getElementById('pause_button').addEventListener('click', function () {
	        that.player.pause();
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
	      this.player.setAttribute('src', song);
	      this.player.load();
	    }
	  }, {
	    key: 'refreshProgressBar',
	    value: function refreshProgressBar() {
	      this.progress_bar.setAttribute("max", this.player.duration);
	      this.progress_bar.setAttribute("value", "0");
	    }
	  }, {
	    key: 'updateProgress',
	    value: function updateProgress() {
	      this.progress_bar.setAttribute("value", this.player.currentTime);
	    }
	  }, {
	    key: 'nextSong',
	    value: function nextSong() {
	      if (this.songs != undefined && this.songs.length > 1) {
	        this.current_song_index = this.current_song_index + 1;
	        this.setCurrentSong(this.songs[this.current_song_index]);
	      }
	    }
	  }, {
	    key: 'previousSong',
	    value: function previousSong() {
	      if (this.songs != undefined && this.songs.length > 1) {
	        this.current_song_index = this.current_song_index - 1;
	        this.setCurrentSong(this.songs[this.current_song_index]);
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