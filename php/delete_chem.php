<?php   
    
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';

    isset($_POST['cc_pk']) ? $pk = $_POST['cc_pk'] : $pk = '';
    $sql = "UPDATE chem_category SET 
    cc_useflg = '0',
    cc_updDt = CURRENT_TIMESTAMP
    WHERE cc_pk = '".$pk."'";

    $result = mysql_query($sql);

    if($result){
        Print "\n Your information has been successfully delete from the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>