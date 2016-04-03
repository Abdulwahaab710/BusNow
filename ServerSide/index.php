<?php 
if (isset($_GET['long']) || isset($_GET['lat'])) {
	
}

$stopNo = $_GET['stopNo'];

$googleApiKey = 'Your Google Api Key';
$googleURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$_GET['long'].'%2C'.$_GET['lat'].'&radius=100&types=bus_station&key='.$googleApiKey;

$json=file_get_contents($googleURL);
$BusData = json_decode($json,true);

//var_dump($BusData);

$servername = "abdulwahaab.ca.mysql";
$username = "abdulwahaab_ca";
$password = "UAZQvBJ8";
$dbname = "abdulwahaab_ca";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$BusStopName = $BusData['results'][0]['name'];

$Sql = "SELECT stop_code FROM  `stops` WHERE stop_name="."'".$BusStopName."'";
$sql = $Sql;
$result = $conn->query($sql);
$BusNo = $result->fetch_assoc()['stop_code'];

$conn->close();


$BusStopName = $_GET['busNo'];
$apiKey = 'Your OC Transpo Api Key';
$appID = 'Your OC Transpo App ID';

$post = 'appID='.$appID.'&apiKey='.$apiKey.'&stopNo='.$BusNo.'&format=json';
$url = 'https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$resp = curl_exec($curl);
curl_close($curl);
echo $resp;

 ?>