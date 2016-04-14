<?php

    include 'connect.php';

    $sql = "SELECT * 
        FROM `chem_import_log`
        INNER JOIN `chem_category`
        ON `cil_cc_fk`=`cc_pk`
        INNER JOIN `chem_unit`
        ON `cc_unit_fk`=`cu_pk`
        INNER JOIN `chem_location`
        ON `cc_location_fk`=`cl_pk`
        ORDER BY `cil_pk` DESC";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>