<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

    $name = $_POST['name'];
    $casNo = $_POST['casNo'];
    $state = $_POST['state'];
    $packing = $_POST['packing'];
    $volume = $_POST['volume'];
    $unit_fk = $_POST['unit_fk'];
    $qty = $_POST['qty'];
    $loc_fk = $_POST['loc_fk'];
    $room = $_POST['room'];
    $price = $_POST['price'];
    $grade = $_POST['grade'];
    $expDt = $_POST['expDt'];
    $desc = $_POST['desc'];
    $producer = $_POST['producer'];
    $expDt = date ("Y-m-d", strtotime($expDt));

    $sql = "INSERT INTO chem_category (
        cc_name,
        cc_casNo,
        cc_state,
        cc_packing,
        cc_volume,
        cc_unit_fk,
        cc_quantity,
        cc_location_fk,
        cc_room,
        cc_price,
        cc_grade,
        cc_expDt,
        cc_desc,
        cc_producer,
        cc_useflg,
        cc_crtDt
        ) VALUES (
        '".$name."',
        '".$casNo."',
        '".$state."',
        '".$packing."',
        '".$volume."',
        '".$unit_fk."',
        '".$qty."',
        '".$loc_fk."',
        '".$room."',
        '".$price."',
        '".$grade."',
        '".$expDt."',
        '".$desc."',
        '".$producer."',
        '1',
        CURRENT_TIMESTAMP)";

    $result = mysql_query($sql);

    if($result){
        print "\n Your information has been successfully added to the database.<br/>";

    }
    else{
        die ("Error : ".mysql_error());
    }

    $sql = "SELECT cc_pk FROM `chem_category` ORDER BY cc_pk DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    $sql = "INSERT INTO `chem_import_log` (cil_cc_fk,cil_crtDt,cil_amt) VALUE('".$data[0]['cc_pk']."',CURRENT_TIMESTAMP,'".$volume."')";
    $query = mysql_query($sql);
?>