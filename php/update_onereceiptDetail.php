<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $crd_pk = $_POST['crd_pk'];
    $status = $_POST['status'];
    

    $sql = "UPDATE `chem_receipt_detail` SET `crd_status` = '".$status."',`crd_updDt` = CURRENT_TIMESTAMP WHERE `crd_pk` = '".$crd_pk."'";
    $result = mysql_query($sql);

     if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>