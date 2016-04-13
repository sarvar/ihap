(function(window){
    'use strict';

    var default_options = {};
    var player = null;
    var play_button = null;
    var pause_button = null;
    var progress_bar = null;

    function Audioplayer(element_id, options, songs) {
      // public properties
      this.element = null;
      this.options = {};
      this.songs = [];

      // constructor
      var __construct = function(that) {
        that.element = document.getElementById(element_id);
        that.options = default_options.merge(options);
        that.songs = songs

        initializeAudioPlayer(that.element, that.songs);
      }(this)
    }

    Audioplayer.prototype.setCurrentSong = function(song){
      setCurrentSong(song);
    };

    function initializeAudioPlayer(element, songs){
      createComponents(element);
      if (songs != undefined && songs.length != 0){
        setCurrentSong(songs[0])
      }
    }

    //=== methods to interact with player ===//
    function setCurrentSong(song){
      player.setAttribute('src', song);
      player.load();
    }

    function refreshProgressBar() {
      progress_bar.setAttribute("max", player.duration);
      progress_bar.setAttribute("value", "0");
    }

    function updateProgress() {
      progress_bar.setAttribute("value", player.currentTime);
    }

    //=== methods to create the basic dom structure, also adding listeners ===//
    function createComponents(element) {
      createPlayer(element);
      createControls(element);
      createProgress(element);
    }

    function createPlayer(element){
      var player_wrapper = document.createElement('div');
      player_wrapper.setAttribute('id', 'player_wrapper');

      var audio_player = document.createElement('audio');
      audio_player.setAttribute('id', 'player');
      audio_player.setAttribute('src', '');

      player_wrapper.appendChild(audio_player);
      element.appendChild(player_wrapper);

      player = document.getElementById('player');

      player.addEventListener('canplay', function() {
        refreshProgressBar();
      })
    }

    function createControls(element) {
      var controls_wrapper = document.createElement('div');
      controls_wrapper.setAttribute('id', 'controls_wrapper');

      play_button = document.createElement('button');
      var play_text = document.createTextNode('Play');
      play_button.appendChild(play_text);
      play_button.setAttribute('id', 'play_button');

      pause_button = document.createElement('button');
      var pause_text = document.createTextNode('Pause');
      pause_button.appendChild(pause_text);
      pause_button.setAttribute('id', 'pause_button');

      controls_wrapper.appendChild(play_button);
      controls_wrapper.appendChild(pause_button);
      element.appendChild(controls_wrapper);

      document.getElementById('play_button').addEventListener('click', function() {
        player.play();
      })
      document.getElementById('pause_button').addEventListener('click', function() {
        player.pause();
      })
    }

    function createProgress(element){
      progress_bar = document.createElement('progress');
      progress_bar.setAttribute('id', 'progress_bar');
      progress_bar.setAttribute('min', '0');
      progress_bar.setAttribute('value', '0');

      element.appendChild(progress_bar);
      player.addEventListener("timeupdate", function() {
        updateProgress()
      });

    }

    //=== helpers ===//
    // merge helper
    Object.prototype.merge = function(source) {
      for(var key in source) {
        if(source.hasOwnProperty(key)) {
          this[key] = source[key];
        }
      }
      return this;
    }

    window.Audioplayer = Audioplayer;
})(window);
