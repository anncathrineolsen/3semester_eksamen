<?php
session_start();
if (! empty($_SESSION["username"])) {
    $member = new Member();
    $memberResult = $member->getMemberById($_SESSION["username"]);
    if(!empty($memberResult[0]["display_name"])) {
        $displayName = ucwords($memberResult[0]["display_name"]);
    } else {
        $displayName = $memberResult[0]["username"];
    }
}
?>

<html>
<head>
<title>Spillet</title>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
   <link rel="stylesheet" href="style_game.css">
</head>
<body>


    <div>
        <div class="dashboard">
            <div class="member-dashboard"><span>Velkommen <b><?php echo $_SESSION["username"]; ?></span></b>, du er nu logget ind!<br>
                Klik her for at <a href="./logout.php" class="logout-button">logge ud</a>
            </div>
        </div>
    </div>
    
    <iframe src="../spil_eksamen/index.html" title="Hjælp Indiana Jones med at samle alle skatte" width="100%" height="100%">
</iframe>

<div class="container">
    <button class="btn btn-info btn-chat" type="button" onclick="openChat()">Chat</button>

    <div class="chatbox" id="chatbox">
      <h2>Kontakt os</h2>
      <form class="form-container">
        <textarea type="text" placeholder="Skriv en besked.." name="msg" required=""></textarea>
        <button type="submit" class="btn btn-info btn-lg btn-send">Send</button>
        <button type="button" class="btn btn-danger btn-lg btn-close" onclick="closeChat()">Luk</button>
      </form>
    </div>

  </div>

  <script type="text/javascript">
    function openChat() {
      document.getElementById('chatbox').style.display='block';
      $('.btn-chat').hide();
    }
    function closeChat() {
      document.getElementById('chatbox').style.display='none';
      $('.btn-chat').show();
    }
    $('form').submit(function () {
      var text=$(this).find("textarea[name='msg']").val();

      alert("Beskeden er sendt");
    });
  </script>


</body>
</html>

