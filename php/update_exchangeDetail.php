<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $ced_ce_fk = $_POST['ced_ce_fk'];
    $status = $_POST['status'];
    

    $sql = "UPDATE `chem_exchange_detail` SET `ced_status` = '".$status."',`ced_updDt` = CURRENT_TIMESTAMP WHERE `ced_ce_fk` = '".$ced_ce_fk."'";
    $result = mysql_query($sql);

     if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>