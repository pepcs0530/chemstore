<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';

    $cr_no = $_POST['cr_no'];
    $cr_cp_fk = $_POST['cr_cp_fk'];
    $totalmoney = $_POST['totalmoney'];

    $sql = "INSERT INTO `chem_receipt` (cr_no, cr_totalprice, cr_cp_fk, cr_crtDt) VALUE('".$cr_no."','".$totalmoney ."','".$cr_cp_fk."', CURRENT_TIMESTAMP)";
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