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


    $crd_cr_fk = $_POST['crd_cr_fk'];
    $crd_cc_fk = $_POST['crd_cc_fk'];
    $crd_amt = $_POST['crd_amt'];
    $crd_price = $_POST['crd_price'];
    $crd_unit = $_POST['crd_unit'];
    $sql = "INSERT INTO chem_receipt_detail (crd_cr_fk, crd_cc_fk, crd_amt, crd_price, crd_unit, crd_crtDT) ".
           "VALUE ('".$crd_cr_fk."','".$crd_cc_fk."','".$crd_amt."','".$crd_price."','".$crd_unit."', CURRENT_TIMESTAMP)";
    $query = mysql_query($sql);
    
    echo $query;
?>