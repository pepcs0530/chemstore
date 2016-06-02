<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $ced_pk = $_POST['ced_pk'];
    $status = $_POST['status'];
    $ced_desc = $_POST['ced_desc'];
    

    $sql = "UPDATE `chem_exchange_detail` 
            SET `ced_status` = '".$status."',
                `ced_updDt` = CURRENT_TIMESTAMP, 
                `ced_desc` = '".$ced_desc."'
            WHERE `ced_pk` = '".$ced_pk."'";
    $result = mysql_query($sql);

     if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>