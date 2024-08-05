<?php
function handleImprimanteAction($action){
    $imprimante = new Imprimante();
    switch($action){
        case 'get_imprimantes':
            return $imprimante->getImprimantes();
            break;
        case 'get_imprimantes_working':
            return $imprimante->getImprimantesWorking();
            break;
        case 'get_imprimantes_none_working':
            return $imprimante->getImprimantesWorking(true);
            break;
        case 'get_imprimantes_available':
            return $imprimante->getImprimantesAvailable();
            break;
        case 'get_imprimantes_none_available':
            return $imprimante->getImprimantesAvailable(true);
            break;
        case 'get_imprimantes_groupe':
            return $imprimante->getImprimantesGroupe();
            break;
        case 'create':
            if (isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['ip']) && isset($_POST['departement']) && isset($_POST['quantite'])){
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $ip = $_POST['ip'];
                $departement = $_POST['departement'];
                $quantite = $_POST['quantite'];
                if (!empty($modele) && !empty($marque) && !empty($departement) && !empty($quantite)){
                    if ($quantite >= 1){
                        $imprimante->setModele($modele);
                        $imprimante->setMarque($marque);
                        $imprimante->setIp($ip);
                        $imprimante->setIdDepartement($departement);
                        $imprimante->setStock($quantite);
                        $imprimante->create();
                        return ['created' => true];
                    }
                }
            }
            return ['created' => false];
            break;
        case 'update':
            if (isset($_POST['id']) && isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['ip']) && isset($_POST['departement']) && isset($_POST['quantite'])){
                $id = $_POST['id'];
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $ip = $_POST['ip'];
                $departement = $_POST['departement'];
                $quantite = $_POST['quantite'];
                if (!empty($id) && !empty($modele) && !empty($marque) && !empty($departement) && !empty($quantite)){
                    if ($quantite >= 1){
                        $imprimante->setModele($modele);
                        $imprimante->setMarque($marque);
                        $imprimante->setIp($ip);
                        $imprimante->setIdDepartement($departement);
                        $imprimante->setStock($quantite);
                        $imprimante->update($id);
                        return ['updated' => true];
                    }
                }
            }
            return ['updated' => false];
            break;
        case 'delete': 
            if (isset($_POST['id'])){
                $id = $_POST['id'];
                if (!empty($id)){
                    $imprimante->destroy($id);
                    return ['deleted' => true];
                }
            }
            return ['deleted' => false];
            break;
        default:
            break;
    }
}
?>