<?php

$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cc_fk = $_POST['cc_pk'];

$sql = "INSERT INTO chem_import_log (
    cil_useflg,
    cil_crtDt,
    cil_cc_fk
    ) VALUES ('1', CURRENT_TIMESTAMP, ".$cc_fk.")";

$result = mysql_query($sql);

if($result){
    Print "\n Your information has been successfully added to the database."; 
}
else{
    die ("Error : ".mysql_error());
}


?>