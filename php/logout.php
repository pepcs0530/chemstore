<?php
    session_start();
    unset ( $_SESSION['name'] );
    session_destroy();
?>
<script type="text/javascript">
    alert('ออกจากระบบ');
    javascript:top.frames['left'].location = '../html/menu_index.html';

    javascript:top.frames['right'].location = '../html/login.html';
</script>