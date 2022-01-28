class RecipeCard {

    constructor(title, time, ingredients, description, cardsContainer) { //, cardsArray, cardId
        this.title = title;
        this.time = time;
        this.ingredients = ingredients;
        this.description = description;
        //this.cardId = cardId;
        this.cardsContainer = cardsContainer;
        //this.cardsArray = cardsArray;
    }
    display() {
        const card = document.createElement("article");
        card.classList.add("card");
        card.classList.add("mb-3");
        card.classList.add("rounded");
        card.classList.add("border-0");

        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top");
        cardImg.classList.add("border-0");
        cardImg.setAttribute("src", "images/pictures/img-placeholder.png");
        cardImg.setAttribute("alt", "Card image cap");

        const cardBody = document.createElement("section");
        cardBody.classList.add("card-body");
        cardBody.classList.add("row");
        cardBody.classList.add("rounded-bottom")

        const cardTitle = document.createElement("h2");
        cardTitle.classList.add("card-title");
        cardTitle.classList.add("col-10");
        cardTitle.innerHTML = `${this.title}`;

        const cardTime = document.createElement("p");
        cardTime.innerHTML = `<i class="bi bi-clock"></i> ${this.time} min`;
        cardTime.classList.add("col-2");
        
        const cardIngredientsList = document.createElement("ul");
        cardIngredientsList.classList.add("ingredients-ul");
        cardIngredientsList.classList.add("col-6");

        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card-text");
        cardDescription.classList.add("col-6");
        cardDescription.innerHTML = `${this.description}`;

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardTime);
        cardBody.appendChild(cardIngredientsList);
        cardBody.appendChild(cardDescription);

        for (let ingredient of this.ingredients) {
            const cardIngredient = document.createElement("li");
            cardIngredientsList.appendChild(cardIngredient);
            if(ingredient.quantity === undefined) {
                cardIngredient.innerHTML = `<span class="bold">${ingredient.ingredient}`
            } else if(ingredient.unit === undefined) {
                cardIngredient.innerHTML = `<span class="bold">${ingredient.ingredient}:</span> ${ingredient.quantity}`;
            } else {
                cardIngredient.innerHTML = `<span class="bold">${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit}`;
            }
        }
        //this.cardsArray.push(card);
        return card;
    }
}