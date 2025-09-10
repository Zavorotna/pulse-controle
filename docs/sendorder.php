<?php 
    try {
        $userPhone = $_POST["userPhone"];
        $userName = $_POST["userName"];
        $type = $_POST["type"];
        $date = $_POST["date"];
        $service = $_POST["service"];
        $comment = $_POST["comment"];
    } catch (\Throwable $th) {
        $userPhone = "ERROR IN MESSAGE";
        $userName = "ERROR IN MESSAGE";
        $type = "ERROR IN MESSAGE";
        $date = "ERROR IN MESSAGE";
        $service = "ERROR IN MESSAGE";
        $comment = "ERROR IN MESSAGE";
    }
    // $token = "7934196878:AAEH5zA-ksHdQZgdqQY9sRHnypLO0zODzXo"; // api телеграм бота
    // $chat_id = "-1002648016776";
    $token = "6502486274:AAFqSGBvtvutHB8be-wTlsK3ETbssmLSEWo"; // api телеграм бота
    $chat_id = "1066741091";

    $userPhone = urlencode("$userPhone");
    $userName = urlencode("$userName");
    $type = urlencode("$type");
    $date = urlencode("$date");
    $service = urlencode("$service");
    $comment = urlencode("$comment");
    

    $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" .
        "***<b>Заявка</b>***%0A" . "%0A%0A" .
        "Ім'я замовника: <b>$userName</b>%0A" . "%0A" .
        "Телефон: <b>$userPhone</b>%0A" . "%0A" .
        "Послуга: <b>$type</b>%0A" . "%0A" .
        "Дата: <b>$date</b>%0A" . "%0A%0A" .
        "Тип довідки/Лікар: <b>$service</b>%0A" . "%0A%0A" .
        "Коментар: <b>$comment</b>%0A";

    $urlQuery .= "&parse_mode=HTML";

    $result = file_get_contents($urlQuery);

    header("Location: index.html");
    exit();

?>