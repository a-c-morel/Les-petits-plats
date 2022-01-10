import { recipes } from './recipes.js';

/*VARIABLES*/

let recipesArray = recipes; //Array qui contient toutes les recettes (en tant qu'infos).
let filteredRecipes = []; //Array qui contient les recette filtrées par une recherche
let cardsArray = []; //Array qui contiendra les instances créées à partir de la classe Card (à créer), donc des objets. Cet Array devra se modifier en fonction de recipesArray, lui-même mis à jour par les recherches utilisateur, sans doute en liant l'id des recettes de recipesArray avec celui des objets de cardsArray.

const mainElement = document.querySelector("main");
const searchBar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");

const tags = document.querySelector(".tags");

/************************************************************************************************************************/

/*FONCTIONS*/

//cette fonction permet d'afficher par défaut les cartes de recettes (sans les filtrer)
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

//cette fonction sert à comparer les lettres cherchées dans la searchbar avec les textes des recettes.
function compareAndFilter(entry){
    filteredRecipes.splice(0, filteredRecipes.length);
    for (let recipe of recipesArray){
        let recipeTitle = recipe.name;
        let ingredients = recipe.ingredients;
        let recipeIngredients = [];
        ingredients.map(({ingredient}) => {
            recipeIngredients.push(`${ingredient.toLowerCase()}`);
        });
        let recipeDescription = recipe.description;
        if((recipeTitle.toLowerCase().includes(entry))||(recipeIngredients.toString().toLowerCase().includes(entry)) || (recipeDescription.toLowerCase().includes(entry)))
        filteredRecipes.push(recipe);
    }
    //console.log(filteredRecipes);
}

