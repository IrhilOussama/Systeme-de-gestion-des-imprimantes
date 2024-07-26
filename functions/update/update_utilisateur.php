<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['id']) &&
        !empty($_POST['nom']) && 
        !empty($_POST['id_imprimante']) 
        ){
            
        echo 'data entered successfuly';

        $id = $_POST['id'];
        $nom = $_POST['nom'];;
        $imprimante_associee = $_POST['id_imprimante'];;

        require_once("../db/db.php");

        $stmt = $conn->prepare('UPDATE utilisateurs SET nom = :nom, id_imprimante = :imp WHERE id = :id');
        $stmt->execute([
            ":nom" => $nom,
            ":imp" => $imprimante_associee,
            ':id' => $id
        ]);
    }
}

?>