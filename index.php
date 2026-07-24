<?php require_once 'includes/bootstrap.php';
$L10N_CODE=EnvIsSet('L10N_CODE','','en');
//$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '', 0, 2);

$l10n_file="locale.ini";
require_once 'public.conf.php';
$version="beta3";
?>
<!DOCTYPE html>
<html lang="<?php echo $L10N_CODE; ?>">
    <head>
        <title><?php echo ini_local($l10n_file, $L10N_CODE, "JWT token generator");?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.5">
        <link rel="icon" href="images/no_avatar.png" type="image/png">
        <link rel="apple-touch-icon" href="images/no_avatar.png" type="image/png">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/tempus-dominus.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/iconfont.css">
        <link rel="stylesheet" href="css/sociallyiconic.css">
        <link rel="stylesheet" href="css/sociallyiconic-codes.css">
        <link rel="stylesheet" href="css/sociallyiconic-embedded.css">
        <script src="js/bootstrap.bundle.min.js"></script>
        <script src="js/jquery-4.0.0.min.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/tempus-dominus.min.js"></script>
        <script src="js/main.js"></script>
        <script src="js/names.js"></script>
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
    <!-- DEBUG START -->
    <div id="debug" style="display: none" class="alert alert-danger" role="alert">
        <?php if(EnvIsSet("DEBUG_MODE", '', false)){echo ini_local($l10n_file, $L10N_CODE, 'Debug enabled'); }?>
    </div>
    <!-- DEBUG END -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
  <a class="navbar-brand" href="<?php echo (EnvIsSet('URI_PROTO','','https').'://'. EnvIsSet('BASE_URI','','localhost'))?>"><img id="logo" alt="logo" src="<?php echo EnvIsSet('OEM_LOGO','','images/no_avatar.png') ?>" ></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><?php echo ini_local($l10n_file, $L10N_CODE, "Home")?></a>
        </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <?php echo ini_local($l10n_file, $L10N_CODE, "Jitsi"); ?>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="https://jitsi.org/"><?php echo ini_local($l10n_file, $L10N_CODE, "Home page")?></a></li>
                  <li><a class="dropdown-item" href="https://github.com/jitsi/docker-jitsi-meet/releases"><?php echo ini_local($l10n_file, $L10N_CODE, "Jitsi for Docker")?></a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="https://jitsi.support/wiki/install-jitsi-meet-docker/"><?php echo ini_local($l10n_file, $L10N_CODE, "Support");?></a></li>
              </ul>
          </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="about" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <?php echo ini_local($l10n_file, $L10N_CODE, "About"); ?>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="README.md"><?php echo ini_local($l10n_file, $L10N_CODE, "Description")?></a></li>
            <li><a class="dropdown-item" href="https://github.com/appstars-dev/jwtgenphp"><?php echo ini_local($l10n_file, $L10N_CODE, "GitHub link")?></a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#"><?php echo ini_local($l10n_file, $L10N_CODE, "Authors");?></a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" tabindex="-1" aria-disabled="true"><?php echo ini_local($l10n_file, $L10N_CODE, "Your custom wishes")?></a>
        </li>
      </ul>
        <form class="d-flex">
            <ul class="si si-circle si-cubizer si-bg-white">
                <li><a href="#" class="github"><span><i class="iconic-github"></i></span><span class="si-label">GitHub</span></a></li>
            </ul>
        </form>
    </div>
  </div>
</nav>

    <?= TimeCheck() ?>
<div id="wrapper" class="h-100">

