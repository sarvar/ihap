var expect = require('chai').expect
var jsdom = require('mocha-jsdom')
var ihapAudio = require('../../src/js/modules/ihap_audio.js')

describe('ihap audio module', function() {
  // create dom
  jsdom()

  context('constructor', function() {
    it('has has correct initial properties', function() {
      let ihap_audio = new ihapAudio();

      expect(ihap_audio.markup).not.to.be.null
      expect(ihap_audio.element).not.to.be.null
      expect(ihap_audio.playing).not.to.be.null

      expect(ihap_audio.element.outerHTML).to.match(/<audio\s*id="ihap_player"\s*src=".*?">.*?<\/audio>/g)
      expect(ihap_audio.markup.outerHTML).to.match(/<div\s*?id="ihap_player_wrapper">.*?<\/div>/g)
      expect(ihap_audio.playing).to.be.false
    })
  })

  context('audio element', function() {
    it('can set valid songs', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        url: 'http://www.html5tutorial.info/media/vincent.mp3'
      }
      ihap_audio.setSong(song)
      let src = ihap_audio.element.getAttribute('src')

      expect(src).to.equal(song.url)
      expect(src).not.to.equal("")
    })

    it('cannot set invalid songs', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        invalid_param: '123'
      }
      let setInvalidSong = function() {
        ihap_audio.setSong(song)
      };

      expect(setInvalidSong).to.throw(/.*/)
    })

    it('can play songs', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        url: 'http://www.html5tutorial.info/media/vincent.mp3'
      }
      ihap_audio.setSong(song)

      let duration = ihap_audio.element.getAttribute('aria-valuemax')
      ihap_audio.play()

      expect(ihap_audio.playing).to.be.true
      expect(duration).not.to.equal('0')
    })

    it('can pause songs', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        url: 'http://www.html5tutorial.info/media/vincent.mp3'
      }
      ihap_audio.setSong(song)

      ihap_audio.play()
      expect(ihap_audio.playing).to.be.true

      ihap_audio.pause()
      expect(ihap_audio.playing).to.be.false
    })

    it('can be emptied', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        url: 'http://www.html5tutorial.info/media/vincent.mp3'
      }
      ihap_audio.setSong(song)
      ihap_audio.play()
      var src = ihap_audio.element.getAttribute('src')
      expect(src).not.to.equal('')

      ihap_audio.empty()

      src = ihap_audio.element.getAttribute('src')
      let duration = ihap_audio.element.getAttribute('aria-valuemax')
      expect(src).to.equal('')
      expect(duration).to.equal('0')
    })

    it('can be asked if empty', function() {
      let ihap_audio = new ihapAudio();
      let song = {
        url: 'http://www.html5tutorial.info/media/vincent.mp3'
      }
      ihap_audio.setSong(song)
      ihap_audio.play()

      expect(ihap_audio.is_empty()).to.be.false
      ihap_audio.empty()
      expect(ihap_audio.is_empty()).to.be.true
    })
  })
})
