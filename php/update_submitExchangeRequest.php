<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$ce_pk = $_POST['ce_pk'];
$status = $_POST['status'];

$sql = "UPDATE `chem_exchange` SET `ce_status` = '".$status."',`ce_updDt` = CURRENT_TIMESTAMP WHERE `ce_pk` = '".$ce_pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>