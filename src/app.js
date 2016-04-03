/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ID = [];
var ajax = require('ajax');
//var LAT = "";
//var LONG = "";
var CustomURL = "http://abdulwahaab.ca/octranspo/index.php?busNo=3021";
var Destinations = [];
var BusNumbers = [];
var Times = [];

function WRAP (){
  for(var i = 0; i < BusNumbers.length; i++) {
  var title = BusNumbers[i];
  console.log(title);
  //title = title.charAt(0).toUpperCase() + title.substring(1);
  
  var subtitle = Destinations[i]/* + "\n" + Times[i]*/;
  console.log(subtitle);

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


/*function success(pos) {
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
navigator.geolocation.getCurrentPosition(success, error, options);*/

ajax(
  {
    url:CustomURL,
    type:'json'
    
  },
  function(Data){
    var Routes = Data.GetRouteSummaryForStopResult.Routes;
    for(var i = 0; i< Routes.Route.length;i++){
      BusNumbers.push(Routes.Route[i].RouteNo);
      if (Routes.Route[i].Trips.length > 0){
        Destinations.push(Routes.Route[i].RouteHeading);
        Times.push(Routes.Route[i].Trips[0].AdjustedScheduleTime);
      }
      else{
        Destinations.push("No more Busses at this time");
      }
    }
    
   WRAP(); 
  }

);


function ShowOptions(){
  var menu = new UI.Menu({
    sections: [ {
      items:ID
    }]});
  main.hide();
  menu.show();
}



