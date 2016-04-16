<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$code = $_POST['code'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$tname = $_POST['tname'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$tel = $_POST['tel'];
$acctyp = $_POST['acctyp'];

$sql = "INSERT INTO chem_account (
    ca_code,
    ca_user,
    ca_pass,
    ca_tname,
    ca_fname,
    ca_lname,
    ca_tel,
    ca_useflg,
    ca_crtDt,
    ca_cat_fk
    ) VALUES ('".$code."', '".$user."', '".$pass."', '".$tname."', '".$fname."', '".$lname."', '".$tel."', '1', CURRENT_TIMESTAMP , '".$acctyp."')";

$result = mysql_query($sql);

if($result){
    echo $result;
}
else{
    die ("Error : ".mysql_error());
}

?>