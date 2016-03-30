<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$pk = $_POST['pk'];
$user = $_POST['user'];
$pass = $_POST['pass'];

$sql = "UPDATE chem_account SET 
    ca_pass = '".$pass."',
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