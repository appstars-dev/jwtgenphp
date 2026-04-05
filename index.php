<html>
    <head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="js/bootstrap.min.js" rel="text/javascript">
    <style>
        #wrapper{margin: 15px}
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
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div id="wrapper">

<form action="genererate.php" method="post">
  <div class="mb-3">
    <label for="InputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">Whom you want to meet</div>
  </div>
    <div class="mb-3">
    <label for="InputURI" class="form-label">Jitsi Server URL</label>
    <input type="text" class="form-control" id="InputURI" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Domain of your Jitsi server</div>
  </div>
    <div class="mb-3">
    <label for="InputRoom" class="form-label">Room name</label>
    <input type="text" class="form-control" id="InputRoom" placeholder="*" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Permitted room</div>
  </div>
  <div class="mb-3">
    <label for="InputAppid" class="form-label">Application ID</label>
    <input type="text" class="form-control" id="InputAppid" aria-describedby="emailHelp" required>
    <div id="emailHelp" class="form-text">ID of your Jitsi application.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">JitsiSecret</label>
    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Secret of your Jitsi application.</div>
  </div>

  <div class="mb-3">
    <label for="InputAppid" class="form-label">SMTP server address</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">Address of your SMTP server for the notification.</div>
  </div>
    <label for="InputSMTPLogin" class="form-label">SMTP server login</label>
    <input type="text" class="form-control" id="InputSMTPLogin" aria-describedby="emailHelp">
    <div id="InputSMTPLoginHelp" class="form-text">User of your SMTP server for the notification</div>
  </div>
  <div class="mb-3">
    <label for="InputSMTPPassword" class="form-label">SMTP server password</label>
    <input type="password" class="form-control" id="InputSMTPPassword">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="CheckModerator">
    <label class="form-check-label" for="CheckModerator">Is moderator</label>
  </div>

 <div class="row">
  <div class="col-sm-6 col-lg-5 mb-3 mb-sm-0">
    <div data-coreui-locale="en-US" data-coreui-timepicker="true" data-coreui-toggle="date-picker"></div>
  </div>
  <div class="col-sm-6 col-lg-5">
    <div data-coreui-date="2023/03/15 02:22:13 PM" data-coreui-locale="en-US" data-coreui-timepicker="true" data-coreui-toggle="date-picker"></div>
  </div>
</div>

</div>
  <button type="submit" class="btn btn-primary">Generate</button>
  <button type="submit" class="btn btn-primary">Send email</button>
</form>
</div>

echo "Your token:\n" . $jwt . "\n";

</body>
<html>
