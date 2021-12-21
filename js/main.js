import { recipes } from './recipes.js';

let recipesArray = recipes; //Array qui contient toutes les recettes (en tant qu'infos).
let filteredRecipes = []; //Array qui contient les recette filtrées par une recherche
let cardsArray = []; //Array qui contiendra les instances créées à partir de la classe Card (à créer), donc des objets. Cet Array devra se modifier en fonction de recipesArray, lui-même mis à jour par les recherches utilisateur, sans doute en liant l'id des recettes de recipesArray avec celui des objets de cardsArray.

const mainElement = document.querySelector("main");

/*PAR DEFAUT, AFFICHAGE DE TOUTES LES CARTES*/

defaultDisplay();

/*RECUPERATION DES ARRAYS DE FILTRES (PAR DEFAUT = TOUS LES FILTRES)*/
//boutons pour afficher les listes de filtres :
displayFilters(recipesArray);

/*ACTIONS DE L'UTILISATEUR ET LEURS EFFETS SUR L'INTERFACE*/
//Cas d'utilisation : "l’utilisateur entre au moins 3 caractères dans la barre de recherche principale"
//je récupère la barre de recherche et la zone pour le message d'erreur
const searchBar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");//

searchBar.addEventListener("keyup", (e) => { //quand l'utilisateur entre des caractères dans la searchbar
    const searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
    if(searchedLetters.length>2){
        compareAndFilter(searchedLetters);
        filteredCardsDisplay();
        displayFilters(filteredRecipes);
    }
});

/*FONCTIONS*/

function defaultDisplay(){
    for (let recipe of recipesArray) {
        let recipeTitle = recipe.name;
        let recipeDuration = recipe.time;
        let recipeIngredients = recipe.ingredients;
        let recipeDescription = recipe.description;
        let recipeId = recipe.id;
    
        let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement, cardsArray);
        mainElement.appendChild(card.display());
    }
}

function compareAndFilter(searchedLetters){
    filteredRecipes.splice(0, filteredRecipes.length);
    for (let recipe of recipesArray){
        let recipeTitle = recipe.name;
        let ingredients = recipe.ingredients;
        let recipeIngredients = [];
        ingredients.map(({ingredient}) => {
            recipeIngredients.push(`${ingredient.toLowerCase()}`);
        });
        let recipeDescription = recipe.description;
        if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters)))
        filteredRecipes.push(recipe);
    }
}

function filteredCardsDisplay(){
    while (mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }
    for (let filteredRecipe of filteredRecipes){
        let recipeTitle = filteredRecipe.name;
        let recipeDuration = filteredRecipe.time;
        let recipeIngredients = filteredRecipe.ingredients;
        let recipeDescription = filteredRecipe.description;
        let recipeId = filteredRecipe.id;
    
        let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement, cardsArray);
        mainElement.appendChild(card.display());
    }
}

function displayFilters(myArray){
    const ingredientFiltersBtn = document.querySelector("#ingredient-btn"); //ingredients btn
    const appareilFiltersBtn = document.querySelector("#appareil-btn"); //appareils btn
    const ustensilsFiltersBtn = document.querySelector("#ustensils-btn"); //ustensils btn
    //containers pour les filtres :
    const ingredientFiltersList = document.querySelector("#edit-and-select_ingredients-results"); //ingredients filters ul
    const appareilFiltersList = document.querySelector("#edit-and-select_appareil-results"); //appareil filters ul
    const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results"); //ustensils filters ul
    //arrays de filtres :
    const filtersArray = new FiltersArray(myArray);
    const ingredientsArray = filtersArray.getIngredients();
    const appareilsArray = filtersArray.getAppareils();
    const ustensilsArray = filtersArray.getUstensils();
    //affichage des filtres :
    const ingredients = new FiltersList(ingredientFiltersBtn, ingredientFiltersList, ingredientsArray, "ingredient-element");
    ingredients.display();
    const appareils = new FiltersList(appareilFiltersBtn, appareilFiltersList, appareilsArray, "appareil-element");
    appareils.display();
    const ustensiles = new FiltersList(ustensilsFiltersBtn, ustensilsFiltersList, ustensilsArray, "ustensil-element");
    ustensiles.display();

    /*Quans clic sur un bouton = montrer les filtres, quand clic à l'extérieur de la liste = cacher la liste*/
    document.addEventListener('click', (e) => {
        if (e.target.closest("#ingredient-btn")) {
            showList(ingredientFiltersBtn, ingredientFiltersList);
        } else {
            hideList(ingredientFiltersBtn, ingredientFiltersList);
        }
        if (e.target.closest("#appareil-btn")) {
            showList(appareilFiltersBtn, appareilFiltersList);
        } else {
            hideList(appareilFiltersBtn, appareilFiltersList);
        }
        if (e.target.closest("#ustensils-btn")) {
            showList(ustensilsFiltersBtn, ustensilsFiltersList);
        } else {
            hideList(ustensilsFiltersBtn, ustensilsFiltersList);
        }
    });
}

function showList(btn, list){
    list.classList.add("show-filters");
    list.classList.add("row");
    btn.classList.add("w-50");
}

function hideList(btn, list){
    list.classList.remove("show-filters");
    list.classList.remove("row");
    btn.classList.remove("w-50");
}

/*ZONE DE TESTS*/

/*ZONE DE TESTS*/