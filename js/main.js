import { recipes } from './recipes.js';

/*VARIABLES*/

let recipesArray = recipes; //Array qui contient toutes les recettes (en tant qu'infos).
let filteredRecipes = []; //Array qui contient les recette filtrées par une recherche

const mainElement = document.querySelector("main");
const searchBar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");

//test :
/*searchbarError.classList.add("show-error-msg");
searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."*/

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
    
        let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
        mainElement.appendChild(card.display());
    }
}

//cette fonction sert à comparer les lettres cherchées dans la searchbar avec les textes des recettes.
//en sortie on a filteredRecipe qui contient toutes les recettes qui correspondent bien à la recherche.
function compareAndFilter(entry){
    filteredRecipes.splice(0, filteredRecipes.length); //on vide l'array
    for (let recipe of recipesArray){
        let recipeTitle = recipe.name;
        let ingredients = recipe.ingredients;
        let recipeIngredients = [];
        ingredients.map(({ingredient}) => {
            recipeIngredients.push(`${ingredient.toLowerCase()}`);
        });
        let recipeDescription = recipe.description;
        if((recipeTitle.toLowerCase().includes(entry))||(recipeIngredients.toString().toLowerCase().includes(entry)) || (recipeDescription.toLowerCase().includes(entry))) {
            filteredRecipes.push(recipe);
        }        
    }
}

//cette fonction est à utiliser à la suite de compareAndFilter() : elle affiche les cartes une fois filtrées. (mise à jour de l'interface). Penser à utiliser une méthode qui clear le DOM avant.
function filteredCardsDisplay(){
    for (let filteredRecipe of filteredRecipes){
        let recipeTitle = filteredRecipe.name;
        let recipeDuration = filteredRecipe.time;
        let recipeIngredients = filteredRecipe.ingredients;
        let recipeDescription = filteredRecipe.description;
        let recipeId = filteredRecipe.id;
    
        let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
        mainElement.appendChild(card.display());
    }
}

