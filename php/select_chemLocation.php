<?php
    include 'connect.php';

    $sql = "SELECT `cl_pk`,`cl_name`,`cl_name_abb` FROM chem_location";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>