<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cp_pk = $_POST['cp_pk'] ;
$cp_name = $_POST['cp_name'] ;
$cp_eduLvl = $_POST['cp_eduLvl'] ;
$cp_budget = $_POST['cp_budget'] ;
$cp_desc = $_POST['cp_desc'] ;


$sql = "UPDATE chem_project SET 
    cp_name = '".$cp_name."',
    cp_eduLvl = '".$cp_eduLvl."',
    cp_budget = '".$cp_budget."',
    cp_desc = '".$cp_desc."',
    cp_updDt = CURRENT_TIMESTAMP
    WHERE cp_pk = '".$cp_pk."'";

print $sql;

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>