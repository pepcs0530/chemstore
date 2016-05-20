<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $quantity = $_POST['quantity'];
    $cc_pk = $_POST['cc_pk'];
    

    $sql = "UPDATE `chem_category` SET `cc_boundQ` = '".$quantity."' WHERE`cc_pk` = '".$cc_pk."'";
    $result = mysql_query($sql);
    
    $sql = "UPDATE `chem_category` SET `cc_quantity` = cc_quantity - cc_boundQ WHERE `cc_pk` = '".$cc_pk."'";
    $result = mysql_query($sql);

     if($result){
        Print "Your information has been successfully updated to the database."; 
    }
    else{
       die ("Error : ".mysql_error());
    }
?>