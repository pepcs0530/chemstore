<?php
    header("content-type:text/html;charset=utf-8");
    session_start();
    unset ( $_SESSION['name'] );
    session_destroy();
?>
<script type="text/javascript" language="javaScript" charset="UTF-8">
    window.location.href="../html/index.html";
</script>