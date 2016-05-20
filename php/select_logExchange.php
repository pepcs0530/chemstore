<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];
    
    if($type == "all") {
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
                FROM `chem_receipt`
                INNER JOIN `chem_account` 
                ON `ca_pk` = SUBSTRING(cr_no, 4, 1)
                WHERE cr_type = 'exchangechem'
                ORDER BY cr_crtDt DESC";
    }else{
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_desc`,`cr_status`,`cr_fromstore`,`cr_tostore`,`ca_tname`,`ca_fname`,`ca_lname`
                FROM `chem_receipt`
                INNER JOIN `chem_account` 
                ON `ca_pk` = '".$type."'
                WHERE cr_no LIKE 'NO.".$type."%' AND cr_type = 'exchangechem'
                ORDER BY cr_crtDt DESC";
    }

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>