<?php
function handleDepartementAction($action){
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
?>