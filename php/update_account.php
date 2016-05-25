<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

//isset($_POST['ca_pk'] ? $ca_pk = $_POST['ca_pk'] : $ca_pk = '');
//isset($_POST['ca_code'] ? $ca_code = $_POST['ca_code'] : $ca_code = '');
//isset($_POST['ca_user'] ? $ca_user = $_POST['ca_user'] : $ca_user = '');
//isset($_POST['ca_pass'] ? $ca_pass = $_POST['ca_pass'] : $ca_pass = '');
//isset($_POST['ca_tname'] ? $ca_tname = $_POST['ca_tname'] : $ca_tname = '');
//isset($_POST['ca_fname'] ? $ca_fname = $_POST['ca_fname'] : $ca_fname = '');
//isset($_POST['ca_lname'] ? $ca_lname = $_POST['ca_lname'] : $ca_lname = '');
//isset($_POST['ca_tel'] ? $ca_tel = $_POST['ca_tel'] : $ca_tel = '');

$ca_pk = $_POST['ca_pk'] ;
$ca_code = $_POST['ca_code'] ;
$ca_user = $_POST['ca_user'] ;
$ca_pass = $_POST['ca_pass'] ;
$ca_tname = $_POST['ca_tname'] ;
$ca_fname = $_POST['ca_fname'] ;
$ca_lname = $_POST['ca_lname'] ;
$ca_tel = $_POST['ca_tel'] ;


$sql = "UPDATE chem_account SET 
    ca_code = '".$ca_code."',
    ca_user = '".$ca_user."',
    ca_pass = '".$ca_pass."',
    ca_tname = '".$ca_tname."',
    ca_fname = '".$ca_fname."',
    ca_lname = '".$ca_lname."',
    ca_tel = '".$ca_tel."',
    ca_updDt = CURRENT_TIMESTAMP
    WHERE ca_pk = '".$ca_pk."'";

print $sql;

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>