<form action="#" enctype="multipart/form-data" method="POST" >
    <div class="mb-3">
    <label for="InputName" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Person name');?></label>
        <div class="input-group mb-3">
    <input type="text" class="form-control form-control-lg" name="InputName" id="InputName" placeholder="<?php echo ini_local($l10n_file, $L10N_CODE, 'Anonymous'); ?>" aria-describedby="NameHelp"><button type="button" class="btn btn-outline-primary feather icon-shuffle" onclick="fillRandomName('<?= $L10N_CODE ?>')"></button>
        </div>
    <div id="NameHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Participant\'s name'); ?></div>
  </div>
    <div class="mb-3">
        <label for="InputDesc" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Meeting description');?></label>
        <div class="input-group mb-3">
            <textarea type="text" class="form-control form-control-lg" name="InputDesc" id="InputDesc" aria-describedby="MeetingDesc"></textarea>
        </div>
        <div id="NameHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Meeting topic'); ?></div>
    </div>
  <div class="mb-3">
    <label for="InputEmail" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Email address');?></label>
      <div class="input-group mb-3">
    <input type="email" class="form-control form-control-lg" name="InputEmail" id="InputEmail" aria-describedby="emailHelp" required><button type="button" class="btn btn-outline-primary feather icon-shuffle" onclick="randomEmail()"></button>
      </div>
    <div id="emailHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Whom you want to meet'); ?></div>
  </div>
    <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" name="CheckModerator" id="CheckModerator">
    <label class="form-check-label" for="CheckModerator"><?php echo ini_local($l10n_file, $L10N_CODE, 'Is moderator');?></label>
  </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" name="CheckOwner" id="CheckOwner">
        <label class="form-check-label" for="CheckOwner"><?php echo ini_local($l10n_file, $L10N_CODE, 'Is owner');?></label>
    </div>
  <hr>

  <div class="mb-3 div_uri">
    <label for="InputURI" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Jitsi Server URL'); ?></label>
    <input type="text" class="form-control form-control-lg" name="InputURI" id="InputURI" aria-describedby="URIHelp">
    <div id="URIHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Domain of your Jitsi server'); ?></div>
  </div>

    <div class="mb-3">
    <label for="InputRoom" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Room name'); ?></label>
        <div class="input-group mb-3">
    <input type="text" class="form-control form-control-lg" name="InputRoom" id="InputRoom" placeholder="<?php echo EnvIsSet('DEFAULT_ROOM','','public')?>" aria-describedby="RoomHelp"><button type="button" class="btn btn-outline-primary feather icon-shuffle" onclick="generateUUID()"></button><button type="button" class="btn btn-outline-primary feather icon-copy" onclick="copyToClipboard('InputRoom')"></button>
        </div>
    <div id="RoomHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Permitted room');?></div>
  </div>
    <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" name="CheckWildcard" id="CheckWildcard">
    <label class="form-check-label" for="CheckWildcard"><?php echo ini_local($l10n_file, $L10N_CODE, 'Access to any room');?></label>
</div>
<!-- -->

    <div class="row">
        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckRecording" id="CheckRecording" checked>
                <label class="form-check-label" for="CheckRecording"><?php echo ini_local($l10n_file, $L10N_CODE, 'Recording');?></label>
            </div>
        </div>
        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckLiveStreaming" id="CheckLiveStreaming">
                <label class="form-check-label" for="CheckLiveStreaming"><?php echo ini_local($l10n_file, $L10N_CODE, 'Live Streaming');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckSIPIC" id="CheckSIPIC">
                <label class="form-check-label" for="CheckSIPIC"><?php echo ini_local($l10n_file, $L10N_CODE, 'SIP Inbound call');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckSIPOC" id="CheckSIPOC">
                <label class="form-check-label" for="CheckSIPOC"><?php echo ini_local($l10n_file, $L10N_CODE, 'SIP Outbound call');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckIC" id="CheckIC">
                <label class="form-check-label" for="CheckIC"><?php echo ini_local($l10n_file, $L10N_CODE, 'Inbound call');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckOC" id="CheckOC">
                <label class="form-check-label" for="CheckOC"><?php echo ini_local($l10n_file, $L10N_CODE, 'Outbound call');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckSharing" id="CheckSharing" checked>
                <label class="form-check-label" for="CheckSharing"><?php echo ini_local($l10n_file, $L10N_CODE, 'Screen Sharing');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckFU" id="CheckFU">
                <label class="form-check-label" for="CheckFU"><?php echo ini_local($l10n_file, $L10N_CODE, 'File uploading');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckTranscript" id="CheckTranscript">
                <label class="form-check-label" for="CheckTranscript"><?php echo ini_local($l10n_file, $L10N_CODE, 'Transcription');?></label>
            </div>
        </div>

        <div class="col-6">
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" name="CheckVisitors" id="CheckVisitors">
                <label class="form-check-label" for="CheckVisitors"><?php echo ini_local($l10n_file, $L10N_CODE, 'List visitors');?></label>
            </div>
        </div>
    </div>

    <div class="mb-3">
    <label for="InputRoom" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Valid until'); ?></label>
     <div class="input-group mb-3" id="ExpireTime" data-format="2025-06-17T19:30:45+03:00">
           <input type="text" id="InputExpireTime" name="InputExpireTime" placeholder="<?=EnvIsSet('EXPIRES', 'ExpirationTime', '30') ?> m" class="form-control form-control-lg" readonly=""><button type="button" class="btn btn-outline-primary feather icon-calendar"></button>
        </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const container = document.getElementById('InputExpireTime');

            if (!container) return;

            const picker = new tempusDominus.TempusDominus(container);

            picker.on('change', function (e) {
                if (e.date) {
                    const isoString = e.date.toISOString();
                }
            });
        });</script>
    </div>

    <div class="mb-3 div_secret">
    <label for="InputJSecret" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'Jitsi Secret');?></label>
    <input type="password" class="form-control form-control-lg" name="InputJSecret" id="InputJSecret" aria-describedby="JSecretHelp" <?php if (empty($_ENV['JWT_KEY'])){echo 'required';} ?> >
    <div id="JSecretHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Secret of your Jitsi application');?></div>
  </div>

