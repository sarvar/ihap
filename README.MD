# **i**ndependent **h**tml5 **a**udio **p**layer
HTML5 audioplayer plugin
## Features
* no dependencies
* lightweight
* highly customizable

## Setup
### Installation
Install via npm
```
npm install ihap --save
```

or download the plugin manually
```
dist/js/ihap.min.js  # js
dist/css/ihap.css    # styles
```

### Load the plugin
Use your favorite module loader
```javascript
import ihap from 'ihap';
// or
var ihap = require('ihap');
// or whatever
```

or include js & css directly into your HTML
```html
<!-- include the ihap javascript -->
<script src="ihap.js"></script>

<!-- include the styles -->
<link rel="stylesheet" href="ihap.css">
```

### Add required markup
Make sure you have at least a container div for the player in your markup
```html
<div id="audioplayer_container"></div>
```
If you want to use the visual playlist then create a container for that, too
```html
<div id="playlist_container"></div>
```

### Initialize the plugin
```html
<script>
  var player = new Ihap({
        settings: {
          container: 'audioplayer_container'  // use your selector
        },
        songs: [
          {
            title: 'Song title',
            id: '1',
            artist: 'Song artist',
            url: 'Song url'
          }
        ]
      });
</script>
```

See the [wiki](https://github.com/cars10/ihap/wiki) for a complete list of [options](https://github.com/cars10/ihap/wiki/Options) and the [API](https://github.com/cars10/ihap/wiki/API).


## Contributing and development
1. Fork the project ( https://github.com/cars10/ihap/fork )
2. run `npm install`
3. run `npm run dev` to start the build task
4. Create your feature branch (`git checkout -b feature`)
5. Create your feature and write specs for it
6. Run the specs `npm test`
7. Commit your changes (`git commit -am 'added new feature'`)
8. Push the branch (`git push origin feature`)
9. Create a new pull request
