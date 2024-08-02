<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header('Content-Type: application/json');
require_once('model/utilisateur.php');

// if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    if (isset($_GET['controller']) && isset($_GET['action'])){
        $action = $_GET['action'];
        switch($_GET['controller']){
            case 'utilisateur':
                $response = handleUtilisateurAction($action);
                echo json_encode($response);
                break;
            case 'imprimante':
                $response = handleImprimanteAction($action);
                echo json_encode($response);
                break;
            case 'departement':
                $response = handleDepartementAction($action);
                echo json_encode($response);
                break;
            case 'toner':
                $response = handleTonerAction($action);
                echo json_encode($response);
                break;
            default:
                break;
        }
    }
// }


function handleUtilisateurAction($action){
    require_once 'model/utilisateur.php';
    $utilisateur = new Utilisateur();
    switch($action){
        case 'get_utilisateurs':
            return $utilisateur->getUtilisateurs();
            break;
        case 'create':
            if (isset($_POST['nom']) && isset($_POST['imprimante_id']) && isset($_POST['departement_id'])){
                $nom = $_POST['nom'];
                $imp_id = $_POST['imprimante_id'];
                $dep_id = $_POST['departement_id'];
                if (!empty($nom) && !empty($imp_id) && !empty($dep_id)){
                    $utilisateur->setNom($nom);
                    $utilisateur->setIdImprimante($imp_id);
                    $utilisateur->setIdDepartement($dep_id);
                    $utilisateur->create();
                    return ['created' => true];
                }
            }
            return ['created' => false];
            break;
        case 'update':
            if (isset($_POST['id']) && isset($_POST['nom']) && isset($_POST['id_imprimante']) && isset($_POST['id_departement'])){
                $id = $_POST['id'];
                $nom = $_POST['nom'];
                $imp_id = $_POST['id_imprimante'];
                $dep_id = $_POST['id_departement'];
                if (!empty($id) && !empty($nom) && !empty($imp_id) && !empty($dep_id)){
                    $utilisateur->setNom($nom);
                    $utilisateur->setIdImprimante($imp_id);
                    $utilisateur->setIdDepartement($dep_id);
                    $utilisateur->update($id);
                    return ['update' => true];
                }
            }
            return ['update' => false];
            break;
        case 'delete': 
            if (isset($_POST['id'])){
                $id = $_POST['id'];
                if (!empty($id)){
                    $utilisateur->destroy($id);
                    return ['deleted' => true];
                }
            }
            return ['deleted' => false];
            break;
        default:
            break;
    }
}
function handleImprimanteAction($action){
    require_once 'model/imprimante.php';
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
function handleDepartementAction($action){
    require_once 'model/departement.php';
    $departement = new Departement();
    switch($action){
        case 'get_departements':
            return $departement->getDepartements();
            break;
        case 'create':
            if (isset($_POST['titre'])){
                $titre = $_POST['titre'];
                if (!empty($titre)){
                    $departement->setTitre($titre);
                    $departement->create();
                    return ['created' => true];
                }
            }
            return ['created' => false];
            break;
        case 'update':
            if (isset($_POST['titre']) && isset($_POST['id'])){
                $id = $_POST['id'];
                $titre = $_POST['titre'];
                if (!empty($titre)){
                    $departement->setTitre($titre);
                    $departement->update($id);
                    return ['update' => true];
                }
            }
            return ['update' => false];
            break;
        case 'delete': 
            if (isset($_POST['id'])){
                $id = $_POST['id'];
                if (!empty($id)){
                    $departement->destroy($id);
                    return ['deleted' => true];
                }
            }
            return ['deleted' => false];
            break;
        default:
            break;
    }
}
function handleTonerAction($action){
    require_once 'model/toner.php';
    $toner = new Toner();
    switch($action){
        case 'get_toners':
            return $toner->getToners();
            break;
        case 'create':
            if (isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['couleur']) && isset($_POST['compatibilite'])){
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $couleur = $_POST['couleur'];
                $compatibilite = $_POST['compatibilite'];
                if (!empty($modele) && !empty($marque) && !empty($couleur) && !empty($compatibilite)){
                    $toner->setModele($modele);
                    $toner->setMarque($marque);
                    $toner->setCouleur($couleur);
                    $toner->setCompatibilite($compatibilite);
                    $toner->create();
                    return ['created' => true];
                }
            }
            return ['created' => false];
            break;
        case 'update':
            if (isset($_POST['id']) && isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['couleur']) && isset($_POST['compatibilite'])){
                $id = $_POST['id'];
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $couleur = $_POST['couleur'];
                $compatibilite = $_POST['compatibilite'];
                if (!empty($id) && !empty($modele) && !empty($marque) && !empty($couleur) && !empty($compatibilite)){
                    $toner->setModele($modele);
                    $toner->setMarque($marque);
                    $toner->setCouleur($couleur);
                    $toner->setCompatibilite($compatibilite);
                    $toner->update($id);
                    return ['created' => true];
                }
            }
            return ['created' => false];
            break;
        case 'delete': 
            if (isset($_POST['id'])){
                $id = $_POST['id'];
                if (!empty($id)){
                    $toner->destroy($id);
                    return ['deleted' => true];
                }
            }
            return ['deleted' => false];
            break;
        default:
            break;
    }
}
