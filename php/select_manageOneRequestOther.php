<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    $cro_pk = $_POST['cro_pk'];

    include 'connect.php';  


    $sql = "SELECT * FROM `chem_request_other`
        INNER JOIN `chem_account`
        ON `cro_ca_fk`=`ca_pk` 
        WHERE `cro_status`= '0' AND `cro_pk` = ".$cro_pk."
        ORDER BY `cro_pk` DESC";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>