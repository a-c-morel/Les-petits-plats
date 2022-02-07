import { recipes } from './recipes.js';

const mainElement = document.querySelector("main");
const searchbar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");
const tagsContainer = document.querySelector(".tags");
const ingredientsFiltersBtn = document.querySelector("#ingredient-btn");
const appareilsFiltersBtn = document.querySelector("#appareil-btn");
const ustensilsFiltersBtn = document.querySelector("#ustensils-btn");
const ingredientsFiltersList = document.querySelector("#edit-and-select_ingredients-results"); //ingredients filters ul
const appareilsFiltersList = document.querySelector("#edit-and-select_appareil-results"); //appareil filters ul
const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results"); //ustensils filters ul 
const ingredientsTags = document.querySelectorAll(".ingredient-element");

(async function createHomepage() {
    let myHomePage = new HomePage(recipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilsFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilsFiltersList); //, ingredientsTags
    await myHomePage.displayCards(recipes);
    await myHomePage.displayFilters(recipes);
})();

//Quans clic sur un bouton = montrer les filtres, quand clic à l'extérieur de la liste = cacher la liste
document.addEventListener('click', (e) => {
    if (e.target.closest("#ingredient-btn")) {
        showList(ingredientsFiltersBtn, ingredientsFiltersList);
    } else {
        hideList(ingredientsFiltersBtn, ingredientsFiltersList);
    }
    if (e.target.closest("#appareil-btn")) {
        showList(appareilsFiltersBtn, appareilsFiltersList);
    } else {
        hideList(appareilsFiltersBtn, appareilsFiltersList);
    }
    if (e.target.closest("#ustensils-btn")) {
        showList(ustensilsFiltersBtn, ustensilsFiltersList);
    } else {
        hideList(ustensilsFiltersBtn, ustensilsFiltersList);
    }
});

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