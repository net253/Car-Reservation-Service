<?php 
require_once("./dbconfig.php");
    session_start();
    if(isset($_SESSION['username']) && isset($_SESSION['timeout'])){
        if($_SESSION['timeout'] > time()){
            // $_SESSION['timeout'] = time() + 30;
            echo json_encode(["msg" => $_SESSION['username'], "state" => true]);
            // http_response_code(200);
        }else{
            session_destroy();
            unset($_SESSION['username']);
            unset($_SESSION['timeout']);
            echo json_encode(["msg" => "session timeout.", "state" => false]);
            // http_response_code(400);
        }
    }else{
        echo json_encode(["msg" => "session timeout.", "state" => false]);
        // http_response_code(400);
    }
?>