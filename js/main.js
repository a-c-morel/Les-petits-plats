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
        allIngredients.push(`${ingredient}`);
    });
}
const ingredientsNoRepeat = new Set(allIngredients);
console.log(ingredientsNoRepeat);

//Get the list of all the appareils (without duplicate)
const allAppareils = [];
for (let i=0; i<recipes.length; i++) {
    let appareils = recipes[i].appliance;
    allAppareils.push(appareils);
}
const appareilsNoRepeat = new Set(allAppareils);
console.log(appareilsNoRepeat);

//Get the list of all the ustensils (without duplicate)
const allUstensils = [];
for (let i=0; i<recipes.length; i++) {
    let ustensils = recipes[i].ustensils;
    //console.log(ustensils);
    allUstensils.push(ustensils);
}
const ustensilsNoRepeat = new Set(allUstensils.flat());
console.log(ustensilsNoRepeat);

class filtersList {
    constructor(button, listContainer, filters) {
        this.button = button; //exemple : ingredientFiltersButton
        this.listContainer = listContainer; //exemple : ingredientFiltersList
        this.filters = filters;
    }

    display() {
        for (let filter of this.filters) {
            const filter = document.createElement("li");
            liContainer.appendChild(filter);
            cardIngredient.innerHTML = `${filter}`;
        }
        
    }
}

