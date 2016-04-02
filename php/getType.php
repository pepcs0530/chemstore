<?php
    session_start(); 
    //(isset($_SESSION['name'])) ? $_SESSION['name'] : ''
    //echo $_SESSION["name"];
    echo (isset($_SESSION['type'])) ? $_SESSION['type'] : '';
?>