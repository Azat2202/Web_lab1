<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Europe/Moscow');

require __DIR__ . "/Checker.php";

@session_start();

const table_head = "<table border='0' id='outputTable'>
        <tr>
            <th>x</th>
            <th>y</th>
            <th>r</th>
            <th>Статус</th>
            <th>Текущее время</th>
            <th>Время работы скрипта</th>
        </tr>";
const table_tail = '</table>';

if (!isset($_SESSION["results"])) {
    $_SESSION["results"] = array();
}

$current_time = date("H:i:s");
$start_time = microtime(true);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $_SESSION["results"] = array();
    echo table_head;
    echo table_tail;
}

if (isset($_POST["x"]) && isset($_POST["y"]) && isset($_POST["r"])) {
    $x = intval($_POST["x"]);
    $y = floatval($_POST["y"]);
    $r = intval($_POST["r"]);
    $checker = new Checker();
    if ($checker -> validate($x, $y, $r)){
        $cord_status = $checker -> check($x, $y, $r)
            ? "<span class='success'>попадание</span>"
            : "<span class='fail'>промах</span>";
        $elapsed_time = round((microtime(true) - $start_time) * 1000000, 2);
        $new_result = array(
            "x" => $x,
            "y" => $y,
            "r" => $r,
            "coordsStatus" => $cord_status,
            "currentTime" => $current_time,
            "benchmarkTime" => $elapsed_time
        );
        array_push($_SESSION["results"], $new_result);
        echo table_head;
        foreach (array_reverse($_SESSION["results"]) as $table_row) {
            echo "<tr>";
            echo "<td>" . $table_row["x"] . "</td>";
            echo "<td>" . $table_row["y"] . "</td>";
            echo "<td>" . $table_row["r"] . "</td>";
            echo "<td>" . $table_row["coordsStatus"] . "</td>";
            echo "<td>" . $table_row["currentTime"] . "</td>";
            echo "<td>" . $table_row["benchmarkTime"] . "</td>";
            echo "</tr>";
        }
        echo table_tail;
        exit();
    } else{
        exit("<tr><td colspan=6 id='error'>Серверу переданы неверные данные! Проверьте, что все данные введены!</td></tr>");
    }
}
