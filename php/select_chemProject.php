<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    $teacher_pk = $_POST['teacher_pk'];
    $sql = "SELECT cp_pk,cp_name,cp_eduLvl,cp_budget,ca_tname,ca_fname,cp_desc,cp_current_budget,cp_reasonyear ".
            "FROM chem_project ".
            "INNER JOIN chem_account ".
            "ON cp_teach_fk = ca_pk ".
            "WHERE cp_teach_fk = '".$teacher_pk."' AND cp_useflg = '1' ";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    echo json_encode($data);
?>