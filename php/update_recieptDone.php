<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $cr_pk = $_POST['cr_pk'];
    $status = $_POST['status'];
    
    //update สถานะใบเสร็จ
    $sql = "UPDATE `chem_receipt` SET `cr_status` = '".$status."',`cr_updDt` = CURRENT_TIMESTAMP WHERE `cr_pk` = '".$cr_pk."'";
    $result = mysql_query($sql);
?>