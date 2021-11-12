import { recipes } from './recipes.js';

const recipesContainer = document.querySelector("main");
const cardsRecipes = [];

class RecipeCard {

    constructor(title, time, ingredients, description) {
        this.title = title;
        this.time = time;
        this.ingredients = ingredients;
        this.description = description;
    }

    display() {
        const card = document.createElement("article");
        card.classList.add("card");
        card.classList.add("mb-3");

        const cardSvg = document.createElement("svg");
        cardSvg.classList.add("docs-placeholder-img");
        cardSvg.classList.add("docs-placeholder-img-lg");
        cardSvg.classList.add("img-fluid");
        cardSvg.classList.add("card-img-top");
        cardSvg.setAttribute("width", "100%");
        cardSvg.setAttribute("height", "178");
        cardSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        cardSvg.setAttribute("role", "img");
        cardSvg.setAttribute("aria-label", "gray background");
        cardSvg.setAttribute("preserveaspectratio", "xMidYMid slice");
        cardSvg.setAttribute("focusable", "false");

        const cardSvgTitle = document.createElement("title");
        cardSvgTitle.innerHTML = "Placeholder";

        const cardSvgRect = document.createElement("rect");
        cardSvgRect.setAttribute("width", "100%");
        cardSvgRect.setAttribute("height", "100%");
        cardSvgRect.setAttribute("fill", "#C7BEBE");

        const cardBody = document.createElement("section");
        cardBody.classList.add("card-body");

        const cardBodyHeading = document.createElement("div");
        cardBodyHeading.classList.add("d-flex");
        cardBodyHeading.classList.add("p-2");

        const cardTitle = document.createElement("h2");
        cardTitle.innerHTML = `${this.title}`;

        const cardTime = document.createElement("p");
        cardTime.innerHTML = `${this.time}`;
        
        const cardIngredientsList = document.createElement("ul");

        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card-text");

        card.appendChild(cardSvg);
        cardSvg.appendChild(cardSvgTitle);
        cardSvg.appendChild(cardSvgRect);
        card.appendChild(cardBody);
        cardBody.appendChild(cardBodyHeading);
        cardBodyHeading.appendChild(cardTitle);
        cardBodyHeading.appendChild(cardTime);
        cardBody.appendChild(cardIngredientsList);
        cardBody.appendChild(cardDescription);

        for (const ingredient of this.ingredients) {
            const cardIngredient = document.createElement("li");
            cardIngredientsList.appendChild(cardIngredient);
            cardIngredient.innerHTML = `${ingredient}`;
        }

        return card;
    }
}

for (const recipe of recipes){
    let myCard = new RecipeCard(recipe.name, recipe.time, recipe.ingredients, recipe.description);
    cardsRecipes.push(myCard);
}

cardsRecipes.forEach(recipe =>{
    recipesContainer.appendChild(recipe.display());
});