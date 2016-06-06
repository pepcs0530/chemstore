<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';  

    isset($_POST['stDt']) ? $stDt = date("Y-m-d", strtotime($_POST['stDt'])) : $stDt = null;
    isset($_POST['edDt']) ? $edDt =  date("Y-m-d", strtotime($_POST['edDt'])) : $edDt = null;
    isset($_POST['cp_name']) ? $cp_name = $_POST['cp_name'] : $cp_name = null;

    $sql = "SELECT cp_name,SUM(cr_cost) AS sum FROM chem_receipt 
            INNER JOIN chem_project 
            ON cr_cp_fk = cp_pk
            WHERE `cr_updDt` BETWEEN '".$stDt."' AND '".$edDt."' ";

    if($cp_name != null){
        $sql .= "AND cp_name LIKE '%".$cp_name."%' ";
    }
            
    $sql .="GROUP BY cr_cp_fk";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);

?>