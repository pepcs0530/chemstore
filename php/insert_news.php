<?php
    //$_POST = json_decode(file_get_contents("php://input"), true);
    include 'connect.php';

    $title = $_POST['title'];
    $desc = $_POST['desc'];
    $link = $_POST['link'];
   // $file = $_FILES['file']['file'];
    $filename = $_FILES['file']['name'];
    $filetype = $_FILES['file']['type'] ;
    $filepath = "../img/upload/".$filename;

        echo "$title $desc $link $filename $filetype $filepath";
   if(($filetype== 'image/gif')
        || ($filetype == 'image/jpeg')
        || ($filetype == 'image/png')){

        if($_FILES['file']['size'] < 200000){
       
            if(move_uploaded_file( $_FILES['file']['tmp_name'],$filepath)){
                   
               // $sql = mysql_query("INSERT INTO chem_pr (cpr_photo) VALUES ('{$filepart}')");
               // if($sql)
                 $sql = "INSERT INTO chem_pr ( `cpr_title`,`cpr_link`,`cpr_photo`,`cpr_desc`,`cpr_crtDt`,`cpr_useflg`
                    ) VALUES ('".$title."','".$link."','".$filepath ."','".$desc."',CURRENT_TIMESTAMP(),'1')";

                $result = mysql_query($sql);

                if($result){
                    Print "\n Your information has been successfully added to the database.";
                     echo "Successfully insert this record.";
                }else{
                    die ("Error : ".mysql_error());
                }
                   
            
            }else if($_FILES['file']['error'] > 0){
               echo "return code:" . $_FILES['file']['error'];
            }else if(file_exists("$filepath")){
               echo "$filename Already Exit";
            }else {
                echo "Other error";
            }
              
        }else echo "File is too large";

    }else echo "$filetype is not support";


/*
  $destination =  "../img/UploadFile/$filename";
  move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );*/


?>

<?php
//    include 'connect.php';
//
//    if(isset($_POST['save']))
//    {
//        if(($_FILES['file']['type'] == 'image/gif')
//        || ($_FILES['file']['type'] == 'image/jpeg')
//        || ($_FILES['file']['type'] == 'image/pjpeg')
//        && ($_FILES['file']['size'] < 200000))
//        {
//            if($_FILES['file']['error'] > 0)
//            {
//                echo "return code:" . $_FILES['file']['error'];
//            }
//            else if(file_exists('../img/'.$FILES['file']['name']))
//            {
//                echo $_FILES['file']['name']."Already Exit";
//            }
//            else if(move_uploaded_file($_FILES['file']['tmp_name'],
//                '../img/'.$_FILES['file']['name']))
//                {
//                    $part = '../img/'.$_FILES['file']['name'];
//                    $sql = mysql_query("INSERT INTO chem_pr (cpr_photo) VALUES ('{$part}')");
//                    if($sql)
//                    {
//                        echo "Successfully insert this record.";
//                    }
//                    else
//                    {
//                        echo "Error insert.";
//                    }
//                }
//        }
//
//    }
?>