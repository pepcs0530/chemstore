<?php
//// get database connection
//include_once 'database.php';
//
// 
//$database = new Database();
//$db = $database->getConnection();
// 
//// instantiate member object
//include_once 'obj_member.php';
//$member = new Member($db);
// 
//// get posted data
//$data = json_decode(file_get_contents("php://input")); 
// 
//// set product property values
//$member->code = $data->code;
//$member->user = $data->user;
//$member->pass = $data->pass;
//$member->tname = $data->tname;
//$member->fname = $data->fname;
//$member->lname = $data->lname;
//$member->tel = $data->tel;
//$member->acctyp = $data->acctyp;
////$member->useflg = "1";
////$member->created = date('Y-m-d H:i:s');
//     
//// create the product
//if($member->create()){
//    echo "Member was created.";
//}
// 
//// if unable to create the product, tell the user
//else{
//    echo "Unable to create member.";
//}


//$data = json_decode(file_get_contents("php://input"));
//    $code = mysql_real_escape_string($data->code);
//    $user = mysql_real_escape_string($data->user);
//    $pass = mysql_real_escape_string($data->pass);
//    $tname = mysql_real_escape_string($data->tname);
//    $fname = mysql_real_escape_string($data->fname);
//    $lname = mysql_real_escape_string($data->lname);
//    $tel = mysql_real_escape_string($data->tel);
//    $acctyp = mysql_real_escape_string($data->acctyp);

$_POST = json_decode(file_get_contents("php://input"), true);
include 'connect.php';

$code = $_POST['code'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$tname = $_POST['tname'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$tel = $_POST['tel'];
$acctyp = $_POST['acctyp'];

$sql = "INSERT INTO chem_account (
    ca_code,
    ca_user,
    ca_pass,
    ca_tname,
    ca_fname,
    ca_lname,
    ca_tel,
    ca_useflg,
    ca_crtDt,
    ca_cat_fk
    ) VALUES ('".$code."', '".$user."', '".$pass."', '".$tname."', '".$fname."', '".$lname."', '".$tel."', '1', CURRENT_TIMESTAMP , '".$acctyp."')";

$result = mysql_query($sql);

if($result){
    Print "\n Your information has been successfully added to the database."; 
}
else{
    die ("Error : ".mysql_error());
}


?>