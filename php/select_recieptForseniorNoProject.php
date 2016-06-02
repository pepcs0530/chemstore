<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $findthis = $_POST['findthis'];
    
    $sql = "SELECT cr.*,crd_location_chem,ca_cat_fk,ca_tname,ca_fname,ca_lname FROM `chem_receipt` AS cr 
            INNER JOIN `chem_receipt_detail`
            ON cr_pk = crd_cr_fk
            INNER JOIN chem_account
            ON ca_pk =  SUBSTR(cr_no,4,1)
            WHERE crd_location_chem LIKE '%จุฬาภรณ์1%'  AND cr_status = '3'
            GROUP BY cr_pk";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
