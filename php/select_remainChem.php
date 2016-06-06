<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    include 'connect.php';

    isset($_POST['location']) ? $loc = $_POST['location'] : $loc = null;
    isset($_POST['state']) ? $state = $_POST['state'] : $state = null;
    isset($_POST['stDt']) ? $stDt = $_POST['stDt'] : $stDt = null;
    isset($_POST['edDt']) ? $edDt = $_POST['edDt'] : $edDt = null;
    isset($_POST['name']) ? $name = $_POST['name'] : $name = null;
    isset($_POST['casNo']) ? $casNo = $_POST['casNo'] : $casNo = null;
    isset($_POST['grade']) ? $grade = $_POST['grade'] : $grade = null;
    isset($_POST['selectAll']) ? $selectAll = $_POST['selectAll'] : $selectAll = null;

    if($selectAll == true){
        $sql = "SELECT cc_updDt, cc_pk, cc_volume, cc_packing, cc_desc, cu_pk, cl_pk,cc_expDt, cc_name, cc_casNo, cc_state, cc_quantity, cl_name, cl_name_abb, cc_room, cc_price, cu_name_abb, cc_grade, cc_producer ".
                           "FROM chem_category ".
                           "INNER JOIN chem_unit ".
                           "ON cc_unit_fk = cu_pk ".
                           "INNER JOIN  chem_location ".
                           "ON cc_location_fk = cl_pk ".
                           "ORDER BY cc_name";
    }else{
        $sql = "SELECT cc_updDt, cc_pk, cc_volume, cc_packing, cc_desc, cu_pk, cl_pk,cc_expDt, cc_name, cc_casNo, cc_state, cc_quantity, cl_name, cl_name_abb, cc_room, cc_price, cu_name_abb, cc_grade, cc_producer ".
                           "FROM chem_category ".
                           "INNER JOIN chem_unit ".
                           "ON cc_unit_fk = cu_pk ".
                           "INNER JOIN  chem_location ".
                           "ON cc_location_fk = cl_pk ".
                           "WHERE `cc_useflg` = '1' ";
        if($loc != null){
            $sql .= "AND cc_location_fk = ".$loc." ";
        }
        
        if($state != null){
            $sql .= "AND cc_state = '".$state."' ";
        }
        
        if($stDt != null && $edDt != null ){
            $sql .= "AND cc_updDt BETWEEN '".$stDt."' AND '".$edDt."' ";
        }
        
        if($name != null){
            $sql .= "AND cc_name LIKE '%".$name."%' ";
        }
        
        if($casNo != null){
            $sql .= "AND cc_casNo LIKE '%".$casNo."%' ";
        }
        
        if($grade != null){
            $sql .= "AND cc_grade LIKE '%".$grade."%' ";
        }
        
        $sql .= "ORDER BY cc_name";
    }
    
//    print $sql;
    
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);

?>