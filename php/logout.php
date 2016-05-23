<?php
    header("content-type:text/html;charset=utf-8");
    session_start();
    unset ( $_SESSION['name'] );
    session_destroy();
?>
<script type="text/javascript" language="javaScript" charset="UTF-8">
    
    //alert('ออกจากระบบ');
//    javascript:top.frames['left'].location = '../html/menu_index.html';
//    javascript:top.frames['right'].location = '../html/login.html';
    window.location.href="../html/index.html";
</script>