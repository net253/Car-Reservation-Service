<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    if($requestMethod == "POST"){
        if(!empty($data)){
            $search = $data -> search;
        
            $sql = "SELECT*FROM t_cars_logger";

            if($search){
                $sql .= " WHERE code LIKE '%$search%' OR name LIKE '%$search%' OR cars LIKE '%$search%'";
            }
            
            $sql .= " ORDER BY id DESC ;";
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