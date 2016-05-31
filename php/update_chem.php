<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cc_pk = $_POST['cc_pk'];
$cc_name = $_POST['cc_name'];
$cc_casNo = $_POST['cc_casNo'];
$cc_state = $_POST['cc_state'];
$cc_volume = $_POST['cc_volume'];
$cc_unit_fk = $_POST['cc_unit_fk'];
$cc_quantity = $_POST['cc_quantity'];
$cc_packing = $_POST['cc_packing'];
$cc_location_fk = $_POST['cc_location_fk'];
$cc_room = $_POST['cc_room'];
$cc_price = $_POST['cc_price'];
$cc_grade = $_POST['cc_grade'];
$cc_expDt = $_POST['cc_expDt'];
$cc_producer = $_POST['cc_producer'];
$cc_desc = $_POST['cc_desc'];

$sql = "UPDATE chem_category SET 
    cc_name = '".$cc_name."',
    cc_casNo = '".$cc_casNo."',
    cc_state = '".$cc_state."',
    cc_volume = '".$cc_volume."',
    cc_unit_fk = '".$cc_unit_fk."',
    cc_quantity = '".$cc_quantity."',
    cc_packing = '".$cc_packing."',
    cc_location_fk = '".$cc_location_fk."',
    cc_room = '".$cc_room."',
    cc_price = '".$cc_price."',
    cc_grade = '".$cc_grade."',
    cc_expDt = '".$cc_expDt."',
    cc_producer = '".$cc_producer."',
    cc_desc = '".$cc_desc."',
    cc_updDt = CURRENT_TIMESTAMP
    WHERE cc_pk = '".$cc_pk."'";

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>