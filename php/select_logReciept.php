<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];

    isset($_POST['stDt']) ? $stDt = $_POST['stDt'] : $stDt = null;
    isset($_POST['edDt']) ? $edDt = $_POST['edDt'] : $edDt = null;
    isset($_POST['no']) ? $no = $_POST['no'] : $no = null;
    isset($_POST['project']) ? $project = $_POST['project'] : $project = null;
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;
    
    if($type == "all") {
        
        
        if($selectAll == true){
            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' ".
                "ORDER BY cr_crtDt DESC";
        }else{
            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' ";
            
            if($stDt != null && $edDt != null ){
                $sql .= "AND cr.cr_updDt BETWEEN '".$stDt."' AND '".$edDt."' ";
            }
            
            if($no != null){
                $sql .= "AND cr.cr_no LIKE '%".$no."%' ";
            }
            
            if($project != null){
                $sql .= "AND cp.cp_name LIKE '%".$project."%' ";
            }
            
            $sql .= "ORDER BY cr_crtDt DESC";
        }
        
    }else{
        
        if($selectAll == true){
            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' AND cr_no like 'NO.".$type."%'".
                "ORDER BY cr_crtDt DESC";
        }else{
            
            $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_updDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' AND cr_no like 'NO.".$type."%' ";
            
            if($stDt != null && $edDt != null ){
                $sql .= "AND cr.cr_updDt BETWEEN '".$stDt."' AND '".$edDt."' ";
            }
            
            if($no != null){
                $sql .= "AND cr.cr_no LIKE '%".$no."%' ";
            }
            
            if($project != null){
                $sql .= "AND cp.cp_name LIKE '%".$project."%' ";
            }
            
            $sql .= "ORDER BY cr_crtDt DESC";
            
        }
        
    }

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>