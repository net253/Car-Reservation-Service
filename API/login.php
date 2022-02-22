<?php
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    session_start();

    if($requestMethod == "POST"){
        if(!empty($data)){
            $username = $data -> username;
            $password = $data -> password;

            if(empty($username) || empty($password)){
                echo json_encode([ "msg" => "Username & Password is required", "state" => false ]);
                // http_response_code(400);
            }else{
                $password = md5($password);
                $sql = "SELECT * FROM t_accounts WHERE username = '$username' AND password = '$password';";
                $result = $conn -> query($sql);

                if($result->rowCount() == 1){
                    $result -> closeCursor();
                    $_SESSION['username'] = $username;
                    $_SESSION['timeout'] = time() + 1800;

                    echo json_encode([ "msg" => "login successfully.", "state" => true ]);
                    // http_response_code(200);
                }else{
                    echo json_encode([ "msg" => "login failed.", "state" => false ]);
                    // http_response_code(400);
                }
            }
        }else{
            echo json_encode([ "msg" => "username & password is required", "state" => false ]);
            // http_response_code(400);
        }
    }

?>
