<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;
    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;
    isset($_POST['no']) ? $no = $_POST['no'] : $no = null;
    
        if($type == "all"){
            $sql = "SELECT cr.*,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";  
            $sql .= "INNER JOIN chem_account 
                     ON ca_pk =  SUBSTR(cr_no,4,1) 
                     WHERE cr_cp_fk IS NULL ";
        }
        else{
            $sql = "SELECT cr.*,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr ";
            $sql .= "INNER JOIN chem_account ON ca_pk = SUBSTR(cr_no,4,1) 
                     WHERE cr_cp_fk IS NULL ";
            $sql .= "AND cr_no LIKE 'NO.".$type."%' ";
        }

        if($stDt != null && $edDt != null && !$selectAll){
            $sql .= "AND (`cr_crtDt` BETWEEN '".$stDt."' AND '".$edDt."') ";
        }

        if($no != null  && !$selectAll){
            $sql .= " AND cr_no LIKE '%".$no."%' ";
        }

        $sql .= " ORDER BY cr_crtDt DESC";
        
        $query = mysql_query($sql);
        $data=array();
        while($row = mysql_fetch_array ($query))
        {
            array_push($data,$row);
        }
        echo json_encode($data);
        
?>