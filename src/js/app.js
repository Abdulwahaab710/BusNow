/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/*jshint esversion: 6 */
// Import statements
const UI = require('ui');
const Vector2 = require('vector2');
const ajax = require('ajax');

var ID = [];
var LONG = '-75.6892807';
var LAT = '45.423664';
var Destinations = [];
var BusNumbers = [];
var Times = [];

function wrap (){
  
  for(var i = 0; i < BusNumbers.length; i++) {
    var title = "#" + BusNumbers[i] + "  in " +Times[i] + " mins";
    //title = title.charAt(0).toUpperCase() + title.substring(1);
    var subtitle = Destinations[i];
    //subtitle = subtitle.charAt(0).toUpperCase() + subtitle.substring(1);
    ID.push({
        title:title,
        subtitle:subtitle      
      });
  }
  ShowOptions();
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

//var LAT;
//var LONG;

loadBus(LAT,LONG);
var CustomURL;
function success(pos) {
  //LAT = String(pos.coords.latitude);
  //LONG = String(pos.coords.longitude);
  CustomURL = "http://abdulwahaab.ca/octranspo/testing.php?lat=" + LAT + "&long=" + LONG;
  /*console.log(LAT);
  console.log(LONG);
  console.log(CustomURL);*/
  loadBus(LAT,LONG);
  
}
function error(err) {
  if(err.code == err.PERMISSION_DENIED) {
    console.log('Location access was denied by the user.');  
    var permission_denied = new UI.Window();
    var error_msg = new UI.Text({
      position: new Vector2(0, 0),
      size: new Vector2(144, 168),
      text: 'Location access was denined by the user.',
      font:'DROID_SERIF_28_BOLD',
      color:'red',
      textOverflow:'wrap',
      textAlign:'center',
      backgroundColor:'black'
    });
    main.hide();
    permission_denied.add(error_msg);
    permission_denied.show();
  } else {
    console.log('location error (' + err.code + '): ' + err.message);
  }
}

var options = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};
//navigator.geolocation.getCurrentPosition(success, error, options);
function loadBus(lat,long){
  var cusURL = "https://abdulwahaab.ca/octranspo/testing.php?lat=" + lat + "&long=" + long;
  ajax(
    {
      url:cusURL,
      type:'json'
    },
    function(Data){
      var Routes = Data.GetRouteSummaryForStopResult.Routes;
      for(var i = 0; i< Routes.Route.length;i++){
        if (Routes.Route[i].Trips.length === undefined || Routes.Route[i].Trips.length > 0){
          BusNumbers.push(Routes.Route[i].RouteNo);
          Destinations.push(Routes.Route[i].RouteHeading);
          if (Routes.Route[i].Trips.hasOwnProperty("AdjustedScheduleTime")){
            Times.push(Routes.Route[i].Trips.AdjustedScheduleTime);  
          }else{
            Times.push(Routes.Route[i].Trips[0].AdjustedScheduleTime);
          }
        }
      }
    wrap(); 
    }

  );
}

function ShowOptions(){
  var menu = new UI.Menu({
    sections: [{
      title: "Available Buses",
      items:ID
    }]});
  main.hide();
  menu.show();
}
