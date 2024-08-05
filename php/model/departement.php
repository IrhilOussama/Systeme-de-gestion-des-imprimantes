<?php

require_once('model.php');

class Departement extends Model {
    private $titre;
    
    public function getDepartements(){
        $stmt = $this->dataBase()->query("SELECT * FROM departements");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function setTitre($titre){
        $this->titre = $titre;
    }

    public function update($id){
        $stmt = static::dataBase()->prepare(" UPDATE departements
        SET titre = :titre
        WHERE id = :id
        ");
        $stmt->execute([
            ':titre' => $this->titre,
            ':id' => $id
        ]);
        return true;
    }
    public function create(){
        $stmt = static::dataBase()->prepare(" INSERT INTO departements(titre)
                                                VALUES (:titre)");
        $stmt->execute([
            ':titre' => $this->titre
        ]);
        return true;
    }
    public function destroy($id){
        require_once "imprimante.php";
        $myImprimante = new Imprimante();
        $myImprimante->destroyByDep($id);
        $stmt2 = static::dataBase()->prepare("DELETE FROM utilisateurs WHERE id_departement = :id");
        $stmt2->execute([
            ':id' => $id
        ]);
        $stmt3 = static::dataBase()->prepare("DELETE FROM departements WHERE id = :id");
        $stmt3->execute([
            ':id' => $id
        ]);
    }
}