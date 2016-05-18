<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';
    if(!isset($_POST['requesttype'])){
        $requesttype = '';    
    } 
    else{
        $requesttype = $_POST['requesttype'];    
    }
    
    if(!isset($_POST['cr_no'])){
        $cr_no = '';    
    } 
    else{
        $cr_no = $_POST['cr_no'];
    }
    
    if(!isset($_POST['cr_cp_fk'])){
        $cr_cp_fk = '';    
    } 
    else{
        $cr_cp_fk = $_POST['cr_cp_fk'];
    }

    if(!isset($_POST['totalmoney'])){
        $totalmoney = '';    
    } 
    else{
        $totalmoney = $_POST['totalmoney'];
    }
    
    if(!isset($_POST['cr_fromstore'])){
        $cr_fromstore = '';    
    } 
    else{
        $cr_fromstore = $_POST['cr_fromstore'];
    }
    
    if(!isset($_POST['cr_tostore'])){
        $cr_tostore = '';    
    } 
    else{
        $cr_tostore = $_POST['cr_tostore'];
    }

    if(!isset($_POST['cr_desc'])){
        $cr_desc = '';    
    } 
    else{
        $cr_desc = $_POST['cr_desc'];
    }

    if($requesttype == "chemrequest"){
        $sql = "INSERT INTO `chem_receipt` (cr_no, cr_totalprice, cr_cp_fk, cr_crtDt, cr_type)".
            " VALUE('".$cr_no."','".$totalmoney ."','".$cr_cp_fk."', CURRENT_TIMESTAMP, '".$requesttype."')";
        
    } 
    else if($requesttype == "lendrequest"){   
        $sql = "INSERT INTO `chem_receipt` (cr_no, cr_crtDt, cr_desc, cr_fromstore, cr_tostore, cr_updDt, cr_type)".
            " VALUE('".$cr_no."', CURRENT_TIMESTAMP,'".$cr_desc."','".$cr_fromstore."','".$cr_tostore."', CURRENT_TIMESTAMP, '".$requesttype."')";
    }
    
    $query = mysql_query($sql);
    $sql = "SELECT cr_pk FROM `chem_receipt` ORDER BY `cr_pk` DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>