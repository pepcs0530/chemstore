<?php
$_POST = json_decode(file_get_contents('php://input'), true);
include 'connect.php';

$findthis = $_POST['findthis'];

$sql = "SELECT `cpr_pk`,`cpr_title`,`cpr_desc`,`cpr_link`,`cpr_photo` FROM `chem_pr` WHERE `cpr_useflg` = 1";

$query = mysql_query($sql);
$data = array();

while ($row = mysql_fetch_array($query)) {
	array_push($data, $row);
}
echo json_encode($data);
?>
