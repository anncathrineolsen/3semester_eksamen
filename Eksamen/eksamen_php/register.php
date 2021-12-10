<Html>
<h1>Registering</h1> <br>
  <head>Nu er du snart klar til at spille!</head>
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

    if (isset($_POST['register'])) {

        //vi henter vores 3 værdier ind
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $password_hash = md5($password);

        //validering
        if($username == "") $username = "ukendt"; 
        if($email == "") $email = "ukendt";
        if($password == "") $password = "ukendt";
        
        $query = $conn->prepare("SELECT * FROM indiana WHERE email=?"); //tjekker om emailen er benyttet tidligere
        $query->bind_param("s", $email); //typen(string) og hvilken parameter vi leder efter
        $query->execute(); //Udfører vores SQL
        $result = $query->get_result(); //vi får noget tilbage, som vi kan hente med get_result
        if ($result->num_rows > 0) { //hvis emailen allerede findes
            echo '<p class="error">Emailen er allerede registeret!</p>';
        }else{ // hvis emailen ikke findes
            $query->close();
            $data = "INSERT INTO indiana (username, password, email) VALUES (?, ?, ?)";
            if($query = $conn->prepare($data)){
                $query->bind_param("sss", $username, $password_hash, $email);
                $query->execute();
                $query->close();

                echo 'Du har nu registreret! ', $username;

            } else{
                echo 'Der er sket en fejl!';

            }
        }
    } 
?>

<form method="post" action="register.php" name="signup-form">
<div class="form-element">
<label>Brugernavn</label>
<input type="text" name="username" value="<?php echo isset($username) ? $username :'' ?>" pattern="[a-åA-å0-9]+" required />
</div>
<div class="form-element">
<label>Email</label>
<input type="email" name="email" value="<?php echo isset($email) ? $email :'' ?>" required />
</div>
<div class="form-element">
<label>Password</label>
<input type="password" name="password" value="<?php echo isset($password) ? $password :'' ?>"required />
</div>
<button type="submit" name="register" value="register">Register</button>
</form>
Klik her for at <a href="./login.php" class="logout-button">logge ind</a>
</body>
</Html>