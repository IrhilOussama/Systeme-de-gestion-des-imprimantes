<?php
function handleUtilisateurAction($action){
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
?>