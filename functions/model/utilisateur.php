<?php

require_once('model.php');

class Utilisateur extends Model {
    private $nom;
    private $id_imprimante;
    private $id_departement;
    
    public function getUtilisateurs(){
        $stmt = static::dataBase()->query('SELECT 
                                            u.id, 
                                            u.nom, 
                                            id_imprimante, 
                                            id_departement,
                                            (SELECT titre FROM departements WHERE id = id_departement) as departement_titre, 
                                            (SELECT modele FROM imprimantes WHERE id = u.id_imprimante) as imprimante_associee 
                                            FROM utilisateurs u');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findUtilisateur($id){
        $stmt = static::dataBase()->prepare('SELECT * FROM utilisateurs WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function setNom($nom){
        $this->nom = $nom;
    }

    public function setIdImprimante($id){
        $this->id_imprimante = $id;
    }

    public function setIdDepartement($id){
        $this->id_departement = $id;
    }
    public function update($id){
        $stmt = static::dataBase()->prepare(" UPDATE utilisateurs
        SET nom = :nom,
        id_imprimante = :id_imprimante,
        id_departement = :id_departement
        WHERE id = :id
        ");
        $stmt->execute([
            ':nom' => $this->nom,
            ':id_imprimante' => $this->id_imprimante,
            ':id_departement' => $this->id_departement,
            ':id' => $id
        ]);
        return true;
    }
    public function create(){
        $stmt = static::dataBase()->prepare(" INSERT INTO utilisateurs(nom, id_imprimante, id_departement)
                                                VALUES (:nom, :id_imprimante, :id_departement)");
        $stmt->execute([
            ':nom' => $this->nom,
            ':id_imprimante' => $this->id_imprimante,
            ':id_departement' => $this->id_departement
        ]);
        return true;
    }
    public function destroy($id){
        $stmt = static::dataBase()->prepare('DELETE FROM utilisateurs WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}