<?php
(PHP_SAPI !== 'cli' || isset($_SERVER['HTTP_USER_AGENT'])) && die('cli only');
if(empty($argv[1])) {
    $argv[1] = "dev";
}

switch ($argv[1]) {
    case "staging":
        $url = "http://wintergift-api.codeforcharlotte.org/api/login";
        break;

    case "dev":
    case "local":
    case "development":
    default:
        if (gethostname() == "cmpd-holiday-gift-backend") {
            $url = "http://localhost/api/login";
        } else {
            $url = "http://homestead.app/api/login";
        }
        break;

    case "help":
        die("\nUsage: php gettoken.php development|staging\n\n");
        break;
}
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS,
    "email=developer@codeforcharlotte.org&password=admin");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$resp = curl_exec ($ch);
curl_close ($ch);

try {
    $resp = json_decode($resp);
    echo "\n\nToken: \n{$resp->token}\n\n";
} catch (Exception $e) {
    die("Nope. Something's not right :(");
}