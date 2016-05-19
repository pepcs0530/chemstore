<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $crd_pk = $_POST['crd_pk'];
    $status = $_POST['status'];
    

    $sql = "UPDATE `chem_receipt_detail` SET `crd_status` = '".$status."',`crd_updDt` = CURRENT_TIMESTAMP WHERE `cr_pk` = '".$crd_pk."'";
    $result = mysql_query($sql);
?>