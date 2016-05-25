<?php
    include 'connect.php';

    if(isset($_POST['save']))
    {
        if(($_FILES['file']['type'] == 'image/gif')
        || ($_FILES['file']['type'] == 'image/jpeg')
        || ($_FILES['file']['type'] == 'image/pjpeg')
        && ($_FILES['file']['size'] < 200000))
        {
            if($_FILES['file']['error'] > 0)
            {
                echo "return code:" . $_FILES['file']['error'];
            }
            else if(file_exists('../img/'.$FILES['file']['name']))
            {
                echo $_FILES['file']['name']."Already Exit";
            }
            else if(move_uploaded_file($_FILES['file']['tmp_name'],
                '../img/'.$_FILES['file']['name']))
                {
                    $part = '../img/'.$_FILES['file']['name'];
                    $sql = mysql_query("INSERT INTO chem_pr (cpr_photo) VALUES ('{$part}')");
                    if($sql)
                    {
                        echo "Successfully insert this record.";
                    }
                    else
                    {
                        echo "Error insert.";
                    }
                }
        }

    }
?>