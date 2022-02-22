<?php
Header('Access-Control-Allow-Origin: *'); 
Header('Access-Control-Allow-Headers: *'); 
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); 
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Bangkok');

$hostname = "localhost"; 
$database  = "crs"; 
$username = "root";
$password = "";

define('LINE_API', "https://notify-api.line.me/api/notify");
define('webUrl', "http://10.1.8.253:80/crs");
// $token = "W45sITRYLycIELNhECWiKjUpn5Z7meIVilOXB8T0K5q";
$token = "lmZADgjhFWsApkex5W4JAeljXxpEe0VlcrtrbuqzaoW";
?>
