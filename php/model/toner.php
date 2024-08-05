<?php

require_once "model.php";

class Toner extends Model{
    private $modele;
    private $marque;
    private $couleur;
    private $compatibilite;
    private $niveau;

    public function setModele($modele){
        $this->modele = $modele;
    }
    public function setMarque($marque){
        $this->marque = $marque;
    }
    public function setCouleur($couleur){
        $this->couleur = $couleur;
    }
    public function setCompatibilite($compatibilite){
        $this->compatibilite = $compatibilite;
    }
    public function setNiveau($niveau){
        $this->niveau = $niveau;
    }

    public function getToners(){
        $stmt = static::dataBase()->query("SELECT id, modele, marque, couleur, compatibilite, niveau,
        (SELECT modele 
        FROM imprimantes 
        WHERE imprimantes.id = compatibilite) as imprimante_titre 
        FROM toners");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id){
        $stmt = static::dataBase()->prepare(" UPDATE toners
        SET modele = :modele,
        marque = :marque,
        couleur = :couleur,
        compatibilite = :compatibilite,
        niveau = :niveau
        WHERE id = :id
        ");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':couleur' => $this->couleur,
            ':compatibilite' => $this->compatibilite,
            ':niveau' => $this->niveau,
            ':id' => $id
        ]);
        return true;
    }
    public function create(){
        $stmt = static::dataBase()->prepare(" INSERT INTO toners(modele, marque, couleur, compatibilite, niveau)
                                                VALUES (:modele, :marque, :couleur, :compatibilite, :niveau)");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':couleur' => $this->couleur,
            ':compatibilite' => $this->compatibilite,
            ':niveau' => $this->niveau
        ]);
        return true;
    }
    public function destroy($id){
        $stmt = static::dataBase()->prepare('DELETE FROM toners WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }

}

