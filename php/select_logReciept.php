<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $type = $_POST['type'];
    
    if($type == "all") {
        $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' ".
                "ORDER BY cr_crtDt DESC";
    }else{
        $sql = "SELECT cr.cr_pk,cr.cr_no,cr.cr_totalprice,cr.cr_cp_fk,cr.cr_status,cr.cr_crtDt,cr.cr_tostore,ca.ca_fname,ca.ca_lname,ca.ca_tname,cr.cr_fromstore,cp.cp_teach_fk,cp.cp_name,cp.cp_budget,ca.ca_credit ".
                "FROM chem_receipt AS cr ".
                "INNER JOIN chem_project AS cp ".
                "ON cp_pk = cr_cp_fk ".
                "INNER JOIN chem_account AS ca ".
                "ON cp_teach_fk = ca_pk ".
                "WHERE cr_type = 'chemrequest' AND cr_no like 'NO.".$type."%'".
                "ORDER BY cr_crtDt DESC";
    }

    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>