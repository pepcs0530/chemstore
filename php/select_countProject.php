<?php
    include 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $findthis = $_POST['findthis'];
    
$sql = "SELECT `cp_eduLvl`,`cp_reasonyear` ,COUNT(cp_eduLvl) AS edu_count  FROM `chem_project` WHERE `cp_reasonyear` = '".$findthis."' GROUP BY `cp_eduLvl` ";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>