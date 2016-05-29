<?php
$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$cp_pk = $_POST['cp_pk'] ;
$cs_no = $_POST['cs_no'] ;
$cs_name = $_POST['cs_name'] ;
$cs_tel = $_POST['cs_tel'] ;

print $cp_pk;
print $cs_no;
print $cs_name;
print $cs_tel;

$sql = "UPDATE chem_student SET 
    cs_no = '".$cs_no."',
    cs_name = '".$cs_name."',
    cs_tel = '".$cs_tel."'
    WHERE cs_cp_fk = ".$cp_pk."";

print $sql;

    $result = mysql_query($sql);
    
    if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }



?>