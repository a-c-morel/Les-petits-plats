import { recipes } from './recipes.js';

const mainElement = document.querySelector("main");
const searchbar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");
const tagsContainer = document.querySelector(".tags");
const ingredientsFiltersBtn = document.querySelector("#ingredient-btn");
const appareilsFiltersBtn = document.querySelector("#appareil-btn");
const ustensilesFiltersBtn = document.querySelector("#ustensiles-btn");
const ingredientsFiltersList = document.querySelector("#edit-and-select_ingredients-results"); /** ingredients filters ul **/
const appareilsFiltersList = document.querySelector("#edit-and-select_appareil-results"); /** appareil filters ul **/
const ustensilesFiltersList = document.querySelector("#edit-and-select_ustensiles-results"); /** ustensiles filters ul **/


(async function createHomepage() {
    let myHomePage = new HomePage(recipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilesFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilesFiltersList);
    myHomePage.displayCards(recipes);
    myHomePage.displayFilters(recipes);
})();

/** Quans clic sur un bouton = montrer les filtres, quand clic à l'extérieur de la liste = cacher la liste **/
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
    if (e.target.closest("#ustensiles-btn")) {
        showList(ustensilesFiltersBtn, ustensilesFiltersList);
    } else {
        hideList(ustensilesFiltersBtn, ustensilesFiltersList);
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