<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    
    $db_host = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = 'db_chem_lab';
    mysql_connect("$db_host","$db_username","$db_password") or die ("Cound not connect to mysql");
    mysql_select_db("$db_name") or die ("No database");
    mysql_query("SET NAMES utf8");
    
    $findthis = $_POST['cl_name'];
    if($findthis == "ดูทั้งหมด") {
        $sql = "SELECT cc_pk, cc_name, cc_casNo, cc_state, cc_quantity, cl_name, cc_room, cc_price,  cu_name_abb, cc_grade, cc_producer ".
                           "FROM chem_category ".
                           "INNER JOIN chem_unit ".
                           "ON cc_unit_fk = cu_pk ".
                           "INNER JOIN  chem_location ".
                           "ON cc_location_fk = cl_pk";
    }else{
        $sql = "SELECT cc_pk, cc_name, cc_casNo, cc_state, cc_quantity, cl_name, cc_room, cc_price,  cu_name_abb, cc_grade, cc_producer ".
                           "FROM chem_category ".
                           "INNER JOIN chem_unit ".
                           "ON cc_unit_fk = cu_pk ".
                           "INNER JOIN  chem_location ".
                           "ON cc_location_fk = cl_pk AND cl_name = '".$findthis."'";
                           
    }
    
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);

?>