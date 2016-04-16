<?php

$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$teacher_fk = $_POST['teacher_pk'];
$name = $_POST['name'];
$budget = $_POST['budget'];
$desc = $_POST['desc'];
$teacher_budget = $_POST['teacher_budget'];

$sql = "INSERT INTO chem_project (
    cp_name,
    cp_budget,
    cp_desc,
    cp_useflg,
    cp_crtDt,
    cp_teach_fk
    ) VALUES ('".$name."', '".$budget."', '".$desc."', '1', CURRENT_TIMESTAMP , '".$teacher_fk."')";

$result = mysql_query($sql);

if($result){
    Print "\n Your information has been successfully added to the database."; 
}
else{
    die ("Error : ".mysql_error());
}

$sql = "UPDATE `chem_account` SET `ca_credit`='".$teacher_budget."' WHERE `ca_pk`='".$teacher_fk."'";

$result = mysql_query($sql);

if($result){
    Print "\n Your information has been successfully added to the database."; 
}
else{
    die ("Error : ".mysql_error());
}


?>