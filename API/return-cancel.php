<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);


    function msg_line_notify($datetime, $cars, $conn){
        $dateUse = substr($datetime,0,10);
        $sqlLineNotify = "SELECT*FROM t_cars WHERE cars = '$cars' 
                            AND (datetimeUse BETWEEN '$dateUse 00:00:00' AND '$dateUse 23:59:59') ORDER BY datetimeUse ASC;";
        
        $totalBooking = $conn -> query($sqlLineNotify);
        
        $resultTotalBooking = array();
        while($row = $totalBooking->fetchObject()){
            $resultTotalBooking[] = $row;
        }
        $totalBooking -> closeCursor();
        $msgLineNotify = "\n"."รถทะเบียน ". $cars . "\n"  . "วันที่ " . (new DateTime($dateUse))->format('d/m/Y') . "\n\n" . "คิวจองรถ 📌" . "\n" ;
        $i = 0;
        while($i < count($resultTotalBooking)){
            $name = $resultTotalBooking[$i] -> name;
            $timeStart = $resultTotalBooking[$i] -> datetimeUse;
            $timeEnd = $resultTotalBooking[$i] -> datetimeReturn;
            $msgLineNotify .= substr($timeStart,11,5) ." - ". substr($timeEnd,11,5) . " น." . " (" . explode(" ", $name)[0] . ")" .   "\n";
            $i++;
        }

        $msgLineNotify .= "\n". "ต้องการจองรถ ⤵". "\n" . webUrl;

        return $msgLineNotify;                    
    }

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

    if($requestMethod == "POST"){
        if(!empty($data)){
            $cars = $data -> cars;
            $name = $data -> name;
            $code = $data -> code;
            $agent = $data -> agent;
            $tel = $data -> tel;
            $datetime = (new DateTime())->format('Y-m-d H:i:s');
            $datetimeUse = $data -> datetimeUse;
            $datetimeReturn = $data -> datetimeReturn;
            $purpose = $data -> purpose;
            $action = $data -> action;
            $parking = $data -> parking;

            $sql = "DELETE FROM t_cars WHERE code = '$code' AND datetimeUse = '$datetimeUse';
                    INSERT INTO t_cars_logger (cars,name,code,agent,tel,datetime,datetimeUse,datetimeReturn,purpose,action,parking) 
                    VALUES ('$cars','$name','$code','$agent','$tel','$datetime','$datetimeUse','$datetimeReturn','$purpose','$action', '$parking');";

            $result = $conn -> query($sql);

            if($result -> rowCount() > 0){
                $result -> closeCursor();
                $msg = msg_line_notify($datetimeUse, $cars, $conn);
                notify_message($msg, $token);
                
                if($action == "returned"){
                    $msgRetrun = "\n" . "📣 ประกาศ ✅" . "\n". "ผู้ใช้รถทะเบียน " . $cars . "\n" ."ได้ทำการคืนกุญแจแล้ว" . "\n" . "คิวต่อไปสามารถใช้รถได้แล้วค่ะ";
                    notify_message($msgRetrun, $token);
                }

                echo json_encode(['message' => 'Insert Data Complete', 'state' => true]);
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