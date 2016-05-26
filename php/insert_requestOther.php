<?php

$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cro_desc = $_POST['cro_desc'];
$cro_ca_fk = $_POST['cro_ca_fk'];
$cro_header = $_POST['cro_header'];

$sql = "INSERT INTO chem_request_other (
    cro_desc,
    cro_useflg,
    cro_crtDt,
    cro_status,
    cro_ca_fk,
    cro_header
    ) VALUES ('".$cro_desc."', '1', CURRENT_TIMESTAMP, '0', '".$cro_ca_fk."','".$cro_header."')";

$result = mysql_query($sql);

if($result){
    Print "\n Your information has been successfully added to the database."; 
}
else{
    die ("Error : ".mysql_error());
}


?>