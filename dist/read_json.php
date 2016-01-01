<?php

	$JSON = file_get_contents('JeffsQuandry.json');

	foreach ($JSON['features'] as $value) {
		print $value; exit;	
	}

	



?>