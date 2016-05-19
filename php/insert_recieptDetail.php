<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';


    $crd_cr_fk = $_POST['crd_cr_fk'];
    $crd_cc_fk = $_POST['crd_cc_fk'];
    $crd_amt = $_POST['crd_amt'];
    $crd_price = $_POST['crd_price'];
    $crd_unit = $_POST['crd_unit'];
    $crd_status = $_POST['crd_status'];

    $sql = "INSERT INTO chem_receipt_detail (crd_cr_fk, crd_cc_fk, crd_amt, crd_price, crd_unit, crd_crtDT, crd_status) ".
           "VALUE ('".$crd_cr_fk."','".$crd_cc_fk."','".$crd_amt."','".$crd_price."','".$crd_unit."', CURRENT_TIMESTAMP,'".$crd_status."')";
    $query = mysql_query($sql);
?>