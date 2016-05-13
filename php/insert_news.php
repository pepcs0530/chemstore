<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $title = $_POST['title'];
    $desc = $_POST['desc'];
    $link = $_POST['link'];
    $photo = $_POST['photo'];

    $sql = "INSERT INTO chem_pr ( `cpr_title`,`cpr_link`,`cpr_photo`,`cpr_desc`,`cpr_crtDt`,`cpr_useflg`
        ) VALUES ('".$title."','".$link."','../img/".$photo."','".$desc."',CURRENT_TIMESTAMP(),'1')";

    $result = mysql_query($sql);

    if($result){
        Print "\n Your information has been successfully added to the database."; 
    }
    else{
        die ("Error : ".mysql_error());
    }
?>