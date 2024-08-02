<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['titre'])
        ){
            
        echo 'data entered successfuly';

        $titre = $_POST['titre'];

        require_once("../db/db.php");

        // verifier si la departement existe deja
        $check = $conn->prepare("SELECT * FROM departements WHERE titre = :titre");
        $check->execute([':titre' => $titre]);

        if ($check->rowCount() >= 1){
            echo "departement existe deja";
        }
        else {
            $stmt = $conn->prepare('INSERT INTO departements(titre) VALUES (:titre)');
            $stmt->execute([
                ':titre' => $titre
            ]);
        }
    }
}

?>