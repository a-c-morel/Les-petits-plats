import { recipes } from './recipes.js';

/*DISPLAY THE CARDS*/
const recipesContainer = document.querySelector("main");
const cardsRecipes = [];

for (const recipe of recipes){
    let myCard = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description);
    cardsRecipes.push(myCard);
}

cardsRecipes.forEach(recipe =>{
    recipesContainer.appendChild(recipe.display());
});

/*DISPLAY THE FILTERS LIST FOR THE BUTTONS*/

const ingredientFiltersBtn = document.querySelector("#ingredient-btn");
const appareilFiltersBtn = document.querySelector("#appareil-btn");
const ustensilsFiltersBtn = document.querySelector("#ustensils-btn");
const ingredientFiltersList = document.querySelector("#edit-and-select_ingredients-results");
const appareilFiltersList = document.querySelector("#edit-and-select_appareil-results");
const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results");

//Get the list of all the ingredients (without duplicate)
const allIngredients = [];
for (let i=0; i<recipes.length; i++) {
    let ingredients = recipes[i].ingredients;
    ingredients.map(({ingredient}) => {
        allIngredients.push(`${ingredient.toLowerCase()}`);
    });
}
const ingredientsNoRepeat = new Set(allIngredients);
const ingredientFiltersArray = Array.from(ingredientsNoRepeat);

//Get the list of all the appareils (without duplicate)
const allAppareils = [];
for (let i=0; i<recipes.length; i++) {
    let appareils = recipes[i].appliance;
    allAppareils.push(appareils);
}
const appareilsNoRepeat = new Set(allAppareils);
const appareilFiltersArray = Array.from(appareilsNoRepeat);

//Get the list of all the ustensils (without duplicate)
const allUstensils = [];
for (let i=0; i<recipes.length; i++) {
    let ustensils = recipes[i].ustensils;
    allUstensils.push(ustensils);
}
const allUstensilsJoined = allUstensils.flat();
const lowerCaseUstensils = allUstensilsJoined.map(x => x.toLowerCase());
const ustensilsNoRepeat = new Set(lowerCaseUstensils);
const ustenstilsFiltersArray = Array.from(ustensilsNoRepeat);

//Display the filters inside their container
const ingredients = new FiltersList(ingredientFiltersBtn, ingredientFiltersList, ingredientFiltersArray);
ingredients.display();
const appareils = new FiltersList(appareilFiltersBtn, appareilFiltersList, appareilFiltersArray);
appareils.display();
const ustensils = new FiltersList(ustensilsFiltersBtn, ustensilsFiltersList, ustenstilsFiltersArray);
ustensils.display();

/*SEARCHBAR EVENTS*/
const searchBar = document.querySelector("#searchbar");

searchBar.addEventListener("keyup", (e) => {
    const searchedLetters = e.target.value;
    const cards = document.querySelectorAll(".card");
    filterElements(searchedLetters, cards);
});

function filterElements(letters, elements) {
    if(letters.length >2){
        for (let i=0; i<elements.length; i++){
            if(elements[i].textContent.includes(letters)) {
                elements[i].style.display = "block";
            } else {
                elements[i].style.display = "none";
            }
        }
    }
}