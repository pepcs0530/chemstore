<?php
    session_start();
    unset ( $_SESSION['ses_userid'] );
    unset ( $_SESSION['ses_username'] );
    unset ( $_SESSION['ses_status'] );
    session_destroy();
    //header('Location: ../html/login.html');
    header('Location: ../php/index.php'); 
    //header("Refresh:0; url=../html/login.html; target=right");
?>