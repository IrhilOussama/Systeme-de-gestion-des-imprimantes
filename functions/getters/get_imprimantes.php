<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once("../db/db.php");
$stmt = $conn->query("SELECT imprimantes.id, modele, marque, ip, departement as departement_id, titre as departement_titre, stock FROM imprimantes, departements WHERE 
imprimantes.departement = departements.id ");
$imprimantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
$imprimantes_libre = [];
$imprimantes_occupee = [];
$imprimantes_fonctionne = [];
$imprimantes_enPanne = [];
$grouped_imprimantes = [];

foreach($imprimantes as &$imprimante){
    $grouped_imprimantes[$imprimante['departement_titre']][] = $imprimante;
    // verifier s'il y a un utilisateur associee avec cette imprimante
    $stmt2 = $conn->prepare("SELECT * FROM utilisateurs WHERE id_imprimante = :id");
    $stmt2->execute([':id' => $imprimante['id']]);
    // si oui
    if ($stmt2->rowCount() > 0){
        $utilisateurs = $stmt2->fetch(PDO::FETCH_ASSOC);
        foreach($utilisateurs as $utilisateur){
            $imprimante['utilisateurs'][] = $utilisateur;
        }
        $imprimante['status'] = $stmt2->rowCount();
        
        if ($imprimante['stock'] == $stmt2->rowCount()){
            array_push($imprimantes_occupee, $imprimante);

        }
        else {
            array_push($imprimantes_libre, $imprimante);

        }

        
    }
    else{
        $imprimante['status'] = 0;
        array_push($imprimantes_libre, $imprimante);
    }

    // verifier s'il y a un toner associee avec cette imprimante
    $stmt3 = $conn->prepare("SELECT * FROM toners WHERE compatibilite = :id");
    $stmt3->execute([':id' => $imprimante['id']]);
    // si oui
    if ($stmt3->rowCount() > 0){
        $toners = $stmt3->fetch(PDO::FETCH_ASSOC);
        $imprimante['fonctionne'] = "true";
        $imprimante['toner_id'] = $toners['id'];
        $imprimante['toner_modele'] = $toners['modele'];

        array_push($imprimantes_fonctionne, $imprimante);
    }
    else{
        $imprimante['fonctionne'] = "false";
        array_push($imprimantes_enPanne, $imprimante);
    }
}

if (isset($_GET['groupe'])){
    $imprimantes = json_encode($grouped_imprimantes);
}
else if (isset($_GET['departement'])){
    $imprimantes = json_encode($grouped_imprimantes[$_GET['departement']]);
}
elseif (isset($_GET['libre'])){
    if ($_GET['libre'] == 'true')
        $imprimantes = json_encode($imprimantes_libre);
    elseif ($_GET['libre'] == 'false')
        $imprimantes = json_encode($imprimantes_occupee);
}
else if(isset($_GET['fonctionne'])){
    if ($_GET['fonctionne'] == 'true')
        $imprimantes = json_encode($imprimantes_fonctionne);
    elseif ($_GET['fonctionne'] == 'false')
        $imprimantes = json_encode($imprimantes_enPanne);
}
else {
    $imprimantes = json_encode($imprimantes);
}

echo $imprimantes;
?>