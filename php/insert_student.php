<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';


    $cs_cp_fk = $_POST['cs_cp_fk'];
    $cs_no = $_POST['cs_no'];
    $cs_name = $_POST['cs_name'];
    $cs_tel = $_POST['cs_tel'];
    $cs_eduLv = $_POST['cs_eduLv'];

    $sql= "INSERT INTO `chem_student` (cs_no,cs_name,cs_cp_fk,cs_eduLv,cs_tel) VALUES('".$cs_no."','".$cs_name."','".$cs_cp_fk."','".$cs_eduLv."','".$cs_tel."')";
        
    $query = mysql_query($sql);

    if($query){
        Print "\n Your information has been successfully added to the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>