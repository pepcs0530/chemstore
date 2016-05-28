<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $findthis = $_POST['findthis'];
    
    $sql = "SELECT cr.*,crd_location_chem FROM `chem_receipt` AS cr 
            INNER JOIN `chem_receipt_detail`
            ON cr_pk = crd_cr_fk
            WHERE crd_location_chem LIKE '%".$findthis."%'  AND cr_status = '3'
            GROUP BY cr_pk";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
