<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $cr_pk = $_POST['cr_pk'];
    $cr_cp_fk = $_POST['cr_cp_fk'];
    $cp_teach_fk = $_POST['cp_teach_fk'];
    $totalprice = $_POST['totalprice'];

//    //update เงินในใบเสร็จ
    $sql = "UPDATE `chem_receipt` SET `cr_cost` = `cr_cost` - '".$totalprice."' WHERE `cr_pk` = '".$cr_pk."'";
    $result = mysql_query($sql);

    //update เงินอาจารย์
    $sql = "UPDATE `chem_account` SET `ca_credit` = `ca_credit` + ".$totalprice." WHERE `ca_pk` = ".$cp_teach_fk;
    $result = mysql_query($sql);
    
    //update เงินโปรเจค
    $sql = "UPDATE `chem_project` SET `cp_current_budget` = `cp_current_budget` + ".$totalprice." WHERE `cp_pk` = ".$cr_cp_fk;
    $result = mysql_query($sql);
?>