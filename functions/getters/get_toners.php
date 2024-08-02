<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header('Content-Type: application/json');
require_once("../db/db.php");
$stmt = $conn->query("SELECT id, modele, marque, couleur, compatibilite, (SELECT modele FROM imprimantes WHERE imprimantes.id = compatibilite) as imprimante_titre FROM toners");
$toners = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
echo $toners;
?>