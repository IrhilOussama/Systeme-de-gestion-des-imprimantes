<?php
// header("Access-Control-Allow-Origin:  http://localhost:3000");
// header('Content-Type: application/json');
// require_once("../db/db.php");

// $stmt = $conn->query("SELECT 
// u.id, 
// u.nom, 
// id_imprimante, 
// id_departement,
// (SELECT titre FROM departements WHERE id = id_departement) as departement_titre, 
// (SELECT modele FROM imprimantes WHERE id = u.id_imprimante) as imprimante_associee 
// FROM utilisateurs u"
// );


// $utilisateurs = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
// echo $utilisateurs;
?>