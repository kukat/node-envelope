
# Envelope [![build status](https://secure.travis-ci.org/jhermsmeier/node-envelope.png)](http://travis-ci.org/jhermsmeier/node-envelope)

Envelope translates raw emails into objects.


## Install with [npm](https://npmjs.org)

```sh
$ npm install envelope
```


## Usage

```javascript
var fs = require( 'fs' )
var Envelope = require( 'envelope' )

// Read email into a buffer
var data = fs.readFileSync( './test.eml' )

// Construct envelope
var email = new Envelope( data )

console.log( email )
```

Example Output:

```js
{
  original: {
    header: <Buffer 52 65 63 65 69 76 65 64 3a 20 62 79 20 6d 61 69 6c 2d 77 69 30 2d 66 31 37 35 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 20 77 69 74 68 20 53 4d 54 50 20 69 64 20...>,
    body: <Buffer 0d 0a 0d 0a 2d 2d 30 34 37 64 37 62 66 64 30 34 36 65 37 37 38 65 38 64 30 34 64 31 37 32 65 37 63 62 0d 0a 43 6f 6e 74 65 6e 74 2d 54 79 70 65 3a 20 74...>
  },
  header: {
    received: [
      'by mail-wi0-f175.google.com with SMTP id hm11so5717280wib.2 for <me@jhermsmeier.de>; Sat, 22 Dec 2012 07:49:06 -0800 (PST)',
      'by 10.194.78.162 with SMTP id c2mr28698959wjx.46.1356191346691; Sat, 22 Dec 2012 07:49:06 -0800 (PST)',
      'by 10.194.64.229 with HTTP; Sat, 22 Dec 2012 07:49:06 -0800 (PST)'
    ],
    mimeVersion: '1.0',
    date: 'Sat, 22 Dec 2012 16:49:06 +0100',
    messageId: '<CA+0p7-rrsAij-6nzDgk3R62ZHRZrjdJvOjxhCsHQ+m=nERwCJA@mail.gmail.com>',
    subject: 'AGAIN',
    from: {
      address: 'jhermsmeier@gmail.com',
      name: 'Jonas Hermsmeier'
    },
    to: {
      address: 'me@jhermsmeier.de',
      name: null
    },
    contentType: {
      mime: 'multipart/alternative',
      boundary: '047d7bfd046e778e8d04d172e7cb'
    }
  },
  '0': {
    '0': 'HELO',
    original: {
      header: <Buffer 43 6f 6e 74 65 6e 74 2d 54 79 70 65 3a 20 74 65 78 74 2f 70 6c 61 69 6e 3b 20 63 68 61 72 73 65 74 3d 55 54 46 2d 38>,
      body: <Buffer 0d 0a 0d 0a 48 45 4c 4f 0d 0a 0d 0a>
    },
    header: {
      contentType: {
        mime: 'text/plain',
        charset: 'UTF-8'
      }
    }
  },
  '1': {
    '0': '<div dir=\\"ltr\\">HELO</div>\r\n\r\n--047d7bfd046e778e8d04d172e7cb--',
    original: {
      header: <Buffer 43 6f 6e 74 65 6e 74 2d 54 79 70 65 3a 20 74 65 78 74 2f 68 74 6d 6c 3b 20 63 68 61 72 73 65 74 3d 55 54 46 2d 38>,
      body: <Buffer 0d 0a 0d 0a 3c 64 69 76 20 64 69 72 3d 5c 22 6c 74 72 5c 22 3e 48 45 4c 4f 3c 2f 64 69 76 3e 0d 0a 0d 0a 2d 2d 30 34 37 64 37 62 66 64 30 34 36 65 37 37...>
    },
    header: {
      contentType: {
        mime: 'text/html',
        charset: 'UTF-8'
      }
    }
  }
}
```


## API

### new Envelope( *buffer* )
Contructs a new envelope object from a buffer.

### Envelope.parse( *buffer* )
Same as `new Envelope()`


## License (MIT)

Copyright (c) 2012 [Jonas Hermsmeier](http://jhermsmeier.de)

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