//Cette fonction permet d'afficher les listes d'ingrédients, appareils et ustensiles en prenant soit l'array des recettes au complet, soit l'array filtré par une recherche.
function displayFilters(myArray) {

    //Je récupère les boutons (trigger)
    const ingredientFiltersBtn = document.querySelector("#ingredient-btn"); //ingredients btn
    const appareilFiltersBtn = document.querySelector("#appareil-btn"); //appareils btn
    const ustensilsFiltersBtn = document.querySelector("#ustensils-btn"); //ustensils btn

    //Je récupère les containers pour les filtres :
    const ingredientFiltersList = document.querySelector("#edit-and-select_ingredients-results"); //ingredients filters ul
    const appareilFiltersList = document.querySelector("#edit-and-select_appareil-results"); //appareil filters ul
    const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results"); //ustensils filters ul
    
    //J'instancie les arrays de filtres :
    const filtersArray = new FiltersArray(myArray);
    const ingredientsArray = filtersArray.getIngredients();
    const appareilsArray = filtersArray.getAppareils();
    const ustensilsArray = filtersArray.getUstensils();
    
    //affichage des filtres dans leur container :
    const ingredients = new FiltersList(ingredientFiltersBtn, ingredientFiltersList, ingredientsArray, "ingredient-element");
    ingredients.display();
    const appareils = new FiltersList(appareilFiltersBtn, appareilFiltersList, appareilsArray, "appareil-element");
    appareils.display();
    const ustensiles = new FiltersList(ustensilsFiltersBtn, ustensilsFiltersList, ustensilsArray, "ustensil-element");
    ustensiles.display();

    //je récupère les <li> (3 nodelist distinctes) -> ça me sert ensuite à leur ajouter des event listeners
    const ingredientsTags = document.querySelectorAll(".ingredient-element"); //node list avec les ingredients <li> qui ont été display
    const appareilsTags = document.querySelectorAll(".appareil-element"); //node list avec les appareils <li> qui ont été display
    const ustensilesTags = document.querySelectorAll(".ustensil-element"); //node list avec les ustensiles <li> qui ont été display

    //String à utiliser comme nom de classe quand on crée un tag <li> sous la searchbar (en fonction de la catégorie du tag cliqué)
    const ingredientsClassName = "ingredient-tag";
    const appareilsClassName = "appareil-tag";
    const ustensilesClassName = "ustensil-tag";

    const ingredientsTagsArray = []; //array qui va contenir les tags de type ingrédient (qui sont display sous la searchbar)
    const appareilsTagsArray = []; //array qui contient les tags de type appareil (qui sont display sous la searchbar)
    const ustensilesTagsArray = []; //array qui contient les tags de type ustensile (qui sont display sous la searchbar)*/

    for (let ingredientTag of ingredientsTags){
        ingredientTag.addEventListener('click', (e) => {
            const tag = document.createElement("li");
            tag.classList.add(`${ingredientsClassName}`);
            tag.innerHTML = e.target.innerHTML;
            if(!(ingredientsTagsArray.includes(tag.outerText))){
                tags.appendChild(tag);//tags = le container <ul>
                ingredientsTagsArray.push(tag.outerText);                
            }

            let filteredArrayByIngredients = [];
            let filteredArrayByAppareils = [];
            let filteredArrayByUstensiles = [];
             
            /*1ER FILTRAGE : Cards qui contiennent les ingrédients choisis par utilisateur*/
            for (let card of myArray) {
                let recipeIngredients = card.ingredients; //un array contenant des objets
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                });

                if(ingredientsTagsArray.every(tag => recipeIngredientsArray.includes(tag))){
                    filteredArrayByIngredients.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByIngredients){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*2D FILTRAGE : Cards qui contiennent les ingrédients + les appareils choisis par utilisateur*/
            for (let card of filteredArrayByIngredients){
                let recipeAppareil = card.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${recipeAppareil.toLowerCase()}`);
                if(appareilsTagsArray.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredArrayByAppareils.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByAppareils){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*3E FILTRAGE :  Cards qui contiennent les ingrédients ET les appareils ET les ustensiles choisis par utilisateur*/
            for (let card of filteredArrayByAppareils) {
                let recipeUstensiles = card.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${recipeUstensile.toLowerCase()}`);
                }
                if(ustensilesTagsArray.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredArrayByUstensiles.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByUstensiles){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }
            displayFilters(filteredArrayByUstensiles);
            
            //Quand utilisateur entre un mot dans searchbar =
            /*searchBar.addEventListener("keyup", (e) => {
                const searchedLetters = e.target.value.toLowerCase();
                if(searchedLetters.length>2){
                    searchbarError.classList.remove("show-error-msg");
                    searchbarError.innerHTML = "";
                    
                    monArray.splice(0, monArray.length); //on vide l'array (monArray = array avec les résultats filtrés par searchedLetters + filteredArrayByUstensiles) -> !!!! pas encore déclaré monArray : il faut que je voie où le déclarer

                    for (let recipe of filteredArrayByUstensiles){
                        let recipeTitle = recipe.name;
                        let ingredients = recipe.ingredients;
                        let recipeIngredients = [];
                        ingredients.map(({ingredient}) => {
                            recipeIngredients.push(`${ingredient.toLowerCase()}`);
                        });
                        let recipeDescription = recipe.description;
                        if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters))) {
                            //monArray.push(recipe);
                        }
                    }
                    if(filteredRecipes.length == 0){
                        searchbarError.classList.add("show-error-msg");
                        searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
                    }
                    while (mainElement.firstChild) {
                        mainElement.removeChild(mainElement.firstChild);
                    }
                    //filteredCardsDisplay(monArray); ????
                    //displayFilters(monArray);
                }
                if(searchedLetters.length <= 2){
                    //dans ce cas il faut simplement faire le display à partir de filteredArrayByUstensiles
                }
                
            });*/

        });
    }
    for (let appareilTag of appareilsTags){
        appareilTag.addEventListener('click', (e) => {
            const tag = document.createElement("li");
            tag.classList.add(`${appareilsClassName}`);
            tag.innerHTML = e.target.innerHTML;
            if(!(appareilsTagsArray.includes(tag.outerText))){
                tags.appendChild(tag);//tags = le container <ul>
                appareilsTagsArray.push(tag.outerText);                
            }

            let filteredArrayByIngredients = [];
            let filteredArrayByAppareils = [];
            let filteredArrayByUstensiles = [];

            /*1ER FILTRAGE : Cards qui contiennent les ingrédients choisis par utilisateur*/
            for (let card of myArray) {
                let recipeIngredients = card.ingredients; //un array contenant des objets
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                });

                if(ingredientsTagsArray.every(tag => recipeIngredientsArray.includes(tag))){
                    filteredArrayByIngredients.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByIngredients){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*2D FILTRAGE : Cards qui contiennent les ingrédients + les appareils choisis par utilisateur*/
            for (let card of filteredArrayByIngredients){
                let recipeAppareil = card.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${recipeAppareil.toLowerCase()}`);
                if(appareilsTagsArray.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredArrayByAppareils.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByAppareils){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*3E FILTRAGE :  Cards qui contiennent les ingrédients ET les appareils ET les ustensiles choisis par utilisateur*/
            for (let card of filteredArrayByAppareils) {
                let recipeUstensiles = card.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${recipeUstensile.toLowerCase()}`);
                }
                if(ustensilesTagsArray.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredArrayByUstensiles.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByUstensiles){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }
            displayFilters(filteredArrayByUstensiles);

            /*Quand utilisateur entre un mot dans searchbar =
                filteredArrayByUstensiles + mot cherché -> filtrer cards
            */

        });
    }
    for (let ustensileTag of ustensilesTags){
        ustensileTag.addEventListener('click', (e) => {
            const tag = document.createElement("li");
            tag.classList.add(`${ustensilesClassName}`);
            tag.innerHTML = e.target.innerHTML;
            if(!(ustensilesTagsArray.includes(tag.outerText))){
                tags.appendChild(tag);//tags = le container <ul>
                ustensilesTagsArray.push(tag.outerText);                
            }

            let filteredArrayByIngredients = [];
            let filteredArrayByAppareils = [];
            let filteredArrayByUstensiles = [];

            /*1ER FILTRAGE : Cards qui contiennent les ingrédients choisis par utilisateur*/
            for (let card of myArray) {
                let recipeIngredients = card.ingredients; //un array contenant des objets
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                });

                if(ingredientsTagsArray.every(tag => recipeIngredientsArray.includes(tag))){
                    filteredArrayByIngredients.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByIngredients){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*2D FILTRAGE : Cards qui contiennent les ingrédients + les appareils choisis par utilisateur*/
            for (let card of filteredArrayByIngredients){
                let recipeAppareil = card.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${recipeAppareil.toLowerCase()}`);
                if(appareilsTagsArray.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredArrayByAppareils.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByAppareils){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }

            /*3E FILTRAGE :  Cards qui contiennent les ingrédients ET les appareils ET les ustensiles choisis par utilisateur*/
            for (let card of filteredArrayByAppareils) {
                let recipeUstensiles = card.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${recipeUstensile.toLowerCase()}`);
                }
                if(ustensilesTagsArray.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredArrayByUstensiles.push(card);
                }
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            for (let myCard of filteredArrayByUstensiles){
                let recipeTitle = myCard.name;
                let recipeDuration = myCard.time;
                let recipeIngredients = myCard.ingredients;
                let recipeDescription = myCard.description;
                let recipeId = myCard.id;
            
                let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, recipeId, mainElement);
                mainElement.appendChild(card.display());
            }
            displayFilters(filteredArrayByUstensiles);

            /*Quand utilisateur entre un mot dans searchbar =
                filteredArrayByUstensiles + mot cherché -> filtrer cards
            */

        });
    }

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

