var expect = require('chai').expect
var jsdom = require('mocha-jsdom')
var ihapPlaylist = require('../../src/js/modules/ihap_playlist.js')

describe('ihap playlist module', function() {
  // create dom
  jsdom()

  context('constructor', function() {
    it('has correct properties when initialized empty', function() {
      let playlist = new ihapPlaylist();

      expect(playlist.markup).not.to.be.null
      expect(playlist.element).not.to.be.null
      expect(playlist.songs).to.be.null
      expect(playlist.current_song_index).to.equal(0)

      expect(playlist.markup.outerHTML).to.match(/<div\s*id="\w*"\s*class="\w*">.*<\/div>/g)
      expect(playlist.element.outerHTML).to.match(/<ul\s*id="\w*"\s*class="\w*">.*<\/ul>/g)
    })

    it('has correct properties when initialized with an array of songs', function() {
      let songs = [{
        title: "Song 1",
        id: "1",
        artist: 'Artist 1',
        url: "http://www.html5tutorial.info/media/vincent.mp3"
      }, {
        title: "Song 2",
        id: "2",
        artist: 'Artist 2',
        url: "http://www.html5tutorial.info/media/vincent.mp3"
      }]
      let playlist = new ihapPlaylist(songs);

      expect(playlist.markup).not.to.be.null
      expect(playlist.element).not.to.be.null
      expect(playlist.songs).to.equal(songs)
      expect(playlist.current_song_index).to.equal(0)

      expect(playlist.element.innerHTML).to.match(/<li>.*<\/li>/g)
    })


  })
})
