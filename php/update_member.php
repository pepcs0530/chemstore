<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$pk = $_POST['pk'];
$code = $_POST['code'];
$tname = $_POST['tname'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$tel = $_POST['tel'];

$sql = "UPDATE chem_account SET 
    ca_code = '".$code."',
    ca_tname = '".$tname."',
    ca_fname = '".$fname."',
    ca_lname = '".$lname."',
    ca_tel = '".$tel."',
    ca_updDt = CURRENT_TIMESTAMP
    WHERE ca_pk = '".$pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>