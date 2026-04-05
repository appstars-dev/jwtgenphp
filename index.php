<html>
    <head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="js/bootstrap.min.js" rel="text/javascript">
    <style>
        #wrapper{margin: 15px}
        .border{padding: 10px}
    </style>
    </head>
    <body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="<?php echo (getenv('URI_PROTO').':'. getenv('BASE_URI'))?>;#">JWT Generator</a>
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
            <li><a class="dropdown-item" href="#">Description</a></li>
            <li><a class="dropdown-item" href="#">Github link</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Authors</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Your custom wishes</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div id="wrapper">

<form action="generate.php" enctype="multipart/form-data" method="POST" >
    <div class="mb-3">
    <label for="InputName" class="form-label">Person name</label>
    <input type="text" class="form-control" id="InputName" placeholder="Anonymous" aria-describedby="NameHelp">
    <div id="NameHelp" class="form-text">Participant's name</div>
  </div>
  <div class="mb-3">
    <label for="InputEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">Whom you want to meet</div>
  </div>
    <div class="mb-3">
    <label for="InputURI" class="form-label">Jitsi Server URL</label>
    <input type="text" class="form-control" id="InputURI" aria-describedby="URIHelp">
    <div id="URIHelp" class="form-text">Domain of your Jitsi server</div>
  </div>
    <div class="mb-3">
    <label for="InputRoom" class="form-label">Room name</label>
    <input type="text" class="form-control" id="InputRoom" placeholder="*" aria-describedby="RoomHelp">
    <div id="RoomHelp" class="form-text">Permitted room</div>
  </div>
  <div class="mb-3">
    <label for="InputAppid" class="form-label">Application ID</label>
    <input type="text" class="form-control" id="InputAppid" aria-describedby="AppidHelp" required>
    <div id="AppidHelp" class="form-text">ID of your Jitsi application.</div>
  </div>
  <div class="mb-3">
    <label for="InputJSecret" class="form-label">JitsiSecret</label>
    <input type="password" class="form-control" id="InputJSecret" aria-describedby="JSecretHELP">
    <div id="JSecretHelp" class="form-text">Secret of your Jitsi application.</div>
  </div>
<div class="border border-warning">
  <div class="mb-3">
    <label for="InputSMTPURI" class="form-label">SMTP server address</label>
    <input type="text" class="form-control" id="InputSMTPURI" aria-describedby="SMTPURIHelp">
    <div id="SMTPURIHelp" class="form-text">Address of your SMTP server for the notification.</div>
  </div>
  <div>
    <label for="InputSMTPLogin" class="form-label">SMTP server login</label>
    <input type="text" class="form-control" id="InputSMTPLogin" aria-describedby="SMTPLoginHelp">
    <div id="SMTPLoginHelp" class="form-text">User of your SMTP server for the notification</div>
  </div>
  <div class="mb-3">
    <label for="InputSMTPPassword" class="form-label">SMTP server password</label>
    <input type="password" class="form-control" id="InputSMTPPassword">
  </div>
</div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="CheckModerator">
    <label class="form-check-label" for="CheckModerator">Is moderator</label>
  </div>

</div>
  <button type="submit" class="btn btn-primary">Generate</button>
</form>
</div>

</body>
<html>
