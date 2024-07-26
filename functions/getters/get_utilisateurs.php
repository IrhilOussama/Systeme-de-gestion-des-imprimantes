<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once("../db/db.php");

$stmt = $conn->query("SELECT u.id, u.nom, id_imprimante, (SELECT modele FROM imprimantes WHERE id = u.id_imprimante) as 
imprimante_associee FROM utilisateurs u");


$utilisateurs = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
echo $utilisateurs;
?>