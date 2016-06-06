<?php
    include 'connect.php';
    $_POST = json_decode(file_get_contents('php://input'), true);
    $findthis = $_POST['findthis'];
    $sql = "SELECT `cl_pk` FROM chem_location WHERE cl_name LIKE '%".$findthis."%'";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>