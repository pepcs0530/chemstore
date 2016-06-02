<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $cr_pk = $_POST['cr_pk'];
    $cp_teach_fk = $_POST['cp_teach_fk'];
    $status = $_POST['status'];
    $totalprice = $_POST['totalprice'];
    
    if(!isset($_POST['cr_cp_fk'])){
        $cr_cp_fk = '';    
    } 
    else{
        $cr_cp_fk = $_POST['cr_cp_fk'];
    }


    //update สถานะใบเสร็จ
    $sql = "UPDATE `chem_receipt` SET `cr_status` = '".$status."',`cr_updDt` = CURRENT_TIMESTAMP WHERE `cr_pk` = '".$cr_pk."'";
    $result = mysql_query($sql);
    
    if($cr_cp_fk != ''){
        //update เงินอาจารย์
        $sql = "UPDATE `chem_account` SET `ca_credit` = `ca_credit` - ".$totalprice." WHERE `ca_pk` = ".$cp_teach_fk;
        $result = mysql_query($sql);

        //update เงินโปรเจค
        $sql = "UPDATE `chem_project` SET `cp_current_budget` = `cp_current_budget` - ".$totalprice." WHERE `cp_pk` = ".$cr_cp_fk;
        $result = mysql_query($sql);
    }
?>