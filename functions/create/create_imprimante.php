<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['modele']) &&
        !empty($_POST['marque']) &&
        !empty($_POST['ip']) &&
        !empty($_POST['departement']) &&
        !empty($_POST['quantite'])
        ){
            
        echo 'data entered successfuly';

        $modele = $_POST['modele'];
        $marque = $_POST['marque'];
        $ip = $_POST['ip'];
        $departement = $_POST['departement'];
        $quantite = $_POST['quantite'];

        require_once("../db/db.php");

        // verifier si l'imprimante existe deja
        $check = $conn->prepare("SELECT * FROM imprimantes WHERE modele = :modele");
        $check->execute([':modele' => $modele]);

        if ($check->rowCount() >= 1){
            $stmt = $conn->prepare('UPDATE imprimantes SET stock = stock + :new_quantite WHERE modele = :modele');
            $stmt->execute([':new_quantite' => $quantite, ':modele' => $modele]);
        }
        else {
            $stmt = $conn->prepare('INSERT INTO imprimantes(modele, marque, departement, stock, ip) VALUES (:modele, :marque,  :departement, :stock, :ip)');
            $stmt->execute([
                ':modele' => $modele,
                ':marque' => $marque,
                ':departement' => $departement,
                ':stock' => $quantite,
                ':ip' => $ip
            ]);
        }
    }
}

?>