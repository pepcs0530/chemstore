<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $crd_cr_fk = $_POST['crd_cr_fk'];
    $status = $_POST['status'];
    

    $sql = "UPDATE `chem_receipt_detail` SET `crd_status` = '".$status."',`crd_updDt` = CURRENT_TIMESTAMP WHERE `crd_cr_fk` = '".$crd_cr_fk."'";
    $result = mysql_query($sql);

     if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>