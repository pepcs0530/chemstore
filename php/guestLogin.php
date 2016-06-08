<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    include 'connect.php';
    session_start();   
    
    $_SESSION["name"] = "ผู้เยี่ยมชมระบบ";
    $_SESSION["pk"] = "6";
    $_SESSION["type"] = "5";        
?>