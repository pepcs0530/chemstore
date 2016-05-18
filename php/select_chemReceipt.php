<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $findthis = $_POST['findthis'];    

    if($findthis == "ดูทั้งหมด") {
    
        $sql = "SELECT * FROM chem_receipt WHERE `cr_status` = '0' ORDER BY cr_crtDt DESC";
        
    }else{

        $sql = "SELECT * FROM `chem_receipt` WHERE `cr_no` LIKE 'NO.".$findthis."%' AND cr_type = 'chemrequest' ORDER BY cr_crtDt DESC";
    }
    

    
    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>
