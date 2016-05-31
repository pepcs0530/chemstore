<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    
    include 'connect.php';

    isset($_POST['location']) ? $loc = $_POST['location'] : $loc = null;
    isset($_POST['state']) ? $state = $_POST['state'] : $state = null;
    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt = date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;
    isset($_POST['name']) ? $name = $_POST['name'] : $name = null;
    isset($_POST['casNo']) ? $casNo = $_POST['casNo'] : $casNo = null;
    isset($_POST['grade']) ? $grade = $_POST['grade'] : $grade = null;
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;
    

    if($selectAll == true){
        $sql = "SELECT cil.*,cu_name_abb,cc_casNo,cc_name,cc_state,cc_grade,cc_room,cl_name
            FROM `chem_import_log` AS cil
            INNER JOIN `chem_category`
            ON `cil_cc_fk`=`cc_pk`
            INNER JOIN `chem_unit`
            ON `cc_unit_fk`=`cu_pk`
            INNER JOIN `chem_location`
            ON `cc_location_fk`=`cl_pk`
            ORDER BY `cil_pk` DESC";
    }else{
        $sql = "SELECT cil.*,cu_name_abb,cc_casNo,cc_name,cc_state,cc_grade,cc_room,cl_name
            FROM `chem_import_log` AS cil
            INNER JOIN `chem_category`
            ON `cil_cc_fk`=`cc_pk`
            INNER JOIN `chem_unit`
            ON `cc_unit_fk`=`cu_pk`
            INNER JOIN `chem_location`
            ON `cc_location_fk`=`cl_pk`
            WHERE cil_useflg = '1' 
            AND cil_crtDt BETWEEN '".$stDt."' AND '".$edDt."' ";
        
        if($loc != null){
            $sql .= "AND cc_location_fk = ".$loc." ";
        }
        
        if($state != null){
            $sql .= "AND cc_state = '".$state."' ";
        }
        
//        if($stDt != null && $edDt != null ){
//            
//            $sql .= "AND cil_crtDt BETWEEN '".$stDt."' AND '".$edDt."' ";
//        }
        
        if($name != null){
            $sql .= "AND cc_name LIKE '%".$name."%' ";
        }
        
        if($casNo != null){
            $sql .= "AND cc_casNo LIKE '%".$casNo."%' ";
        }
        
        if($grade != null){
            $sql .= "AND cc_grade LIKE '%".$grade."%' ";
        }
        
        $sql .= "ORDER BY `cil_pk` DESC";
    }

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>