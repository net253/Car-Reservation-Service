<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    if($requestMethod == "POST"){
        if(!empty($data)){
            $action = $data -> action;
            $email = $data -> email;
            $username = $data -> username;
            $password = md5($data -> password);
            $devCode = md5($data -> devCode);
            $devHash = "0e34d19a969f9cce0503c8e90694cf74";

            if($action == "update"){
                $sql = "UPDATE t_accounts SET password = '$password' WHERE username = '$username';";
            }

            // if($action == "add"){
            //     $sql = "INSERT INTO t_accounts ('username','password','email') VALUES ('$username','$password','$email');";
            // }

            // if($action == "remove"){
            //     $sql = "DELETE FROM t_accounts WHERE username = '$username' AND password = '$password';";
            // }

            if($devCode == $devHash){
                $result = $conn -> query($sql);
                if($result -> rowCount() > 0){
                    echo json_encode(["msg" => "Add or Update Complete ", "state" => true]);
                    http_response_code(200);
                }else{
                    echo json_encode(['message' => 'Error', 'state' => false]);
                    http_response_code(400);
                }
                $result -> closeCursor();
            }else{
                echo json_encode(['message' => 'Error', 'state' => false]);
                http_response_code(400);
            }
            
        }else{
            echo json_encode(['message' => 'Error', 'state' => false]);
            http_response_code(400);
        }
    }
?>