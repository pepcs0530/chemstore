<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$pk = $_POST['cc_pk'];
$qty = $_POST['cc_quantity'];

$sql = "UPDATE chem_category SET 
    cc_quantity = '".$qty."',
    cc_updDt = CURRENT_TIMESTAMP
    WHERE cc_pk = '".$pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>