<?php
    include 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $findthis = $_POST['crd_cr_fk'];
    
$sql = "SELECT cc_pk,crd_status,`cc_name`,`crd_amt`,`crd_price`,`crd_unit`,`cl_name`".
           "FROM `chem_receipt_detail`".
           "INNER JOIN `chem_category`".
           "ON `cc_pk` = `crd_cc_fk`".
           "INNER JOIN chem_location ".
           "ON cc_location_fk = cl_pk ".
           "WHERE `crd_cr_fk` = ".$findthis;
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>