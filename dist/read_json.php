<?php
	require 'db.php';
	require "predis/autoload.php";

	$my_server = array(
	    'host'     => '127.0.0.1',
	    'port'     => 6379,
	    'database' => 15
	);


	$client = new Predis\Client($my_server);

	$JSON = file_get_contents('JeffsQuandry.json');
	$JSON = json_decode($JSON,true);


	$sql = "TRUNCATE TABLE stream";
	mysql_query($sql);
	

	foreach ($JSON['features'] as $value) {
		$sql = "INSERT INTO stream VALUES ('"
		     . $value['attributes']['OBJECTID'] . "','"
		     . $value['attributes']['Lake_Num'] . "','"
		     . $value['attributes']['Name'] . "','"
		     . "" . "','"
		     . "" . "','"
		     . "" . "')";

		mysql_query($sql);

		$key = $value['attributes']['OBJECTID'];
		$geo = json_encode($value['geometry']);

		$client->set($key,$geo);


//		print $value['attributes']['OBJECTID'] . " - " . $value['attributes']['Name'] . "<br />\n";
//		print_r($value); exit;	
	}

	



?>
