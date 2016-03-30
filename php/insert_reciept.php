<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    
        
    $db_host = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = 'db_chem_lab';
    mysql_connect("$db_host","$db_username","$db_password") or die ("Cound not connect to mysql");
    mysql_select_db("$db_name") or die ("No database");
    mysql_query("SET NAMES utf8");

    $cr_no = $_POST['cr_no'];
    $cr_cp_fk = $_POST['cr_cp_fk'];
    $sql = "INSERT INTO `chem_receipt` (cr_no, cr_cp_fk, cr_crtDt) VALUE('".$cr_no."','".$cr_cp_fk."', CURRENT_TIMESTAMP)";
    $query = mysql_query($sql);

    $sql = "SELECT cr_pk FROM `chem_receipt` ORDER BY `cr_pk` DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>