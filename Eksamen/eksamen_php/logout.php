<?php
   session_start();
   unset($_SESSION["username"]);
   unset($_SESSION["password"]);
   
   echo 'Du er nu logget ud';
   header('Refresh: 2; URL = login.php');
?>