/*************************************************************************************************************************/

/*PAR DEFAUT, AFFICHAGE DE TOUTES LES CARTES*/
defaultDisplay();

/*RECUPERATION DES ARRAYS DE FILTRES (PAR DEFAUT = TOUS LES FILTRES)*/
//cas où l'utilisateur passe par les listes de filtres sans passer par la searchbar
//affichage des listes de filtres (non filtrés) :
displayFilters(recipesArray);

/*ACTIONS DE L'UTILISATEUR ET LEURS EFFETS SUR L'INTERFACE*/
//Cas d'utilisation : "l’utilisateur entre au moins 3 caractères dans la barre de recherche principale"
searchBar.addEventListener("keyup", (e) => { //quand l'utilisateur entre des caractères dans la searchbar
    const searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
    const isTags = document.querySelector(".tags");
    if(isTags.children.length == 0) { //permet de n'appliquer l'event listener sur recipesArray que lorsque l'utilisateur n'a pas sélectionné de tags au préalable
        if(searchedLetters.length>2){
            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";
            compareAndFilter(searchedLetters);
            if(filteredRecipes.length == 0){
                searchbarError.classList.add("show-error-msg");
                searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
            }
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            filteredCardsDisplay();
            displayFilters(filteredRecipes); 
        }
        if(searchedLetters.length <= 2){ //permet de redisplay les listes par défaut quand l'utilisateur efface sa recherche, notamment.
            compareAndFilter(searchedLetters);
            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            }
            defaultDisplay();
            displayFilters(recipesArray);
        }
    }
});







