<?php 
if (isset($_GET['long']) || isset($_GET['lat'])) {
	
}
$stopNo = $_GET['stopNo'];
$googleURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$_GET['long'].'%2C'.$_GET['lat'].'&radius=100&types=bus_station&key=AIzaSyD1Hs5MmZdlEU0qWU9kgfzu3Y0HOlMdxQs';

$json=file_get_contents($googleURL);
$BusData = json_decode($json,true);

//var_dump($BusData);

$BusStopName = $BusData['results'][0]['name'];
echo $BusStopName;

echo "<br><br>";echo "<br><br>";
$data = array('appID' => '496919a0', 'apiKey' => '3de6e07badccb521b64d91a75caff2d0','stopNo'=>$stopNo);
$post = 'appID=496919a0&apiKey=3de6e07badccb521b64d91a75caff2d0&stopNo='.$stopNo.'format=json';
$string = http_build_query($data);
$url = 'https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$resp = curl_exec($curl);
curl_close($curl);
echo $resp;
echo "<br><br>";

$fileContents= $resp;

$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

$fileContents = trim(str_replace('"', "'", $fileContents));

$simpleXml = simplexml_load_string($fileContents);

$json = json_encode($simpleXml);

/*$json_string = json_encode($resp, JSON_PRETTY_PRINT);
echo $json_string;*/
//echo $json;
 ?>
