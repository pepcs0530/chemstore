<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    $sql = "SELECT * FROM `chem_account`
    WHERE `ca_cat_fk` = 2";

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>