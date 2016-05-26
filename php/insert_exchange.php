<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';
    
    if(!isset($_POST['ce_no'])){
        $ce_no = '';    
    } 
    else{
        $ce_no = $_POST['ce_no'];
    }
    
    if(!isset($_POST['ce_fromstore'])){
        $ce_fromstore = '';    
    } 
    else{
        $ce_fromstore = $_POST['ce_fromstore'];
    }
    
    if(!isset($_POST['ce_tostore'])){
        $ce_tostore = '';    
    } 
    else{
        $ce_tostore = $_POST['ce_tostore'];
    }

    if(!isset($_POST['ce_desc'])){
        $ce_desc = '';    
    } 
    else{
        $ce_desc = $_POST['ce_desc'];
    }

    if(!isset($_POST['ce_ca_fk'])){
        $ce_ca_fk = '';    
    } 
    else{
        $ce_ca_fk = $_POST['ce_ca_fk'];
    }
    
    $sql = "SELECT ce_pk FROM `chem_exchange` ORDER BY ce_pk DESC LIMIT 1";
    $query = mysql_query($sql);

    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    
    if(count($data) == 0){
        $ce_no = "NO.".$ce_no."0";
    }
    else{
        $ce_no = "NO.".($ce_no.$data[0]['ce_pk']+1);
    }

    $sql = "INSERT INTO `chem_exchange` (ce_no, ce_crtDt, ce_desc, ce_fromstore, ce_tostore, ce_ca_fk)".
        " VALUE('".$ce_no."', CURRENT_TIMESTAMP,'".$ce_desc."','".$ce_fromstore."','".$ce_tostore."','".$ce_ca_fk."')";
    
    $query = mysql_query($sql);
//
    $sql = "SELECT ce_pk FROM `chem_exchange` ORDER BY ce_pk DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data[0]);
?>