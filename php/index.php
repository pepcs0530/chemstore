<html>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<head>
  <title></title>
    <script src="../js/jquery-1.8.0.min.js"></script>
    <script src="../js/angular.min.js"></script>
    <style>
        #header {
            background-color:black;
            color:white;
            text-align:center;
            padding:5px;
        }
        #nav {
            line-height:30px;
            background-color:#eeeeee;
            width:100px;
            float:left;
            padding:5px;	      
        }
        #section {
            width:350px;
            float:left;
            padding:10px;	 	 
        }
        #footer {
            background-color:black;
            color:white;
            clear:both;
            text-align:center;
           padding:5px;	 	 
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>Chemstore</h1>
    </div>
    
<?php
        session_start();                                //เปิด seesion เพื่อทำงาน
        //$ses_userid = $_SESSION['ses_userid'];             //สร้าง session สำหรับเก็บค่า ID
        //$ses_username = $_SESSION['ses_username'];        //สร้าง session สำหรับเก็บค่า username
    
        //if($ses_userid <> session_id() or $ses_username ==""){
        if($_SESSION['ses_userid'] <> $_SESSION['ses_userid'] or $_SESSION['ses_username'] ==""){
            echo "Please Login to system<br />";
            //exit();
?>
            <div id="nav">
                <!--Menu-->
                <?php include('../html/menu_index.html');?>
            </div>

            <div id="section">
                <!--Content-->
                <?php include('../html/login.html');?>
            </div>
<?php
        }elseif($_SESSION[ses_status] == "manager"){
?>
            <div id="nav">
                <!--Menu-->
                <?php include('../html/menu_manager.html');?>
            </div>

            <div id="section">
                <!--Content-->
                <?php include('');?>
            </div> 
<?php
        }elseif($_SESSION[ses_status] == "teacher"){
?>
            <div id="nav">
                <!--Menu-->
                <?php include('../html/menu_teacher.html');?>
            </div>

            <div id="section">
                <!--Content-->
                <?php include('');?>
            </div> 
<?php
        }elseif($_SESSION[ses_status] == "operator"){
?>
            <div id="nav">
                <!--Menu-->
                <?php include('../html/menu_operator.html');?>
            </div>

            <div id="section">
                <!--Content-->
                <?php include('');?>
            </div> 
<?php
        }else{
?>
            <div id="nav">
                <!--Menu-->
                <?php include('../html/menu_scientise.html');?>
            </div>

            <div id="section">
                <!--Content-->
                <?php include('');?>
            </div> 
<?php
        }
        
    ?>
    

    <div id="footer">
        Copyright © Web programming 2016
    </div>

</body>

    
</html>
