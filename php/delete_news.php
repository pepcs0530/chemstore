<?php
$_POST = json_decode(file_get_contents('php://input'), true);
include 'connect.php';

$cpr_pk = $_POST['cpr_pk'];

$sql = "UPDATE `chem_pr`  SET `cpr_useflg` = 0 WHERE `cpr_pk` = $cpr_pk";

$query = mysql_query($sql);

echo json_encode($query);
?>
