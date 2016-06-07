<?php
    //local
    $db_host = "localhost";
    $db_username = "root";
    $db_password = "";

    $db_name = 'db_chem_lab';
    mysql_connect("$db_host","$db_username","$db_password") or die ("Cound not connect to mysql");
    mysql_select_db("$db_name") or die ("No database");
    mysql_query("SET NAMES utf8");
    mysql_query("SET time_zone = '+7:00'");
    date_default_timezone_set('Asia/Bangkok');

?>