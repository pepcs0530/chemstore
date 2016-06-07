<?php
    session_start(); 
    echo (isset($_SESSION['type'])) ? $_SESSION['type'] : '';
?>