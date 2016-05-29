<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $cr_pk = $_POST['cr_pk'];
    $cr_cp_fk = $_POST['cr_cp_fk'];
    $cp_teach_fk = $_POST['cp_teach_fk'];
    $status = $_POST['status'];
    $totalprice = $_POST['totalprice'];

    $sql = "UPDATE `chem_receipt` SET `cr_status` = '".$status."',`cr_updDt` = CURRENT_TIMESTAMP WHERE `cr_pk` = '".$cr_pk."'";
    $result = mysql_query($sql);
?>