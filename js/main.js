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

        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top");
        cardImg.setAttribute("src", "images/pictures/img-placeholder.png");
        cardImg.setAttribute("alt", "Card image cap");

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
        cardDescription.innerHTML = `${this.description}`;

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        cardBody.appendChild(cardBodyHeading);
        cardBodyHeading.appendChild(cardTitle);
        cardBodyHeading.appendChild(cardTime);
        cardBody.appendChild(cardIngredientsList);
        cardBody.appendChild(cardDescription);

        for (let ingredient of this.ingredients) {
            const cardIngredient = document.createElement("li");
            cardIngredientsList.appendChild(cardIngredient);
            cardIngredient.innerHTML = `${ingredient.ingredient}`;
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