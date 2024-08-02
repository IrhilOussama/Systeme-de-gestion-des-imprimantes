<?php
header("Access-Control-Allow-Origin:  http://localhost:3000");
header('Content-Type: application/json');


if (isset($_GET['controller']) && isset($_GET['action'])){
    $action = $_GET['action'];
    switch($_GET['controller']){
        case 'utilisateur':
            require_once('model/utilisateur.php');
            require_once "./controllers/utilisateurController.php";
            $response = handleUtilisateurAction($action);
            echo json_encode($response);
            break;
        case 'imprimante':
            require_once 'model/imprimante.php';
            require_once "./controllers/imprimanteController.php";
            $response = handleImprimanteAction($action);
            echo json_encode($response);
            break;
        case 'departement':
            require_once 'model/departement.php';
            require_once "./controllers/departementController.php";
            $response = handleDepartementAction($action);
            echo json_encode($response);
            break;
        case 'toner':
            require_once 'model/toner.php';
            require_once "./controllers/tonerController.php";
            $response = handleTonerAction($action);
            echo json_encode($response);
            break;
        default:
            break;
    }
}





