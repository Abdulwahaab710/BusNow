/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var bussroutes = ["1","2","3","4"];
var ID = [];
var LAT = "";
var LONG = "";

for(var i = 0; i < 4; i++) {
  var title = bussroutes[i];
  title = title.charAt(0).toUpperCase() + title.substring(1);
    
  ID.push({
      title:title,
    });
  }

var main = new UI.Window();

var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'BusNow Loading Data! ...',
  font:'DROID_SERIF_28_BOLD',
  color:'yellow',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'black'
  
});

main.add(text);
main.show();


function success(pos) {
  LAT = pos.coords.latitude;
  LONG = pos.coords.longitude;
}

function error(err) {
  if(err.code == err.PERMISSION_DENIED) {
    console.log('Location access was denied by the user.');  
  } else {
    console.log('location error (' + err.code + '): ' + err.message);
  }
}

var options = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};
navigator.geolocation.getCurrentPosition(success, error, options);

ShowOptions();

function ShowOptions(){
  var menu = new UI.Menu({
    sections: [ {
      items:ID
    }]});
  main.hide();
  menu.show();
}