//cette fonction est à utiliser à la suite de compareAndFilter() : elle affiche les cartes une fois filtrées. (mise à jour de l'interface). Penser à utiliser une méthode qui clear le DOM avant.
function filteredCardsDisplay(){
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

//Cette fonction permet d'afficher les listes d'ingrédients, appareils et ustensiles en prenant soit l'array des recettes au complet, soit l'array filtré par une recherche.
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

//cette fonction permet d'afficher sous la barre de recherche un tag cliqué depuis la liste.
function createTag(elements, arrayToFill, className, cardsArray){
    for (let element of elements){
        element.addEventListener('click', (e) => {
            //console.log(e.target.innerHTML);
            const tag = document.createElement("li");
            tag.classList.add(`${className}`);
            tag.innerHTML = e.target.innerHTML;
            if(!(arrayToFill.includes(tag.outerText))){
                tags.appendChild(tag);//tags = le container <ul>
                arrayToFill.push(tag.outerText); 

                console.log(ingredientsTagsArray);
                
                for (let card of cardsArray){
                    let recipeIngredients = card.ingredients; //un array contenant des objets
                    let recipeIngredientsArray = [];
                    recipeIngredients.map(({ingredient}) => {
                        recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                    });
                    //console.log(recipeIngredientsArray);
                    //let recipeAppareil = card.appliance; //pas un array -> peut poser un pb pour l'utilisation de every() et de includes() ?
                    //let recipeUstensiles = card.ustensils; //un array

                    console.log(ingredientsTagsArray, ingredientsTagsArray.every(tag => recipeIngredientsArray.includes(tag)), card);

                    //console.log(card, (recipeIngredientsArray.includes(ingredientsTagsArray)));
                    /*if(!(recipeIngredientsArray.includes(ingredientsTagsArray))){
                        //console.log(cardsArray.indexOf(card));
                        //supprimer carte de l'array des cards
                        //cardsArray.splice(cardsArray.indexOf(card), 1);
                    }*/
                    /*if(!(appareilsTagsArray.every(appareilTag => recipeAppareil.includes(appareilTag)))){
                        //supprimer carte de l'array des cards
                        cardsArray.splice(indexOf(card), 1);
                    }
                    if(!(ustensilesTagsArray.every(ustensilTag => recipeUstensiles.includes(ustensilTag)))){
                        //supprimer carte de l'array des cards
                        cardsArray.splice(indexOf(card), 1);
                    }*/
                    //console.log(cardsArray);
                }

                
                //display à partir de l'array modifié.*/
                
            }
            //console.log(arrayToFill);
            //console.log(ingredientsTagsArray);
        });
    }
}

/*************************************************************************************************************************/

/*PAR DEFAUT, AFFICHAGE DE TOUTES LES CARTES*/
defaultDisplay();

/*RECUPERATION DES ARRAYS DE FILTRES (PAR DEFAUT = TOUS LES FILTRES)*/
//affichage des listes de filtres (non filtrés) :
displayFilters(recipesArray);

/*ACTIONS DE L'UTILISATEUR ET LEURS EFFETS SUR L'INTERFACE*/
//Cas d'utilisation : "l’utilisateur entre au moins 3 caractères dans la barre de recherche principale"
searchBar.addEventListener("keyup", (e) => { //quand l'utilisateur entre des caractères dans la searchbar
    const searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
    if(searchedLetters.length>2){
        compareAndFilter(searchedLetters);
        while (mainElement.firstChild) {
            mainElement.removeChild(mainElement.firstChild);
        }
        filteredCardsDisplay();
        displayFilters(filteredRecipes);

        const ingredientsTags = document.querySelectorAll(".ingredient-element");
        const appareilsTags = document.querySelectorAll(".appareil-element");
        const ustensilesTags = document.querySelectorAll(".ustensil-element");

        const ingredientsClassName = "ingredient-tag";
        const appareilsClassName = "appareil-tag";
        const ustensilesClassName = "ustensil-tag";

        createTag(ingredientsTags, ingredientsTagsArray, ingredientsClassName, filteredRecipes);
        createTag(appareilsTags, appareilsTagsArray, appareilsClassName, filteredRecipes);
        createTag(ustensilesTags, ustensilesTagsArray, ustensilesClassName, filteredRecipes);
    }
    if(searchedLetters.length <= 2){ //permet de redisplay les listes par défaut quand l'utilisateur efface sa recherche, notamment.
        compareAndFilter(searchedLetters);
        while (mainElement.firstChild) {
            mainElement.removeChild(mainElement.firstChild);
        }
        defaultDisplay();

        displayFilters(recipesArray);

        const ingredientsTags = document.querySelectorAll(".ingredient-element");
        const appareilsTags = document.querySelectorAll(".appareil-element");
        const ustensilesTags = document.querySelectorAll(".ustensil-element");

        const ingredientsClassName = "ingredient-tag";
        const appareilsClassName = "appareil-tag";
        const ustensilesClassName = "ustensil-tag";

        createTag(ingredientsTags, ingredientsTagsArray, ingredientsClassName, recipesArray);
        createTag(appareilsTags, appareilsTagsArray, appareilsClassName, recipesArray);
        createTag(ustensilesTags, ustensilesTagsArray, ustensilesClassName, recipesArray);
    }
});

//cas où l'utilisateur passe par les listes de filtres sans passer par la searchbar
const ingredientsTags = document.querySelectorAll(".ingredient-element");
const appareilsTags = document.querySelectorAll(".appareil-element");
const ustensilesTags = document.querySelectorAll(".ustensil-element");

const ingredientsTagsArray = []; //array qui contient les tags de type ingrédient (qui sont display en tant que filtres sous la searchbar)
const appareilsTagsArray = []; //array qui contient les tags de type appareil (qui sont display en tant que filtres sous la searchbar)
const ustensilesTagsArray = []; //array qui contient les tags de type ustensile (qui sont display en tant que filtres sous la searchbar)

const ingredientsClassName = "ingredient-tag";
const appareilsClassName = "appareil-tag";
const ustensilesClassName = "ustensil-tag";

createTag(ingredientsTags, ingredientsTagsArray, ingredientsClassName, recipesArray);
createTag(appareilsTags, appareilsTagsArray, appareilsClassName, recipesArray);
createTag(ustensilesTags, ustensilesTagsArray, ustensilesClassName, recipesArray);

/*******************************************************************************************************/

/*
Si je prends recipesArray (= l'utilisateur n'a pas effectué de recherche):

for (let recipe of recipesArray){

    let recipeIngredients = recipe.ingredients; //un array
    let recipeAppareil = recipe.appliance; //pas un array -> peut poser un pb pour l'utilisation de every() et de includes() ?
    let recipeUstensiles = recipe.ustensils; //un array

    if (!((ingredientsTagsArray.every(ingredientTag => recipeIngredients.includes(ingredientTag)))&&(appareilsTagsArray.every(appareilTag => recipeAppareil.includes(appareilTag)))&&(ustensilesTagsArray.every(ustensilTag => recipeUstensiles.includes(recipeUstensiles))))) {
        //supprimer la recette (voir comment : utiliser splice() sur l'array que j'ai utilisé comme input, puis faire un display à partir de l'array modifié ?)
    }

    //mieux écrit : 
    if (!((everyFiltersChecked(ingredientsTagsArray, recipeIngredients)) && (everyFiltersChecked(appareilsTagsArray, recipeAppareil))&& (everyFiltersChecked(ustensilesTagsArray, recipeUstensiles)))) {

        //supprimer la recette (voir comment : utiliser splice() sur l'array que j'ai utilisé comme input, puis faire un display à partir de l'array modifié ?)

    }
}

function everyFiltersChecked(tagsArray, elements) {
    return tagsArray.every(tag => elements.includes(tag));
}




Si c'est filteredRecipes (= l'utilisateur a effectué une recherche):

même procédure, il faut juste que l'input soit filteredRecipes au lieu de recipesArray.

*/