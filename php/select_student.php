<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';  

    isset($_POST['cp_pk']) ? $cp_pk = $_POST['cp_pk'] : $cp_pk = null;

    $sql = "SELECT * FROM `chem_student` WHERE `cs_cp_fk` = ".$cp_pk."";

    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);

?>