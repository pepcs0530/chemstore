<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    session_start();   

    //$username = $_POST['ca_user'];
    //$password = $_POST['ca_pass'];
    
    $username = (isset($_POST['ca_user'])) ? $_POST['ca_user'] : '';
    $password = (isset($_POST['ca_pass'])) ? $_POST['ca_pass'] : '';

    $sql = "SELECT ca_pass,ca_fname,ca_cat_fk FROM `chem_account` WHERE `ca_user` = '".$username."'";
    $query = mysql_query($sql);
    $data=array();

    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }

    if($data[0][0] == $password)
    {
        $_SESSION["name"] = $username;
    }
?>