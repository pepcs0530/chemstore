<?php
    session_start(); 
    echo (isset($_SESSION['pk'])) ? $_SESSION['pk'] : '';
?>