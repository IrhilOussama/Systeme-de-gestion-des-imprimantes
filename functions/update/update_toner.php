<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['id']) &&
        !empty($_POST['modele']) &&
        !empty($_POST['marque']) &&
        !empty($_POST['couleur']) &&
        !empty($_POST['compatibilite'])
        ){
            
        echo 'data entered successfuly';

        $id = $_POST['id'];
        $modele = $_POST['modele'];
        $marque = $_POST['marque'];
        $couleur = $_POST['couleur'];
        $compatibilite = $_POST['compatibilite'];

        require_once("../db/db.php");
        
        $stmt = $conn->prepare('UPDATE toners SET modele = :modele, marque = :marque, compatibilite = :compatibilite, couleur = :couleur WHERE id = :id');
        $stmt->execute([
            ':modele' => $modele,
            ':marque' => $marque,
            ':compatibilite' => $compatibilite,
            ':couleur' => $couleur,
            ':id' => $id
        ]);
    }
}

?>