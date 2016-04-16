<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $teacher_pk = $_POST['teacher_pk'];
    $sql = "SELECT cp_pk,cp_name,cp_budget,ca_tname,ca_fname,cp_desc ".
            "FROM chem_project ".
            "INNER JOIN chem_account ".
            "ON cp_teach_fk = ca_pk ".
            "where cp_teach_fk = '".$teacher_pk."'";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>