<div class="border border-warning smtp_block">
  <div class="mb-3 div_msrv">
    <label for="InputSMTPURI" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'SMTP server address');?></label>
    <input type="text" class="form-control form-control-lg" name="InputSMTPURI" id="InputSMTPURI" aria-describedby="SMTPURIHelp">
    <div id="SMTPURIHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'Address of your SMTP server for the notification'); ?></div>
  </div>
    <div class="mb-3 form-check div_mauth">
    <input type="checkbox" class="form-check-input" name="CheckSMTPAuth" id="CheckSMTPAuth">
    <label class="form-check-label" for="CheckSMTPAuth"><?php echo ini_local($l10n_file, $L10N_CODE, 'Needs authentification');?></label>
  </div>
  <div class="mb-3 div_musr">
    <label for="InputSMTPLogin" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'SMTP server login');?></label>
    <input type="text" class="form-control form-control-lg" name="InputSMTPLogin" id="InputSMTPLogin" aria-describedby="SMTPLoginHelp">
    <div id="SMTPLoginHelp" class="form-text"><?php echo ini_local($l10n_file, $L10N_CODE, 'User of your SMTP server for the notification');?></div>
  </div>
  <div class="mb-3 div_mpwd">
    <label for="InputSMTPPassword" class="form-label"><?php echo ini_local($l10n_file, $L10N_CODE, 'SMTP server password');?></label>
    <input type="password" class="form-control form-control-lg" name="InputSMTPPassword" id="InputSMTPPassword">
  </div>
</div>

  <?php Recaptchadiv(EnvIsSet('GR_SITE_KEY','','')); ?><br>
  <button type="submit" formaction="generate.php" name="submit_generate" value="submit_1" class="btn btn-primary" <?php RecaptchaElement(EnvIsSet('GR_SITE_KEY','',''));?> ><?php echo ini_local($l10n_file, $L10N_CODE, "Generate"); ?></button>
  <?php if (strcmp(EnvIsSet('DISABLE_SMTP', '', 'false'), "true") !== 0){ echo '<button type="submit" formaction="postwizard.php" name="submit_post" value="submit_2" class="btn btn-primary"'. RecaptchaElement(EnvIsSet('GR_SITE_KEY','','')).'>'.ini_local($l10n_file, $L10N_CODE, "Mail to"). '</button>'; } ?>
</form>
</div>
    <div id="footer">JWTGenPHP <?php echo $version.' &copy;'.date("Y"); ?> AppStars.<br> MIT and other licenses</div>
</body>
</html>
