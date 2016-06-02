<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $findthis = $_POST['findthis'];
    
    $sql = "SELECT ce.*,ced_location_chem,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce
            INNER JOIN `chem_exchange_detail`
            ON ce_pk = ced_ce_fk
            INNER JOIN chem_account
            ON ce_ca_fk = ca_pk
            WHERE ce_status = '3' AND ced_location_chem LIKE '%".$findthis."%'
            GROUP BY ce_pk";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
