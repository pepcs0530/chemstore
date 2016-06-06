<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];
    $selectAll = $_POST['selectAll'];

    isset($_POST['tostore']) ? $tostore = $_POST['tostore'] : $tostore = null;
    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;
    isset($_POST['no']) ? $no = $_POST['no'] : $no = null;
    
    if($type == "all"){
        $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce ";
        $sql .= "INNER JOIN chem_account ON ce_ca_fk = ca_pk ";
    }
    else{
        $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce ";
        $sql .= "INNER JOIN chem_account ON ce_ca_fk = ca_pk ";
        $sql .= "WHERE ce_no LIKE 'NO.".$type."%' ";
    }

    if($stDt != null && $edDt != null && !$selectAll){
        $sql .= "AND `ce_crtDt` BETWEEN '".$stDt."' AND '".$edDt."' ";
    }

    if($no != null && !$selectAll){
        $sql .= " AND ce_no LIKE '%".$no."%' ";
    }

    if($tostore != null && !$selectAll){
        $sql .= " AND ce_tostore LIKE '%".$tostore."%' ";
    }
    
    $sql .= "ORDER BY ce_crtDt DESC";

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>