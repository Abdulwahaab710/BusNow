/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
function gps(){
  function success(pos) {
    console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  }
  
  function error(err) {
    console.log('location error (' + err.code + '): ' + err.message);
  }
  
  /* ... */
  
  // Choose options about the data returned
  var options = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  };
  
  // Request current position
  return navigator.geolocation.getCurrentPosition(success, error, options);
}
//var gpsCoord = 'hello world';
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: gps(),
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();
