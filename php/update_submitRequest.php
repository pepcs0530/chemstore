<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cr_pk = $_POST['cr_pk'];
$totalprice = $_POST['totalprice'];
$cr_cp_fk = $_POST['cr_cp_fk'];

$sql = "UPDATE `chem_receipt` SET `cr_status` = '1',`cr_updDt` = CURRENT_TIMESTAMP WHERE `cr_pk` = '".$cr_pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }

$sql = "UPDATE `chem_project` SET `cp_budget` = `cp_budget` - ".$totalprice.", `cp_updDt` = CURRENT_TIMESTAMP WHERE `cp_pk` = '".$cr_cp_fk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>