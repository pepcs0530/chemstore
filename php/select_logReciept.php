<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];

    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;
    isset($_POST['no']) ? $no = $_POST['no'] : $no = null;
    isset($_POST['project']) ? $project = $_POST['project'] : $project = null;
    
    if($type == "all"){
        $sql = "SELECT cr.*,cp_pk,cp_name,cp_eduLvl,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";
        $sql .= "INNER JOIN chem_project ON cp_pk = cr_cp_fk ";  
    }
    else{
        $sql = "SELECT cr.*,cp_pk,cp_name,cp_eduLvl,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";
        $sql .= "INNER JOIN chem_project ON cp_pk = cr_cp_fk ";
        $sql .= "INNER JOIN chem_account ON cp_teach_fk = ca_pk ";
        $sql .= "WHERE `cr_crtDt` BETWEEN '".$stDt."' AND '".$edDt."'";
        $sql .= " AND cr_no LIKE 'NO.".$type."%' ";
    }

    if($no != null){
        $sql .= " AND cr_no LIKE '%".$no."%' ";
    }
    if($project != null){
        $sql .= " AND cp_name LIKE '%".$project."%' ";
    }
    
    $sql .= "ORDER BY cr_crtDt DESC";

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>