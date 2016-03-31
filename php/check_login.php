<?php
    session_start(); //เปิด seesion เพื่อทำงาน
    echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    //กำหนดภาษาของเอกสารให้เป็น UTF-8

    $username = $_POST['username'];
    //ประกาศซตัวแปรชื่อ username โดยการรับค่ามาจากกล่อง username ที่หน้า Login

    $password = $_POST['password'];
    //ประกาศซตัวแปรชื่อ password โดยการรับค่ามาจากกล่อง password ที่หน้า Login
    
    if($username == "") {                    //ถ้ายังไม่ได้กรอกข้อมูลที่ชื่อผู้ใช้ให้ทำงานดังต่อไปนี้
        echo "คุณยังไม่ได้กรอกชื่อผู้ใช้ครับ";
    } else if($password == "") {        //ถ้ายังไม่ได้กรอกรหัสผ่านให้ทำงานดังต่อไปนี้
        echo "คุณยังไม่ได้กรอกรหัสผ่านครับ";
    } else {                                               //ถ้ากรอกข้อมูลทั้งหมดแล้วให้ทำงานดังนี้
        include("connect.php");           //เรียก function สำหรับติดต่อฐานข้อมูลจากหน้า connect.php ขึ้นมา
        $check_log = mysql_query("SELECT * FROM chem_account WHERE ca_user ='$username' AND ca_pass ='$password' ");                           //ใช้ภาษา SQL ตรวจสอบข้อมูลในฐานข้อมูล
    $num = mysql_num_rows($check_log);
    //ให้เอาค่าที่ได้ออกมาประกาศเป็นตัวแปรชื่อ $num
    if($num <=0) {                                                           //ถ้าหากค่าที่ได้ออกมามีค่าต่ำกว่า 1
        echo "Username หรือ Password อาจจะผิดกรุณา Login ใหม่อีกครั้ง <br />
        <a href='../html/login.html'>Back</a>";
    } else {
        while ($data = mysql_fetch_array($check_log) ) {
        //ถ้าค่ามีมากกว่า 0 ขึ้นไป ให้ดึงข้อมูลออกมาทั้งหมด
        if($data['ca_cat_fk']==1){                          //ตรวจสอบสถานะของผู้ใช้ว่าเป็น manager
            echo "Hi Welcome Back manager<br />";             //สร้าง session สำหรับให้ admin นำค่าไปใช้งาน
            
            $_SESSION['ses_userid'] = session_id();            //สร้าง session สำหรับเก็บค่า ID
            $_SESSION['ses_username'] = $username;      //สร้าง session สำหรับเก็บค่า Username
            $_SESSION['ses_status'] = "manager";                      //สร้าง session สำหรับเก็บค่า สถานะความเป็น Admin
            echo "คุณคือ '".$_SESSION['ses_userid']."' '".$_SESSION['ses_username']."'<br/>";
            //href="../php/logout.php" target="right"
            //echo "<meta http-equiv='refresh' content='0;URL=../html/menu_manager.html'>";
            //echo '<meta HTTP-EQUIV="REFRESH" CONTENT="2; URL=javascript:window.open('../html/menu_manager.html','left');">';
            //ส่งค่าจากหน้านี้ไปหน้า index_admin.php
            echo '<meta http-equiv="REFRESH" content="2 ; url=../html/menu_manager.html" target="left">';
            echo "waiting manager..............................";
        }elseif($data['ca_cat_fk']==2){                       //ตรวจสอบสถานะของผู้ใช้งานว่าเป็น teacher
            echo "Hi Welcome Back teacher<br />"; 
            $_SESSION['ses_userid'] = session_id();                      //สร้าง session สำหรับให้ User นำไปใช้งาน
            $_SESSION['ses_username'] = $username;
            $_SESSION['ses_status'] = "teacher";
            //echo "<meta http-equiv='refresh' content='1;URL=index_teacher.php'>";
            //ส่งค่าจากหน้านี้ไปหน้า index_teacher.php
            echo "<br /> Waiting teacher..............................";
        }elseif($data['ca_cat_fk']==3){                              //ตรวจสอบสถานะของผู้ใช้งานว่าเป็น operator
            echo "Hi Welcome Back operator<br />"; 
            $_SESSION['ses_userid'] = session_id();                      //สร้าง session สำหรับให้ User นำไปใช้งาน
            $_SESSION['ses_username'] = $username;
            $_SESSION['ses_status'] = "operator";
            echo "คุณคือ '".$_SESSION['ses_userid']."' '".$_SESSION['ses_username']."'<br/>";
            //echo "<meta http-equiv='refresh' content='1;URL=index_operator.php'>";
            //ส่งค่าจากหน้านี้ไปหน้า index_operator.php
            echo "<br /> Waiting operator..............................";
        }else{
            echo "คุณคือ $ses_userid $ses_username";
            $_SESSION['ses_userid'] = session_id();
            $_SESSION['ses_username'] = $username;
            $_SESSION['ses_status'] = "scientist";
            echo "คุณคือ '".$_SESSION['ses_userid']."' '".$_SESSION['ses_username']."'<br/>";
            //echo "<meta http-equiv='refresh' content='1;URL=index_scientist.php'>";
            echo "<br /> Waiting scientist..............................";
        }
        }
    }
    }
?>