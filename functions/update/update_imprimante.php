<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['id']) &&
        !empty($_POST['modele']) &&
        !empty($_POST['marque']) &&
        !empty($_POST['ip']) &&
        !empty($_POST['departement']) &&
        !empty($_POST['quantite'])
        ){
            
        echo 'data entered successfuly';

        $id = $_POST['id'];
        $modele = $_POST['modele'];
        $marque = $_POST['marque'];
        $ip = $_POST['ip'];
        $departement = $_POST['departement'];
        $quantite = $_POST['quantite'];

        require_once("../db/db.php");
        echo $id;
        $stmt = $conn->prepare('UPDATE imprimantes SET modele = :modele, marque = :marque, departement = :departement, stock = :stock, ip = :ip WHERE id = :id');
        $stmt->execute([
            ':modele' => $modele,
            ':marque' => $marque,
            ':departement' => $departement,
            ':stock' => $quantite,
            ':ip' => $ip,
            ':id' => $id
        ]);
    }
}

?>