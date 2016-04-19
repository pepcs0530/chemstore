<?php
    include 'connect.php';

    $data=array();

    //  คำร้องขอสารเคมี
    $data[0]=0;

    //  คำร้องขอสารเคมีเพิ่ม
    $data[1]=0;

    //  คำร้องขออื่นๆ
    $sql = "SELECT COUNT(*) FROM `chem_request_other`
        WHERE `cro_status`= '0' ;";
    $query = mysql_query($sql);
    
    $row = mysql_fetch_array ($query);
    $data[2]=$row[0];
    
    
    echo json_encode($data, JSON_NUMERIC_CHECK);
?>