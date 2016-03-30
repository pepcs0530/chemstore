<?php
//    $db_host = "localhost";
//    $db_username = "root";
//    $db_password = "";
//    $db_name = 'db_chem_lab';
//    mysql_connect("$db_host","$db_username","$db_password") or die ("Cound not connect to mysql");
//    mysql_select_db("$db_name") or die ("No database");
//    mysql_query("SET NAMES utf8");

    include 'connect.php';
    
    $sql = "SELECT cp_pk,cp_name,cp_budget,ca_tname,ca_fname,cp_desc ".
            "FROM chem_project ".
            "INNER JOIN chem_account ".
            "ON cp_teach_fk = ca_pk";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>