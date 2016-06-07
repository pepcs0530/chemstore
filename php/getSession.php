<?php
    session_start(); 
    echo (isset($_SESSION['name'])) ? $_SESSION['name'] : '';
?>