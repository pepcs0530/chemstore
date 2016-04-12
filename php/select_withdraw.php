<?php

    include 'connect.php';

    $sql = "SELECT `cr_pk`,`cr_no`,`ca_user`,`ca_tname`,`ca_fname`,`ca_lname`,`cp_name`,`cp_teach_fk`,`cr_crtDt` ".
            "FROM `chem_receipt` ".
            "INNER JOIN `chem_project` ".
            "ON `cr_cp_fk` = `cp_pk` ".
            "INNER JOIN `chem_account` ".
            "ON cp_teach_fk = `ca_pk` ".
            "ORDER BY `cr_crtDt` DESC";


    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>