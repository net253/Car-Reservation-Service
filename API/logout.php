<?php 
require_once("./dbconfig.php");
    session_start();
    session_destroy();
    unset($_SESSION['username']);
    unset($_SESSION['timeout']);
    if(!isset($_SESSION['username']) && !isset($_SESSION['timeout'] )){
        echo json_encode(["msg" => "logout successfully.", "state" => true ]);
        // http_response_code(200);
    }else{
        echo json_encode(["msg" => "logout failed.", "state" => false ]);
        // http_response_code(400);
    }
?>