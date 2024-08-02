<?php

require_once("model.php");

class Imprimante extends Model{
    private $modele;
    private $marque;
    private $ip;
    private $id_departement;
    private $stock;

    public function setModele($modele){
        $this->modele = $modele;
    }
    public function setMarque($marque){
        $this->marque = $marque;
    }
    public function setIp($ip){
        $this->ip = $ip;
    }
    public function setIdDepartement($id_departement){
        $this->id_departement = $id_departement;
    }
    public function setStock($stock){
        $this->stock = $stock;
    }
    public function update($id){
        $stmt = static::dataBase()->prepare(" UPDATE imprimantes
        SET modele = :modele,
        marque = :marque,
        ip = :ip,
        departement = :id_departement,
        stock = :stock
        WHERE id = :id
        ");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':ip' => $this->ip,
            ':id_departement' => $this->id_departement,
            ':stock' => $this->stock,
            ':id' => $id
        ]);
        return true;
    }
    public function create(){
        $stmt = static::dataBase()->prepare(" INSERT INTO imprimantes(modele, marque, ip, departement, stock)
                                                VALUES (:modele, :marque, :ip, :id_departement, :stock)");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':ip' => $this->ip,
            ':id_departement' => $this->id_departement,
            ':stock' => $this->stock
        ]);
        return true;
    }
    
    public function getImprimantes(){
        $stmt = $this->dataBase()->query('SELECT 
            imprimantes.id, 
            modele, 
            marque, 
            ip, 
            departement as departement_id,
            titre as departement_titre, 
            stock 
            FROM imprimantes, departements 
            WHERE imprimantes.departement = departements.id 
        ');
        $imprimantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($imprimantes as &$imp){
            if ($this->haveUser($imp['id'])){
                $imp['utilisateurs'] = $this->haveUser($imp['id']);
                $imp['status'] = count($imp['utilisateurs']);
            }
            else {
                $imp['status'] = 0;
                $imp['utilisateurs'] = '';
            }
            $imp['toner'] = $this->haveToner($imp['id']);
        }
        return $imprimantes;
    }

    public function haveUser($id){
        $stmt = $this->dataBase()->prepare('SELECT * FROM utilisateurs WHERE id_imprimante = :id');
        $stmt->execute([':id' => $id]);
        if ($stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        else {
            return '';
        }
    }

    public function haveToner($id){
        $stmt = $this->dataBase()->prepare('SELECT * FROM toners WHERE compatibilite = :id');
        $stmt->execute([':id' => $id]);
        if ($stmt->rowCount() > 0){
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
        else {
            return false;
        }
    }
    
    public function getImprimantesWorking($opposite = false){
        $imprimantes = $this->getImprimantes();
        $new_imprimantes = [];
        foreach($imprimantes as &$imp){
            if ($imp['toner'] && !$opposite){
                array_push($new_imprimantes, $imp);
            }
            if (!$imp['toner'] && $opposite){
                array_push($new_imprimantes, $imp);
            }
        }
        return $new_imprimantes;
    }


    public function getImprimantesAvailable($opposite = false){
        $imprimantes = $this->getImprimantes();
        $new_imprimantes = [];
        foreach($imprimantes as &$imp){
            if ($imp['status'] < $imp['stock'] && !$opposite ){
                array_push($new_imprimantes, $imp);
            }
            elseif ($imp['status'] === $imp['stock'] && $opposite ){
                array_push($new_imprimantes, $imp);
            }
        }
        return $new_imprimantes;
    }

    public function getImprimantesGroupe(){
        $imprimantes = $this->getImprimantes();
        $new_imprimantes = [];
        foreach($imprimantes as &$imp){
            $new_imprimantes[$imp['departement_titre']][] = $imp;
        }
        return $new_imprimantes;
    }

    public function destroy($id){
        
        if ($this->haveToner($id)){
            $stmt = static::dataBase()->prepare('DELETE FROM toners WHERE compatibilite = :id');
            $stmt->execute([':id' => $id]);
        }
        if ($this->haveUser($id)){
            $stmt = static::dataBase()->prepare('DELETE FROM utilisateurs WHERE id_imprimante = :id');
            $stmt->execute([':id' => $id]);
        }
        $stmt = static::dataBase()->prepare('DELETE FROM imprimantes WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
    public function destroyByDep($id){
        $stmt = static::dataBase()->prepare('SELECT * FROM imprimantes WHERE departement = :id');
        $stmt->execute([':id' => $id]);
        $imprimantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($imprimantes as &$imp){
            $this->destroy($imp['id']);
        }
    }
}