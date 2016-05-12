var expect = require('chai').expect
var jsdom = require('mocha-jsdom')
var ihapSongInformation = require('../../src/js/modules/ihap_song_information.js')

describe('ihap song_information module', function() {
  // create dom
  jsdom()

  context('constructor', function() {
    it('has correct initial properties', function() {
      let song_information = new ihapSongInformation();

      expect(song_information.markup).not.to.be.null
      expect(song_information.element).not.to.be.null
      expect(song_information.markup.outerHTML).to.match(/<div\s*id="\w*"\s*class="\w*">.*<\/div>/g)
      expect(song_information.element.outerHTML).to.match(/<div\s*id="\w*"\s*class="\w*">.*<\/div>/g)
    })
  })
})
