<?php
    include 'connect.php';

    $sql = "SELECT cat_pk, cat_name FROM chem_account_type";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>