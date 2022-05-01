import { recipes } from './recipes.js';

const elements = {
    mainElement: document.querySelector("main"),
    searchbar: document.querySelector("#searchbar"),
    searchbarError: document.querySelector("#error-msg-searchbar"),
    tagsContainer: document.querySelector(".tags"),
    ingredientsFiltersBtn: document.querySelector("#ingredients-btn"),
    appareilsFiltersBtn: document.querySelector("#appareil-btn"),
    ustensilesFiltersBtn: document.querySelector("#ustensiles-btn"),
    closeIngredientsList: document.querySelector("#open_ingredient-search"),
    closeAppareilsList: document.querySelector("#open_appareil-search"),
    closeUstensilesList: document.querySelector("#open_ustensile-search"),
    ingredientsFiltersList: document.querySelector("#edit-and-select_ingredients-results"), /** ingredients filters ul **/
    appareilsFiltersList: document.querySelector("#edit-and-select_appareil-results"), /** appareil filters ul **/
    ustensilesFiltersList: document.querySelector("#edit-and-select_ustensiles-results"), /** ustensiles filters ul **/
    ingredientsInput: document.querySelector("#enter-ingredient"),
    appareilsInput: document.querySelector("#enter-appareil"),
    ustensilesInput: document.querySelector("#enter-ustensile")
}

const {
    mainElement,
    searchbar,
    searchbarError,
    tagsContainer,
    ingredientsFiltersBtn,
    appareilsFiltersBtn,
    ustensilesFiltersBtn,
    closeIngredientsList,
    closeAppareilsList,
    closeUstensilesList,
    ingredientsFiltersList,
    appareilsFiltersList,
    ustensilesFiltersList,
    ingredientsInput,
    appareilsInput,
    ustensilesInput
} = elements;

(async function createHomepage() {
    let myHomePage = new HomePage(recipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilesFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilesFiltersList, ingredientsInput, appareilsInput, ustensilesInput);
    myHomePage.displayCards(recipes);
    myHomePage.displayFilters(recipes);
})();

/** Quans clic sur un bouton = montrer les filtres, quand clic à l'extérieur de la liste = cacher la liste **/
document.addEventListener('click', (e) => {
    if (e.target.closest("#ingredients-btn")) {
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


/** Quand clic sur le chevron: animation + toggle ouverture/fermeture liste**/
closeIngredientsList.addEventListener("click", (e) => {
    let isIngredientsListOpened = document.querySelector(".show-filters");
    if(!(isIngredientsListOpened === null)) {
        e.stopPropagation();
        hideList(ingredientsFiltersBtn, ingredientsFiltersList);
    }
});

closeAppareilsList.addEventListener("click", (e) => {
    let isAppareilsListOpened = document.querySelector(".show-filters");
    if(!(isAppareilsListOpened === null)) {
        e.stopPropagation();
        hideList(appareilsFiltersBtn, appareilsFiltersList);
    }
});

closeUstensilesList.addEventListener("click", (e) => {
    let isUstensilesListOpened = document.querySelector(".show-filters");
    if(!(isUstensilesListOpened === null)) {
        e.stopPropagation();
        hideList(ustensilesFiltersBtn, ustensilesFiltersList);
    }
});

function showList(btn, list){
    list.classList.add("show-filters");
    list.classList.add("row");
    /*btn.classList.add("md-w-50");*/
    /*btn.classList.add("btn-expand");*/
}

function hideList(btn, list){
    list.classList.remove("show-filters");
    list.classList.remove("row");
    //btn.classList.remove("md-w-50");
    //btn.classList.remove("btn-expand");
}