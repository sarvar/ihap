var expect = require('chai').expect
var jsdom = require('mocha-jsdom')
var ihapControls = require('../../src/js/modules/ihap_controls.js')

describe('ihap controls module', function() {
  // create dom
  jsdom()

  context('constructor', function() {
    it('has no empty properties', function() {
      let ihap_controls = new ihapControls();

      expect(ihap_controls.markup).not.to.be.null
      expect(ihap_controls.buttons).not.to.be.null
      expect(ihap_controls.buttons.play).not.to.be.null
      expect(ihap_controls.buttons.pause).not.to.be.null
      expect(ihap_controls.buttons.skip_next).not.to.be.null
      expect(ihap_controls.buttons.skip_previous).not.to.be.null
    })

    it('has correct properties', function() {
      let ihap_controls = new ihapControls();

      expect(ihap_controls.markup.outerHTML).to.match(/<div\s*id="\w*"\s*class="\w*">.*<\/div>/g)
      expect(ihap_controls.buttons.play.outerHTML).to.match(/<i\s*id="\w*|\s*"\s*class="\w*">.*<\/i>/g)
      expect(ihap_controls.buttons.pause.outerHTML).to.match(/<i\s*id="\w*|\s*"\s*class="\w*">.*<\/i>/g)
      expect(ihap_controls.buttons.skip_next.outerHTML).to.match(/<i\s*id="\w*|\s*"\s*class="\w*">.*<\/i>/g)
      expect(ihap_controls.buttons.skip_previous.outerHTML).to.match(/<i\s*id="\w*|\s*"\s*class="\w*">.*<\/i>/g)
    })
  })
})
