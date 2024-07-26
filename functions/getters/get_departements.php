<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once("../db/db.php");
$stmt = $conn->query("SELECT d.id, d.titre, 
        (
            SELECT COUNT(*) 
            FROM imprimantes 
            WHERE departement = d.id
        ) AS nombre_imprimantes
    FROM departements d");
$departements = $stmt->fetchAll(PDO::FETCH_ASSOC);
$departements = json_encode($departements);
echo $departements;
?>