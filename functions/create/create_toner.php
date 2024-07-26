<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['modele']) &&
        !empty($_POST['marque']) &&
        !empty($_POST['couleur']) &&
        !empty($_POST['compatibilite'])
        ){
            
        echo 'data entered successfuly to create_toner.php';


        $modele = $_POST['modele'];
        $marque = $_POST['marque'];
        $couleur = $_POST['couleur'];
        $compatibilite= $_POST['compatibilite'];

        require_once("../db/db.php");

        // verifier si la toner existe deja
        $check = $conn->prepare("SELECT * FROM toners WHERE modele = :modele");
        $check->execute([':modele' => $modele]);

        if ($check->rowCount() >= 1){
            echo "toner existe deja";
        }
        else {
            $stmt = $conn->prepare('INSERT INTO toners(modele, marque, couleur, compatibilite) VALUES (:modele, :marque, :couleur, :compatibilite)');
            $stmt->execute([
                ':modele' => $modele,
                ':marque' => $marque,
                ':couleur' => $couleur,
                ':compatibilite' => $compatibilite,
            ]);
        }
    }
}

?>