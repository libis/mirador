<?php
 
header("access-control-allow-methods:GET,POST,PUT,DELETE,HEAD,OPTIONS");
header("access-control-allow-origin:*");
header("access-control-expose-headers:X-Requested-With,X-jsonblob,X-Hello-Human,Location,Date,Content-Type,Accept,Origin");
header("cf-ray:3b0b68d41f7e4427-BRU");
header("content-type:application/json; charset=utf-8");
header("accept:application/json");

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$blobPath = $_SERVER['PATH_INFO'];
//$blobPath="/api/jsonBlob";
//echo($method);
//echo($blobpath);

switch ($method) {
  case 'GET':
    $id = $_GET['id'];
    $myfile = fopen("/var/www/html/mirador/bookmark".$blobPath."/".$id.".txt", "r");
    $result = fread($myfile,filesize("/var/www/html/mirador/bookmark".$blobPath."/".$id.".txt"));
     break;
  case 'PUT':
    break;
  case 'POST':
    $id = uniqid();
    $jsblob = file_get_contents('php://input');
    $myfile = fopen("/var/www/html/mirador/bookmark".$blobPath."/".$id.".txt", "w");
    fwrite($myfile,$jsblob);
    fclose($myfile);
    $result ='writed';
    break;
  case 'DELETE':
      break;
}
 
if (!$result) {
//  http_response_code(404);
header('Temporary-Header: True', true, 404);
header_remove('Temporary-Header');

  die(mysqli_error());
} else {
if ($method == 'GET') {
//  http_response_code(200);
  exit($result);
} elseif ($method == 'POST') {
//    http_response_code(201);
header('Temporary-Header: True', true, 201);
header_remove('Temporary-Header');
    header("X-Jsonblob:".$id);
    header("location: http://services4.libis.be/mirador/bookmark/jsonblogFile.php/".$id);
}
}
exit(json_encode (file_get_contents('php://input')));
?>
