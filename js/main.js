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

const ingredientFiltersBtn = document.querySelector("#ingredient-btn"); //ingredients btn
const appareilFiltersBtn = document.querySelector("#appareil-btn"); //appareils btn
const ustensilsFiltersBtn = document.querySelector("#ustensils-btn"); //ustensils btn

const ingredientFiltersList = document.querySelector("#edit-and-select_ingredients-results"); //ingredients filters ul
const appareilFiltersList = document.querySelector("#edit-and-select_appareil-results"); //appareil filters ul
const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results"); //ustensils filters ul

//const ulFilters = document.querySelectorAll(".advanced_search_results"); //the 3 filters ul containers, together in an array, if needed

const searchIngredient = document.querySelector("#enter-ingredient"); //ingredients search input
const searchAppareil = document.querySelector("#enter-appareil"); //appareils search input
const searchUstensils = document.querySelector("#enter-ustensils"); //ustensils search input

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
const ingredients = new FiltersList(ingredientFiltersBtn, ingredientFiltersList, ingredientFiltersArray, "ingredient-element");
ingredients.display();
const appareils = new FiltersList(appareilFiltersBtn, appareilFiltersList, appareilFiltersArray, "appareil-element");
appareils.display();
const ustensils = new FiltersList(ustensilsFiltersBtn, ustensilsFiltersList, ustenstilsFiltersArray, "ustensils-element");
ustensils.display();

//Show the filters when user clicks on a button, hide the filters when user clicks outside a button

document.addEventListener('click', (e) => {
    if (e.target.closest("#ingredient-btn")) {
        ingredientFiltersList.classList.add("show-filters");
        ingredientFiltersList.classList.add("row");
        ingredientFiltersBtn.classList.add("w-50");
    } else {
        ingredientFiltersList.classList.remove("show-filters");
        ingredientFiltersList.classList.remove("row");
        ingredientFiltersBtn.classList.remove("w-50");
    }

    if (e.target.closest("#appareil-btn")) {
        appareilFiltersList.classList.add("show-filters");
        appareilFiltersList.classList.add("row");
        appareilFiltersBtn.classList.add("w-50");
    } else {
        appareilFiltersList.classList.remove("show-filters");
        appareilFiltersList.classList.remove("row");
        appareilFiltersBtn.classList.remove("w-50");
    }
    
    if (e.target.closest("#ustensils-btn")) {
        ustensilsFiltersList.classList.add("show-filters");
        ustensilsFiltersList.classList.add("row");
        ustensilsFiltersBtn.classList.add("w-50");
    } else {
        ustensilsFiltersList.classList.remove("show-filters");
        ustensilsFiltersList.classList.remove("row");
        ustensilsFiltersBtn.classList.remove("w-50");
    }
});

/*ADVANCED SEARCH FILTERS EVENTS*/

searchIngredient.addEventListener("keyup", (e) => {
    const searchedLetters = e.target.value.toLowerCase();
    const  items = document.querySelectorAll(".ingredient-element");
    filterElements(searchedLetters, items);
});

searchAppareil.addEventListener("keyup", (e) => {
    const searchedLetters = e.target.value.toLowerCase();
    const  items = document.querySelectorAll(".appareil-element");
    filterElements(searchedLetters, items);
});

searchUstensils.addEventListener("keyup", (e) => {
    const searchedLetters = e.target.value.toLowerCase();
    const  items = document.querySelectorAll(".ustensils-element");
    filterElements(searchedLetters, items);
});

/*SEARCHBAR EVENTS*/
const searchBar = document.querySelector("#searchbar"); //get search input
const tagFilters = document.querySelectorAll(".filter-element");

searchBar.addEventListener("keyup", (e) => { //when user presses any key
    const searchedLetters = e.target.value.toLowerCase(); //variable which puts the user entry into lowercase
    const cards = document.querySelectorAll(".card"); //creates an array with all the article.card
    filterElements(searchedLetters, cards);
    filterElements(searchedLetters, tagFilters);
});

function filterElements(letters, items) {
    for (let i=0; i<items.length; i++){
        if(items[i].textContent.toLowerCase().includes(letters)&&(letters.length >2)) { //if user entry >2 letters and if card contains them (+ letters are put into lowercase)
            items[i].style.display = "block";
        } else if((!items[i].textContent.toLowerCase().includes(letters))&&(letters.length >2)){ //if user entry >2 letters but if card doesn't contain them (+ letters are put into lowercase)
            items[i].style.display = "none";
        } else{ //every other cases
            items[i].style.display = "block";
        }
    }
}