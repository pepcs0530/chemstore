<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $findthis = $_POST['crd_cr_pk'];

    $sql = "SELECT `crd_cr_fk`,`cc_name`,`cc_type`,`cc_casNo`,`cc_state`,`crd_amt`,`crd_price`,`crd_unit`,`crd_cc_fk`,`cc_room`,`cc_grade`,`cc_expDt`
    FROM `chem_receipt_detail`
    INNER JOIN `chem_category` 
    ON `crd_cc_fk` = `cc_pk`
    WHERE `crd_cr_fk` = '".$findthis."' ";
    
    
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>