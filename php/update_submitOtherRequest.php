<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cro_pk = $_POST['cro_pk'];

$sql = "UPDATE `chem_request_other` 
    SET `cro_status` = '1',
        `cro_updDt` = CURRENT_TIMESTAMP
    WHERE cro_pk = ".$cro_pk."";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>