<?php
function handleTonerAction($action){
    $toner = new Toner();
    switch($action){
        case 'get_toners':
            return $toner->getToners();
            break;
        case 'create':
            if (isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['couleur']) && isset($_POST['compatibilite']) && isset($_POST['stock'])){
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $couleur = $_POST['couleur'];
                $compatibilite = $_POST['compatibilite'];
                $stock = $_POST['stock'];
                if (!empty($modele) && !empty($marque) && !empty($couleur) && !empty($compatibilite) && !empty($stock)){
                    $toner->setModele($modele);
                    $toner->setMarque($marque);
                    $toner->setCouleur($couleur);
                    $toner->setCompatibilite($compatibilite);
                    $toner->setStock($stock);
                    $toner->create();
                    return ['created' => true];
                }
            }
            return ['created' => false];
            break;
        case 'update':
            if (isset($_POST['id']) && isset($_POST['modele']) && isset($_POST['marque']) && isset($_POST['couleur']) && isset($_POST['compatibilite']) && isset($_POST['stock'])){
                $id = $_POST['id'];
                $modele = $_POST['modele'];
                $marque = $_POST['marque'];
                $couleur = $_POST['couleur'];
                $compatibilite = $_POST['compatibilite'];
                $stock = $_POST['stock'];
                if (!empty($id) && !empty($modele) && !empty($marque) && !empty($couleur) && !empty($compatibilite)){
                    $toner->setModele($modele);
                    $toner->setMarque($marque);
                    $toner->setCouleur($couleur);
                    $toner->setCompatibilite($compatibilite);
                    $toner->setStock($stock);
                    $toner->update($id);
                    return ['updated' => true];
                }
            }
            return ['updated' => false];
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
?>