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
    $crd_location = $_POST['crd_location'];

    $sql = "INSERT INTO chem_receipt_detail (crd_cr_fk, crd_cc_fk, crd_amt, crd_price, crd_unit, crd_crtDT, crd_status, crd_location_chem) ".
           "VALUE ('".$crd_cr_fk."','".$crd_cc_fk."','".$crd_amt."','".$crd_price."','".$crd_unit."', CURRENT_TIMESTAMP,'".$crd_status."','".$crd_location."')";
    $query = mysql_query($sql);

    if($query){
        Print "\n Your information has been successfully added to the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>