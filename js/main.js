import { recipes } from './recipes.js';

const recipesArray = recipes;
//Array qui contient les recettes (en tant qu'infos). Il sera modifié en fonction des recherches utilisateur.
const cardsArray = [];
//Array qui contiendra les instances créées à partir de la classe Card (à créer), donc des objets. Cet Array devra se modifier en fonction de recipesArray, lui-même mis à jour par les recherches utilisateur, sans doute en liant l'id des recettes de recipesArray avec celui des objets de cardsArray.

const mainElement = document.querySelector("main");

/*PAR DEFAUT, AFFICHAGE DE TOUTES LES CARTES*/

defaultCardsDisplay();

function defaultCardsDisplay(){
    for (const recipe of recipesArray){
        let myCard = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description, recipe.id);
        cardsArray.push(myCard);
    }
    cardsArray.forEach(recipe =>{
        mainElement.appendChild(recipe.display());
    });
}


/*ZONE DE TESTS*/

const filtersArray = new FiltersArray(recipesArray);

const ingredientsArray = filtersArray.getIngredients();
//console.log(ingredientsArray); -> OK ça affiche bien un array contenant les ingrédients

const appareilsArray = filtersArray.getAppareils();
//console.log(appareilsArray); -> OK ça affiche bien un array contenant les appareils

const ustensilsArray = filtersArray.getUstensils();
//console.log(ustensilsArray); -> OK ça affiche bien un array contenant les ustensiles

/*ZONE DE TESTS*/