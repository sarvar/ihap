export default class AudioPlayer {
  constructor(data) {
    this.settings = data.settings
    this.container = document.getElementById(data.settings.container)
    this.songs = data.songs
    this.current_song_index = null
    this.player = null
    this.progress_bar = null

    this.initializeAudioPlayer();
  }

  initializeAudioPlayer() {
    this.createComponents();
    if (this.songs != undefined && this.songs.length != 0){
      this.setCurrentSong(this.songs[0])
      this.current_song_index = 0
    }
  }

  createComponents() {
    this.createPlayer();
    this.createControls();
    this.createProgress();
    this.addEventListeners();
  }

  createPlayer() {
    var player_wrapper = document.createElement('div');
    player_wrapper.setAttribute('id', 'player_wrapper');

    var audio_player = document.createElement('audio');
    audio_player.setAttribute('id', 'player');
    audio_player.setAttribute('src', '');

    player_wrapper.appendChild(audio_player);
    this.container.appendChild(player_wrapper);

    this.player = document.getElementById('player');
  }

  createControls() {
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
		controls_wrapper.appendChild(previous_button);
    controls_wrapper.appendChild(next_button);
    this.container.appendChild(controls_wrapper);
  }

  createProgress() {
    this.progress_bar = document.createElement('progress');
    this.progress_bar.setAttribute('id', 'progress_bar');
    this.progress_bar.setAttribute('min', '0');
    this.progress_bar.setAttribute('value', '0');

    this.container.appendChild(this.progress_bar);
  }

  addEventListeners() {
    var that = this
    this.player.addEventListener("timeupdate", function() {
      that.updateProgress()
    });
    this.player.addEventListener('canplay', function() {
      that.refreshProgressBar();
    });

    document.getElementById('play_button').addEventListener('click', function() {
      that.player.play();
    });
    document.getElementById('pause_button').addEventListener('click', function() {
      that.player.pause();
    });
    document.getElementById('next_button').addEventListener('click', function() {
      that.nextSong();
    });
    document.getElementById('previous_button').addEventListener('click', function() {
      that.previousSong();
    });
  }

  setCurrentSong(song){
		console.log(this.current_song_index)
    this.player.setAttribute('src', song);
    this.player.load();
  }

  refreshProgressBar() {
    this.progress_bar.setAttribute("max", this.player.duration);
    this.progress_bar.setAttribute("value", "0");
  }

  updateProgress() {
    this.progress_bar.setAttribute("value", this.player.currentTime);
  }

  nextSong() {
    if (this.songs != undefined && this.songs.length > 1){
			var new_index = this.current_song_index + 1
			if (this.songs.length > new_index) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = 0
			}
      this.setCurrentSong(this.songs[this.current_song_index])
    }
  }

  previousSong() {
    if (this.songs != undefined && this.songs.length > 1){
			var new_index = this.current_song_index - 1
			if (new_index >= 0) {
				this.current_song_index = new_index
			} else {
				this.current_song_index = this.songs.length - 1
			}
      this.setCurrentSong(this.songs[this.current_song_index])
    }
  }

}
