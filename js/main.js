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
console.log(ingredientFiltersArray);

//Get the list of all the appareils (without duplicate)
const allAppareils = [];
for (let i=0; i<recipes.length; i++) {
    let appareils = recipes[i].appliance;
    allAppareils.push(appareils);
}
const appareilsNoRepeat = new Set(allAppareils);
const appareilFiltersArray = Array.from(appareilsNoRepeat);
console.log(appareilFiltersArray);

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
console.log(ustenstilsFiltersArray);

class filtersList {
    constructor(button, listContainer, filters) {
        this.button = button; //exemple : ingredientFiltersButton
        this.listContainer = listContainer; //exemple : ingredientFiltersList
        this.filters = filters;
    }

    display() {
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi);
            
        }
        
    }
}

let ingredients = new filtersList(ingredientFiltersBtn, ingredientFiltersList, ingredientFiltersArray);
ingredients.display();

let appareils = new filtersList(appareilFiltersBtn, appareilFiltersList, appareilFiltersArray);
appareils.display();

let ustensils = new filtersList(ustensilsFiltersBtn, ustensilsFiltersList, ustenstilsFiltersArray);
ustensils.display();
