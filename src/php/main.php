<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Europe/Moscow');


$current_time = date("H:i:s");
$starting_time = microtime(true);

echo 'HUY';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        echo 'huy2';
        exit("HUY");
    } catch (Exception $e) {
        echo json_encode($e->getMessage());
    }
}