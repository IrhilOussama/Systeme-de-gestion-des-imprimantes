<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    if (!empty($_GET['id']) && !empty($_GET['table'])){
        $id = $_GET['id'];
        $table = $_GET['table'];
        require_once("./db/db.php");
        if ($table == "imprimantes") {
            // verifier que l'imprimante n'est pas reliee avec un toner ou avec un utilisateur
            $check1 = $conn->prepare('SELECT * FROM utilisateurs WHERE id_imprimante = :id_imprimante');
            $check1->execute([':id_imprimante' => $id]);
            $check2 = $conn->prepare('SELECT * FROM toners WHERE compatibilite = :id_imprimante');
            $check2->execute([':id_imprimante' => $id]);
            if ($check1->rowCount() >= 1 || $check2->rowCount() >= 1){
                echo json_encode(['deleted' => false, 'toners' => $check2->fetchAll(PDO::FETCH_ASSOC), 'utilisateurs' => $check1->fetchAll(PDO::FETCH_ASSOC)]);
            }
            else {
                $stmt = $conn->prepare("DELETE FROM imprimantes WHERE id = :id");
                $stmt->execute([':id' => $id]);
                echo json_encode(['deleted' => true]);
            }
        }
        else if ($table == "departements"){
            // verifier que la departement n'est pas reliee avec une imprimante
            $check3 = $conn->prepare('SELECT * FROM imprimantes WHERE departement = :id');
            $check3->execute([':id' => $id]);
            if ($check3->rowCount() >= 1){
                // echo json_encode(['deleted' => false,  'imprimantes' => $check3->fetchAll(PDO::FETCH_ASSOC)]);
                $stmt2 = $conn->prepare("DELETE FROM imprimantes WHERE departement = :id");
                $stmt2->execute([':id' => $id]);

                $stmt3 = $conn->prepare("DELETE FROM departements WHERE id = :id");
                $stmt3->execute([':id' => $id]);
                
                echo json_encode(['deleted' => true]);
            }
            else {
                $stmt3 = $conn->prepare("DELETE FROM departements WHERE id = :id");
                $stmt3->execute([':id' => $id]);
                
                echo json_encode(['deleted' => true]);
            }
        }
        else {
            $sql = "DELETE FROM $table WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([':id' => $id]);
            echo json_encode(['deleted' => true]);
        }
        exit;
    }
}

?>