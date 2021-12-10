<Html>
<h1>login</h1> <br>
  <head>Log ind for at spille!</head>
  <link rel="stylesheet" href="style.css">
  <body>
<?php
  //session_start(); Skal udkommenteres i one.com
  $conn = new mysqli("localhost:3306", "root", "root", "indiana");
  if($conn->connect_error)
  {
      die("Connection failed : ". $conn->connect_error);
  }
  //echo "Connected successfully" . "<br/>" . "<br/>";
                

  if (isset($_POST['login'])) {
    //vi henter vores 2 værdier ind
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password_hash = md5($password);

    //validering
    if($username == "") $username = "ukendt"; 
    if($password == "") $password = "ukendt";

    $query = $conn->prepare("SELECT * FROM indiana WHERE username=? AND password=?");
    $query->bind_param("ss", $username, $password_hash); //string og parameter vi leder efter
    $query->execute(); //udfører vores SQL
    $result = $query->get_result(); //vi får noget tilbage, som vi kan hente med get_result
    if ($result->num_rows > 0) { //vi finder brugernavn
      $query->close();
      $_SESSION['username'] = $username;
      echo '<p class="success">Tillykke du er nu logget ind!</p>';

      header('Refresh: 2; URL = game.php');
    }else{
      echo '<p class="error">Fejl i login</p>';
    }
  } 
?>

<form method="post" action="" name="signin-form">
  <div class="form-element">
    <label>Brugernavn</label>
    <input type="text" name="username" value="<?php echo isset($username) ? $username :'' ?>" required />
  </div>
  <div class="form-element">
    <label>Password</label>
    <input type="password" name="password" value="<?php echo isset($password) ? $password :'' ?>" required />
  </div>
  <button type="submit" name="login" value="login">Log ind</button>
</form>
<?php
if($_SESSION['username']){
?>
Klik her for at  <a href = "logout.php" tite = "Logout">logge ud
<?php
} else{
?>
Klik her for at  <a href = "register.php" tite = "register"> register dig
<?php
}
?>
  


</body>
</Html>