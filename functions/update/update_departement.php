<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    if (
        !empty($_POST['id']) &&
        !empty($_POST['titre']) 
        ){
            
        echo 'data entered successfuly';

        $id = $_POST['id'];
        $titre = $_POST['titre'];;

        require_once("../db/db.php");

        $stmt = $conn->prepare('UPDATE departements SET titre = :titre WHERE id = :id');
        $stmt->execute([
            ':titre' => $titre,
            ':id' => $id
        ]);
    }
}

?>