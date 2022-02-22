<?php 
    require_once("./dbconfig.php");
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    if($requestMethod == "POST"){
        if(!empty($data)){
            $id = $data -> id; 
            $cars = $data -> cars;
            $name = $data -> name;
            $code = $data -> code;
            $agent = $data -> agent;
            $tel = $data -> tel;
            $datetime = (new DateTime())->format('Y-m-d H:i:s');
            $datetimeUse = $data -> datetimeUse;
            $datetimeReturn = $data -> datetimeReturn;
            $purpose = $data -> purpose;
            $action = "Edit";
            $parking = "-";	

            $sqlUpdate = "UPDATE t_cars SET name='$name',agent='$agent',tel='$tel',purpose='$purpose'  WHERE id='$id' AND code='$code';";
            $sqlInsert =" INSERT INTO t_cars_logger (cars,name,code,agent,tel,datetime,datetimeUse,datetimeReturn,purpose,action,parking) 
                VALUES ('$cars','$name','$code','$agent','$tel','$datetime','$datetimeUse','$datetimeReturn','$purpose','$action','$parking');";
            
            $resultUpdate = $conn -> query($sqlUpdate);
            
            if ($resultUpdate -> rowCount() > 0) {
                $resultUpdate -> closeCursor();
                $resultInsert = $conn -> query($sqlInsert);
                if ($resultInsert -> rowCount() > 0) {
                    $resultInsert -> closeCursor();
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
        }else{
            echo json_encode(['message' => 'Error', 'state' => false]);
            // http_response_code(400);
        }
    }
?>