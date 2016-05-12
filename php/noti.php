<?php
    include 'connect.php';

    $data=array();

    //  คำร้องขอสารเคมี
    $sql = "SELECT COUNT(*) FROM `chem_receipt`
            WHERE `cr_status`= '0' ";
    $query = mysql_query($sql);
    $row = mysql_fetch_array ($query);
    $data[0]=$row[0];

    //  คำร้องขอสารเคมีเพิ่ม
    $data[1]=0;

    //  คำร้องขออื่นๆ
    $sql3 = "SELECT COUNT(*) FROM `chem_request_other`
        WHERE `cro_status`= '0' ";
    $query3 = mysql_query($sql3);
    
    $row3 = mysql_fetch_array ($query3);
    $data[2]=$row3[0];
    
    
    echo json_encode($data, JSON_NUMERIC_CHECK);
?>