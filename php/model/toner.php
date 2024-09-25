<?php

require_once "model.php";

class Toner extends Model{
    private $modele;
    private $marque;
    private $couleur;
    private $compatibilite;
    private $stock;

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
    public function setStock($stock){
        $this->stock = $stock;
    }

    public function getToners(){
        $stmt = static::dataBase()->query("SELECT id, modele, marque, couleur, compatibilite, stock,
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
        stock = :stock
        WHERE id = :id
        ");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':couleur' => $this->couleur,
            ':compatibilite' => $this->compatibilite,
            ':stock' => $this->stock,
            ':id' => $id
        ]);
        return true;
    }
    public function create(){
        $stmt = static::dataBase()->prepare(" INSERT INTO toners(modele, marque, couleur, compatibilite, stock)
                                                VALUES (:modele, :marque, :couleur, :compatibilite, :stock)");
        $stmt->execute([
            ':modele' => $this->modele,
            ':marque' => $this->marque,
            ':couleur' => $this->couleur,
            ':compatibilite' => $this->compatibilite,
            ':stock' => $this->stock
        ]);
        return true;
    }
    public function destroy($id){
        $stmt = static::dataBase()->prepare('DELETE FROM toners WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }

}

