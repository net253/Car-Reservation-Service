<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    if($requestMethod == "POST"){
        if(!empty($data)){
            $code = $data -> code;
            $sql = "SELECT*FROM t_cars";

            if($code){
                $sql .= " WHERE code = '$code'";
            }
            
            $sql .= " ORDER BY datetimeUse ASC ;";
            $result = $conn->query($sql);
            $userBooking = array();
            while($row = $result -> fetchObject()){
                $userBooking[] = $row;
            }

            $result -> closeCursor();
            echo json_encode($userBooking);
            // http_response_code(200);
        }else{
            echo json_encode(['message' => 'Error', 'state' => false]);
            // http_response_code(400);
        }
    }
?>