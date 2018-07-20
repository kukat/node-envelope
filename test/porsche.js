var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )
var Envelope = require( '..' )

suite( 'Envelope', function() {

  suite( 'Porsche', function() {

    test( 'should able to parse emails sent from porsche', function() {
      var filename = path.join( __dirname, 'data', 'issues', 'porsche.eml' )
      var data = fs.readFileSync( filename )
      var mail = new Envelope( data )

      function findEnvelopeByMime(mail, mime) {

        var ret = -1
        var data = Object.values(mail)

        for (var i = 0; i < data.length; i++) {

          var element = data[i]
          var children = (element instanceof Envelope) ? Object.values(element) : null

          if (element instanceof Envelope && element.header.contentType.mime === mime) {
            return element;
          } else if (children && children.length && children instanceof Array) {
            ret = findEnvelopeByMime(children, mime);
            if (element instanceof Envelope && element.header.contentType.mime === mime) {
              return ret;
            }
          }
        }
        return ret;
      }

      var mime = "text/html"
      var envelope = findEnvelopeByMime(mail, mime)
      assert.ok(envelope.header.contentType.mime === mime)
    })

  })

})
