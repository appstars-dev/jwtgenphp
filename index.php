<?php require_once 'bootstrap.php'; ?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <title>JWT tag generator</title>
    <meta charset="utf-8">
    <link rel="icon" href="images/no_avatar.png" type="image/png">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery-4.0.0.min.js"></script>
    <?php addRecaptchaJS(EnvIsSet('GR_SITE_KEY','','')); ?>
    <style>
        <?php 
        HideDiv('JITSI_URI', '.div_uri');
        HideDiv('APP_ID', '.div_appid');
        HideDiv('JWT_KEY', '.div_secret');
        HideDiv('DISABLE_SMTP', '.smtp_block');
        HideDiv('SMTP_SRV', '.div_msrv');
        HideDiv('SMTP_USR', '.div_musr');
        HideDiv('SMTP_PWD', '.div_mpwd');
        ?>
    </style>
    </head>
    <body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="<?php echo (EnvIsSet('URI_PROTO','','https').'://'. EnvIsSet('BASE_URI','','localhost'))?>"><img id="logo" alt="logo" src="images/no_avatar.png" ></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://jitsi.org/">Jitsi</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            About
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="README.md">Description</a></li>
            <li><a class="dropdown-item" href="https://github.com/appstars-dev/jwtgenphp">GitHub link</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Authors</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" tabindex="-1" aria-disabled="true">Your custom wishes</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div id="wrapper">

<form action="#" enctype="multipart/form-data" method="POST" >
    <div class="mb-3">
    <label for="InputName" class="form-label">Person name</label>
    <input type="text" class="form-control" name="InputName" id="InputName" placeholder="Anonymous" aria-describedby="NameHelp">
    <div id="NameHelp" class="form-text">Participant's name</div>
  </div>
  <div class="mb-3">
    <label for="InputEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" name="InputEmail" id="InputEmail" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">Whom you want to meet</div>
  </div>
    <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" name="CheckModerator" id="CheckModerator">
    <label class="form-check-label" for="CheckModerator">Is moderator</label>
  </div>
  <hr>

  <div class="mb-3 div_uri">
    <label for="InputURI" class="form-label">Jitsi Server URL</label>
    <input type="text" class="form-control" name="InputURI" id="InputURI" aria-describedby="URIHelp">
    <div id="URIHelp" class="form-text">Domain of your Jitsi server</div>
  </div>

    <div class="mb-3">
    <label for="InputRoom" class="form-label">Room name</label>
    <input type="text" class="form-control" name="InputRoom" id="InputRoom" placeholder="*" aria-describedby="RoomHelp">
    <div id="RoomHelp" class="form-text">Permitted room</div>
  </div>
  <div class="mb-3 div_appid">
    <label for="InputAppid" class="form-label">Application ID</label>
    <input type="text" class="form-control" name="InputAppid" id="InputAppid" aria-describedby="AppidHelp" <?php if (empty($_ENV['APP_ID']) or strcmp($_ENV['APP_ID'], "") == 0){echo 'required';} ?> >
    <div id="AppidHelp" class="form-text">ID of your Jitsi application.</div>
  </div>
  <div class="mb-3 div_secret">
    <label for="InputJSecret" class="form-label">JitsiSecret</label>
    <input type="password" class="form-control" name="InputJSecret" id="InputJSecret" aria-describedby="JSecretHelp" <?php if (empty($_ENV['JWT_KEY'])){echo 'required';} ?> >
    <div id="JSecretHelp" class="form-text">Secret of your Jitsi application.</div>
  </div>
<div class="border border-warning smtp_block">
  <div class="mb-3 div_msrv">
    <label for="InputSMTPURI" class="form-label">SMTP server address</label>
    <input type="text" class="form-control" name="InputSMTPURI" id="InputSMTPURI" aria-describedby="SMTPURIHelp">
    <div id="SMTPURIHelp" class="form-text">Address of your SMTP server for the notification.</div>
  </div>
    <div class="mb-3 form-check div_mauth">
    <input type="checkbox" class="form-check-input" name="CheckSMTPAuth" id="CheckSMTPAuth">
    <label class="form-check-label" for="CheckSMTPAuth">Needs authentification</label>
  </div>
  <div class="mb-3 div_musr">
    <label for="InputSMTPLogin" class="form-label">SMTP server login</label>
    <input type="text" class="form-control" name="InputSMTPLogin" id="InputSMTPLogin" aria-describedby="SMTPLoginHelp">
    <div id="SMTPLoginHelp" class="form-text">User of your SMTP server for the notification</div>
  </div>
  <div class="mb-3 div_mpwd">
    <label for="InputSMTPPassword" class="form-label">SMTP server password</label>
    <input type="password" class="form-control" name="InputSMTPPassword" id="InputSMTPPassword">
  </div>
</div>
  <?php Recaptchadiv(EnvIsSet('GR_SITE_KEY','','')); ?><br>
  <button type="submit" formaction="generate.php" name="submit_generate" value="submit_1" class="btn btn-primary" <?php RecaptchaElement(EnvIsSet('GR_SITE_KEY','',''));?> >Generate</button>
  <button type="submit" formaction="postwizard.php" name="submit_post" value="submit_2" class="btn btn-primary" <?php RecaptchaElement(EnvIsSet('GR_SITE_KEY','',''));?> >Mail to</button>
</form>
</div>
    <div id="footer">JWTGenPHP &copy;2026 AppStars. MIT and other licenses</div>
</body>
</html>
