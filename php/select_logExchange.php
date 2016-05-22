<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];

    isset($_POST['locationF']) ? $locF = $_POST['locationF'] : $locF = null;
    isset($_POST['locationT']) ? $locT = $_POST['locationT'] : $locT = null;
    isset($_POST['state']) ? $state = $_POST['state'] : $state = null;
    isset($_POST['stDt']) ? $stDt = $_POST['stDt'] : $stDt = null;
    isset($_POST['edDt']) ? $edDt = $_POST['edDt'] : $edDt = null;
    isset($_POST['name']) ? $name = $_POST['name'] : $name = null;
    isset($_POST['casNo']) ? $casNo = $_POST['casNo'] : $casNo = null;
    isset($_POST['grade']) ? $grade = $_POST['grade'] : $grade = null;
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;
    
    if($type == "all") {
        
//        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
//                FROM `chem_receipt`
//                INNER JOIN `chem_account` 
//                ON `ca_pk` = SUBSTRING(cr_no, 4, 1)
//                WHERE cr_type = 'exchangechem'
//                ORDER BY cr_crtDt DESC";
        
        if($selectAll == true){
            $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
                FROM `chem_receipt`
                INNER JOIN `chem_account` 
                ON `ca_pk` = SUBSTRING(cr_no, 4, 1)
                WHERE cr_type = 'exchangechem'
                ORDER BY cr_crtDt DESC";
        }else{
            $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
                FROM `chem_receipt`
                INNER JOIN `chem_account` 
                ON `ca_pk` = SUBSTRING(cr_no, 4, 1)
                WHERE cr_type = 'exchangechem' ";
            
            if($locF != null){
                $sql .= "AND cr_fromstore = ".$locF." ";
            }
            
            if($locT != null){
                $sql .= "AND cr_tostore = ".$locT." ";
            }

//            if($state != null){
//                $sql .= "AND cc_state = '".$state."' ";
//            }

            if($stDt != null && $edDt != null ){
                $sql .= "AND cr_updDt BETWEEN '".$stDt."' AND '".$edDt."' ";
            }

//            if($name != null){
//                $sql .= "AND cc_name LIKE '%".$name."%' ";
//            }

//            if($casNo != null){
//                $sql .= "AND cc_casNo LIKE '%".$casNo."%' ";
//            }

//            if($grade != null){
//                $sql .= "AND cc_grade LIKE '%".$grade."%' ";
//            }

            $sql .= "ORDER BY `cr_crtDt` DESC";
        }
        
    }else{
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
                FROM `chem_receipt`
                INNER JOIN `chem_account` 
                ON `ca_pk` = '".$type."'
                WHERE cr_no LIKE 'NO.".$type."%' AND cr_type = 'exchangechem'
                ORDER BY cr_crtDt DESC";
    }

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>