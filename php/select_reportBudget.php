<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';  

    $sql = "SELECT cp_name,SUM(cr_cost) AS sum FROM chem_receipt 
            INNER JOIN chem_project 
            ON cr_cp_fk = cp_pk
            GROUP BY cr_cp_fk";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>