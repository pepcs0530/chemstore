<?php   
    
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    isset($_POST['ca_pk']) ? $pk = $_POST['ca_pk'] : $pk = '';
    $sql = "UPDATE `chem_account` SET 
    ca_useflg = '0',
    ca_updDt = CURRENT_TIMESTAMP
    WHERE ca_pk = '".$pk."'";

    $result = mysql_query($sql);

    if($result){
        Print "\n Your information has been successfully delete from the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>