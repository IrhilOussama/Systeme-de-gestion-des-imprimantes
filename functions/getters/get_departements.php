<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header('Content-Type: application/json');
require_once("../db/db.php");
$stmt = $conn->query("SELECT d.id, d.titre FROM departements d");
$departements = $stmt->fetchAll(PDO::FETCH_ASSOC);
$departements = json_encode($departements);
echo $departements;
?>