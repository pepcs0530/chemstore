<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    $findthis = $_POST['findthis'];

    $sql = "SELECT * FROM `chem_exchange` WHERE ce_ca_fk = '".$findthis."' ORDER BY ce_crtDt DESC";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>