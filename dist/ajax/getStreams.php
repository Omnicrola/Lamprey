<?php
	require '../db.php';

	$sql = "SELECT * FROM stream";
	$result = mysql_query($sql);

	$streams = '';
	$counter = 0;

	while($row = mysql_fetch_array($result))
	{
		$streams[$counter]['id'] = $row['id'];
		$streams[$counter]['lake'] = $row['lake'];
		$streams[$counter]['name'] = $row['name'];
		$streams[$counter]['length'] = $row['length'];
		$streams[$counter]['mouth_lat'] = $row['mouth_lat'];
		$streams[$counter]['mouth_long'] = $row['mouth_long'];
		$counter++;
	}
	$streams = json_encode($streams);
	print $streams;
	

?>
