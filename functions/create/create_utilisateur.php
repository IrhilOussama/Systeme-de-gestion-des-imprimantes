<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['nom']) &&
        !empty($_POST['imprimante_id'])
        ){
            
        echo 'data entered successfuly';

        $nom = $_POST['nom'];
        $imprimante_id = $_POST['imprimante_id'];

        require_once("../db/db.php");

        // verifier si la utilisateur existe deja
        $check = $conn->prepare("SELECT * FROM utilisateurs WHERE nom = :nom");
        $check->execute([':nom' => $nom]);

        if ($check->rowCount() >= 1){
            echo "utilisateur existe deja";
        }
        else {
            $stmt = $conn->prepare('INSERT INTO utilisateurs(nom, id_imprimante) VALUES (:nom, :imprimante_id)');
            $stmt->execute([
                ':nom' => $nom,
                ':imprimante_id' => $imprimante_id
            ]);
        }
    }
}

?>