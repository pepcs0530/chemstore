<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    
    $findthis = $_POST['findthis'];
    
    if($findthis == 'all'){
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_status`,`cr_cost`,`cp_pk`,`cp_name`,`cp_desc`,`ca_pk`,`ca_tname`,`ca_fname`,`ca_lname`,`cr_projectbudget`,`cr_teacherbudget`
        FROM chem_receipt
        INNER JOIN chem_project
        ON cp_pk = cr_cp_fk 
        INNER JOIN chem_account
        ON cp_teach_fk = ca_pk 
        ORDER BY cr_crtDt DESC";
    }else{
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,`cr_status`,`cr_cost`,`cp_pk`,`cp_name`,`cp_desc`,`ca_pk`,`ca_tname`,`ca_fname`,`ca_lname`,`cr_projectbudget`,`cr_teacherbudget`
        FROM chem_receipt
        INNER JOIN chem_project
        ON cp_pk = cr_cp_fk 
        INNER JOIN chem_account
        ON cp_teach_fk = ca_pk 
        WHERE cr_no LIKE 'NO.".$findthis."%'
        ORDER BY cr_crtDt DESC";
    }
//WHERE `cr_status` = 0
    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
