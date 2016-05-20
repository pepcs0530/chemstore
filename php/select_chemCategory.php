<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    include 'connect.php';
    
    $sql = "SELECT cc_pk, cc_code, cc_volume, cc_packing, cc_desc, cu_pk, cl_pk,cc_expDt, cc_name, cc_type, cc_casNo, cc_state, cc_quantity, cl_name, cc_room, cc_price, cu_name_abb, cc_grade, cc_producer ".
                           "FROM chem_category ".
                           "INNER JOIN chem_unit ".
                           "ON cc_unit_fk = cu_pk ".
                           "INNER JOIN  chem_location ".
                           "ON cc_location_fk = cl_pk ".
                           "ORDER BY cc_name";
    
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);

?>