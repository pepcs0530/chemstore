<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    //mysql connect
    include 'connect.php';
    
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

    if(!isset($_POST['cr_cost'])){
        $cr_cost = '';    
    } 
    else{
        $cr_cost = $_POST['cr_cost'];
    }
    
    if(!isset($_POST['cr_projectbudget'])){
        $cr_projectbudget = '';    
    } 
    else{
        $cr_projectbudget = $_POST['cr_projectbudget'];
    }

    if(!isset($_POST['cr_teacherbudget'])){
        $cr_teacherbudget = '';    
    } 
    else{
        $cr_teacherbudget = $_POST['cr_teacherbudget'];
    }

    $sql = "SELECT cr_pk FROM `chem_receipt` ORDER BY cr_pk DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }  

    if(count($data) == 0){
        $cr_no = "NO.".$cr_no."0";
    }else{
        $cr_no = "NO.".($cr_no.$data[0]['cr_pk']+1);
    }
    $sql = "INSERT INTO `chem_receipt` (cr_no, cr_totalprice, cr_cp_fk, cr_crtDt, cr_projectbudget, cr_teacherbudget, cr_cost)".
            " VALUE('".$cr_no."','".$totalmoney ."','".$cr_cp_fk."', CURRENT_TIMESTAMP,'".$cr_projectbudget."','".$cr_teacherbudget."','".$cr_cost."')";
    
    $query = mysql_query($sql);
    
    $sql = "SELECT cr_pk FROM `chem_receipt` ORDER BY cr_pk DESC LIMIT 1";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data[0]);
?>