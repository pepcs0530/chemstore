<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    session_start();   
    
    $username = (isset($_POST['ca_user'])) ? $_POST['ca_user'] : '';
    $password = (isset($_POST['ca_pass'])) ? $_POST['ca_pass'] : '';

    $sql = "SELECT ca_pk,ca_pass,ca_fname,ca_lname,ca_cat_fk FROM `chem_account` WHERE `ca_user` = '".$username."' AND `ca_pass` = '".$password."' AND ca_useflg = '1'";
    $query = mysql_query($sql);
    $data=array();
    while($row = mysql_fetch_array ($query))
    {
        array_push($data,$row);
    }
    if(count($data) == 1 && $data[0][1] == $password)
    {
        $_SESSION["name"] = $data[0]['ca_fname']." ".$data[0]['ca_lname'];
        $_SESSION["pk"] = $data[0]['ca_pk'];
        $_SESSION["type"] = $data[0]['ca_cat_fk'];
        echo "true";
    }else{
        echo "false";
    }
        
?>