<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';


    $ced_ce_fk = $_POST['ced_ce_fk'];
    $ced_cc_fk = $_POST['ced_cc_fk'];
    $ced_amt = $_POST['ced_amt'];
    $ced_unit = $_POST['ced_unit'];
    $ced_status = $_POST['ced_status'];
    $ced_location_chem = $_POST['ced_location_chem'];

    $sql = "INSERT INTO chem_exchange_detail (ced_ce_fk, ced_cc_fk, ced_amt, ced_unit, ced_crtDt, ced_status, ced_location_chem) ".
           "VALUE ('".$ced_ce_fk."','".$ced_cc_fk."','".$ced_amt."','".$ced_unit."', CURRENT_TIMESTAMP,'".$ced_status."','".$ced_location_chem."')";
    $query = mysql_query($sql);

    if($query){
        Print "\n Your information has been successfully added to the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>