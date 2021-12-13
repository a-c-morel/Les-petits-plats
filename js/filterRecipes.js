class FilterRecipes{
    constructor(searchedLetters, recipesArray){
        this.searchedLetters = searchedLetters;
        this.recipesArray = recipesArray;
        this.filteredArray = [];
    }
    compareAndFilter(){
        //pour comparer l'entrée utilisateur avec chaque recette de recipesArray avec une boucle for (version 1 du projet), et envoyer les recettes pertinentes dans this.filteredArray
        /*
        - Soit je push la recette dans this.filteredArray à chaque fois que les lettres sont présentes (titre, ingredients et description) et je fais un Set ensuite pour enlever les doublons, puis je reconvertis en array à partir du Set
        - Soit j'utilise l'opérateur || pour dire "ou dans le titre, ou dans les ingrédients, ou dans la description" mais j'ai peur que ce soit complexe à écrire et qu'on ne s'y retrouve pas bien
        */
    }
    result(){
        //Refresh this.recipesArray en écrivant this.recipesArray = this.filteredArray, puis return this.recipesArray mis à jour
    }
}