<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    
    $findthis = $_POST['findthis'];

    
    if($findthis == 'all'){
    $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,cr_desc,`cr_status`,`cr_cost`,`ca_pk`,ca_credit,`ca_tname`,`ca_fname`,`ca_lname`,ca_cat_fk
        FROM chem_receipt
        INNER JOIN chem_account
        ON ca_pk =  SUBSTR(cr_no,4,1)
        WHERE cr_cp_fk IS NULL
        ORDER BY cr_crtDt DESC";
    }else{
        $sql = "SELECT `cr_pk`,`cr_no`,`cr_crtDt`,`cr_updDt`,cr_desc,`cr_status`,`cr_cost`,`ca_pk`,`ca_tname`,`ca_fname`,`ca_lname`,ca_cat_fk
        FROM chem_receipt
        INNER JOIN chem_account
        ON ca_pk = '".$findthis."' 
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
