<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cc_pk = $_POST['cc_pk'];
$cc_location_fk = $_POST['cc_location_fk'];
$cc_desc = $_POST['cc_desc'];

$sql = "UPDATE chem_category SET 
    cc_location_fk = '".$cc_location_fk."',
    cc_desc = '".$cc_desc."',
    cc_updDt = CURRENT_TIMESTAMP
    WHERE cc_pk = '".$cc_pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>