<?php
    include 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $findthis = $_POST['findthis'];
    
$sql = "SELECT ced.*,cc_pk,ced_status,cc_quantity,`cc_name`,`cc_casNo`,`cc_grade`,cc_state,cc_unit_fk,cl_pk,cc_price,cc_expDt,cc_producer,`cl_name`
           FROM `chem_exchange_detail` AS ced
           INNER JOIN `chem_category` AS cc
           ON `cc_pk` = `ced_cc_fk`
           INNER JOIN `chem_location`
           ON cc_location_fk = cl_pk
           WHERE `ced_ce_fk` = ".$findthis;
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>