import { recipes } from './recipes.js';

const mainElement = document.querySelector("main");
const searchbar = document.querySelector("#searchbar");
const searchbarError = document.querySelector("#error-msg-searchbar");
const tagsContainer = document.querySelector(".tags");
const ingredientFiltersBtn = document.querySelector("#ingredient-btn");
const appareilFiltersBtn = document.querySelector("#appareil-btn");
const ustensilsFiltersBtn = document.querySelector("#ustensils-btn");
const ingredientFiltersList = document.querySelector("#edit-and-select_ingredients-results"); //ingredients filters ul
const appareilFiltersList = document.querySelector("#edit-and-select_appareil-results"); //appareil filters ul
const ustensilsFiltersList = document.querySelector("#edit-and-select_ustensils-results"); //ustensils filters ul 

(async function createHomepage() {
    let myHomePage = new HomePage(recipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientFiltersBtn, appareilFiltersBtn, ustensilsFiltersBtn, ingredientFiltersList, appareilFiltersList, ustensilsFiltersList);
    await myHomePage.display(recipes);
})();