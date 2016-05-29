<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    $findthis = $_POST['findthis'];

    if($findthis == "all"){
        $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce
        INNER JOIN `chem_account`
        ON ce_ca_fk = ca_pk
        ORDER BY ce_crtDt DESC";
    }else{
        $sql = "SELECT ce.*,ca_tname,ca_fname,ca_lname FROM `chem_exchange` AS ce
        INNER JOIN `chem_account`
        ON ce_ca_fk = ca_pk
        WHERE ce_ca_fk = '".$findthis."'
        ORDER BY ce_crtDt DESC";
    }
  


    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
