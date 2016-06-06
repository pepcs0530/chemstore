<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;

    $sql = "SELECT cc_name,cc_pk,COUNT(ced_cc_fk) AS sum FROM `chem_exchange_detail`
            INNER JOIN `chem_exchange` 
            ON ce_pk = ced_ce_fk
            INNER JOIN `chem_category` 
            ON cc_pk = ced_cc_fk
            WHERE ce_status = 3 ";

    if($stDt != null && $edDt != null){
        $sql .= " AND (`ce_crtDt` BETWEEN '".$stDt."' AND '".$edDt."') ";
    }

    $sql .= "GROUP BY ced_cc_fk";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>