<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    function notify_message($message, $token){
        $queryData = array('message' => $message);
        $queryData = http_build_query($queryData, '', '&');
        $headerOptions = array(
            'http' => array(
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
                    . "Authorization: Bearer " . $token . "\r\n"
                    . "Content-Length: " . strlen($queryData) . "\r\n",
                'content' => $queryData
            ),
        );
        $context = stream_context_create($headerOptions);
        $result = file_get_contents(LINE_API, FALSE, $context);
        $res = json_decode($result);
        return $res;
    }

    if($requestMethod == "GET"){
        $sql = "SELECT*FROM t_cars_status ;";
        $result = $conn -> query($sql);

        $carsStatus = array();
        while($row = $result-> fetchObject()){
            $carsStatus[] = [
                "cars" => $row -> cars, 
                "status" => new DateTime($row -> blockEnd) < new DateTime() ? true : false,
                "note" => $row -> note,
                "blockEnd" => $row -> blockEnd
                ];
        }

        echo json_encode($carsStatus);
    }

    if($requestMethod == "POST"){
        if(!empty($data)){
            $cars = $data -> cars;
            $status = $data -> status;
            $blockStart = $data -> blockStart;
            $blockEnd = $data -> blockEnd;
            $note = $data -> note;
            $datetime = (new DateTime())->format('Y-m-d H:i:s');

            $sql = "UPDATE t_cars_status SET status = '$status', blockStart = '$blockStart', blockEnd = '$blockEnd', note = '$note', datetime = '$datetime' WHERE cars = '$cars' ;";
            $result = $conn -> query($sql);
            if($result -> rowCount() > 0){
                $result -> closeCursor();
                
                if($status == "block"){
                    $msg = "\n" . "📣 ประกาศ 🚫" . "\n" .  "รถทะเบียน " . $cars . "\n" . "จะไม่สามารถใช้งานได้" . "\n\n"."ในระหว่างวันที่" . "\n" . (new DateTime($blockStart))->format('d/m/Y H:i') ." น.". "\n" . "ถึง" . "\n" . (new DateTime($blockEnd))->format('d/m/Y H:i') . " น." . "\n\n" . "หมายเหตุ " .  $note . "\n" . "ขออภัยในความไม่สะดวก" . "\n" . "ขอบคุณค่ะ 🙏" ;
                }

                if($status == "normal"){
                    $msg = "\n" . "📣 ประกาศ ✅" . "\n" .  "รถทะเบียน " . $cars . "\n" . "สามารถใช้งานได้ตามปกติ" . "\n"."ขอบคุณค่ะ 🙏" ;
                }

                notify_message($msg, $token);

                echo json_encode(['message' => 'Update Data Complete', 'state' => true]);
                // http_response_code(200);
            }else{
                echo json_encode(['message' => 'Error', 'state' => false]);
                // http_response_code(400);
            }

        }else{
            echo json_encode(['message' => 'Error', 'state' => false]);
            // http_response_code(400);
        }
    }

?>