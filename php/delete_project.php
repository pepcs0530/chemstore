<?php   
    
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    isset($_POST['cp_pk']) ? $pk = $_POST['cp_pk'] : $pk = '';
    $sql = "UPDATE chem_project SET 
    cp_useflg = '0',
    cp_updDt = CURRENT_TIMESTAMP
    WHERE cp_pk = '".$pk."'";

    $result = mysql_query($sql);

    if($result){
        Print "\n Your information has been successfully delete from the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>