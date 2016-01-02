<?php
	if(isset($_GET['id']) && $_GET['id'] != '')
	{
		header("Access-Control-Allow-Origin: *");
		$key = $_GET['id'];

		require "../predis/autoload.php";

		$my_server = array(
		    'host'     => '127.0.0.1',
		    'port'     => 6379,
		    'database' => 15
		);

		$client = new Predis\Client($my_server);

		$path = $client->get($key);

		print $path;

	}
?>
