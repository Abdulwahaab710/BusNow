/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/*jshint esversion: 6 */
// Import statements
const UI = require("ui");
const Vector2 = require("vector2");
const ajax = require("ajax");

let ID = [];
let LONG = '-75.6892807';
let LAT = '45.423664';
let Destinations = [];
let BusNumbers = [];
let Times = [];

function WRAP (){
  
  for(let i = 0; i < BusNumbers.length; i++) {
    let title = "#" + BusNumbers[i] + "  in " +Times[i] + " mins";
    let subtitle = Destinations[i];
    ID.push({
        title:title,
        subtitle:subtitle      
      });
  }
  showOptions();
}


let main = new UI.Window();

let text = new UI.Text({
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

//let LAT;
//let LONG;

loadBus(LAT,LONG);
function success(pos) {
  let CustomURL;
  LAT = String(pos.coords.latitude);
  LONG = String(pos.coords.longitude);
  CustomURL = "http://abdulwahaab.ca/octranspo/testing.php?lat=" + LAT + "&long=" + LONG;
  loadBus(LAT,LONG);
  
}
function error(err) {
  if(err.code == err.PERMISSION_DENIED) {
    console.log('Location access was denied by the user.');  
    let permission_denied = new UI.Window();
    let error_msg = new UI.Text({
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

let options = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};
navigator.geolocation.getCurrentPosition(success, error, options);
function loadBus(lat,long){
  let CusURL = "http://abdulwahaab.ca/octranspo/testing.php?lat=" + lat + "&long=" + long;
  ajax(
    {
      url:CusURL,
      type:'json'
    },
    function(Data){
      let Routes = Data.GetRouteSummaryForStopResult.Routes;
      for(let i = 0; i< Routes.Route.length;i++){
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
    WRAP(); 
    }

  );
}

function showOptions(){
  let menu = new UI.Menu({
    sections: [{
      title: "Available Buses",
      items:ID
    }]});
  main.hide();
  menu.show();
}
