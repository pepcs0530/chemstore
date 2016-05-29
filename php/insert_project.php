<?php

$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$teacher_fk = $_POST['teacher_pk'];
$name = $_POST['name'];
$cp_eduLvl = $_POST['cp_eduLvl'];
$budget = $_POST['budget'];
$desc = $_POST['desc'];
$teacher_budget = $_POST['teacher_budget'];

$sql = "INSERT INTO chem_project (
    cp_name,
    cp_eduLvl,
    cp_budget,
    cp_desc,
    cp_useflg,
    cp_crtDt,
    cp_teach_fk
    ) VALUES ('".$name."', '".$cp_eduLvl."', '".$budget."', '".$desc."', '1', CURRENT_TIMESTAMP , '".$teacher_fk."')";


$result = mysql_query($sql);
//-------------------------------------------------------------
$sql = "SELECT `cp_pk` FROM `chem_project` ORDER BY `cp_pk` DESC LIMIT 1";
$query = mysql_query($sql);
$data=array();
while($row = mysql_fetch_array ($query))
{
    array_push($data,$row);
}
echo json_encode($data[0]);
?>