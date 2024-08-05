<?php

class Model {
    public static function dataBase(){
        return new PDO("mysql:host=localhost;dbname=imprimante", "root", "helloworld");
    }
}