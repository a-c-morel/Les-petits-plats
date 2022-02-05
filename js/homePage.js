class HomePage {


    constructor(importedRecipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilsFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilsFiltersList) {

        this.recipesArray = [];
        this.filteredRecipesArray = [];
        this.ingredientsArray = [];
        this.appareilsArray = [];
        this.ustensilesArray = [];
        this.searchedLetters = [];

        this.importedRecipes = importedRecipes;
        this.mainElement = mainElement;
        this.searchbar = searchbar;
        this.searchbarError = searchbarError;
        this.tagsContainer = tagsContainer;
        this.ingredientsFiltersBtn = ingredientsFiltersBtn;
        this.appareilsFiltersBtn = appareilsFiltersBtn;
        this.ustensilsFiltersBtn = ustensilsFiltersBtn;
        this.ingredientsFiltersList = ingredientsFiltersList;
        this.appareilsFiltersList = appareilsFiltersList;
        this.ustensilsFiltersList = ustensilsFiltersList;

        this.searchbar.addEventListener('keyup', (e) => {
            this.searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
            let cardsDisplayed = this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError);
            this.displayCards(cardsDisplayed);
            //faire pareil ici:
            this.displayFilters(this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError));
        });

    }


    get allRecipes() {

        this.recipesArray = this.importedRecipes;
        return this.recipesArray;

    }


    displayCards(myRecipesArray) {

        while (this.mainElement.firstChild) {
            this.mainElement.removeChild(this.mainElement.firstChild);
        }

        for (let recipe of myRecipesArray){
            let recipeTitle = recipe.name;
            let recipeDuration = recipe.time;
            let recipeIngredients = recipe.ingredients;
            let recipeDescription = recipe.description;
        
            let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, this.mainElement);
            this.mainElement.appendChild(card.display());
        }

    }


    displayFilters(myRecipesArray) { //il faudra faire comme j'ai fait pour l'autre méthode display, prendre l'array qui est return par le filtre donc faire displayFilters(filtrer(this.recipesArray, this.searchedLetters, this.searchbarError,........))

        //J'instancie les arrays de filtres :
        const filtersArray = new FiltersArray(myRecipesArray);
        this.ingredientsArray = filtersArray.getIngredients();
        this.appareilsArray = filtersArray.getAppareils();
        this.ustensilsArray = filtersArray.getUstensils();

        //affichage des filtres dans leur container :
        const ingredients = new FiltersList(this.ingredientsFiltersBtn, this.ingredientsFiltersList, this.ingredientsArray, "ingredient-element");
        ingredients.display();
        const appareils = new FiltersList(this.appareilsFiltersBtn, this.appareilsFiltersList, this.appareilsArray, "appareil-element");
        appareils.display();
        const ustensiles = new FiltersList(this.ustensilsFiltersBtn, this.ustensilsFiltersList, this.ustensilsArray, "ustensil-element");
        ustensiles.display();
        //à ce stade ils ne peuvent pas encore s'afficher, il faut ajouter l'event listener sur les boutons pour ajouter ou remove la classe qui sert à afficher et cacher les listes :
        
    }


    filtrer(myRecipesArray, searchedLetters, searchbarError) {

        let result = [];

        if(searchedLetters.length>2){

            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";
            
            result.length = 0; //on vide l'array
            
            for (let recipe of myRecipesArray){
                let recipeTitle = recipe.name;
                let ingredients = recipe.ingredients;
                let recipeIngredients = [];
                ingredients.map(({ingredient}) => {
                    recipeIngredients.push(`${ingredient.toLowerCase()}`);
                });
                let recipeDescription = recipe.description;
                if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters))) {
                    result.push(recipe);
                }        
            }

            this.filteredRecipesArray = result;
            
            if(result.length == 0){
                searchbarError.classList.add("show-error-msg");
                searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
            }

            return this.filteredRecipesArray;

        } else {

            result.length = 0; //on vide l'array

            for (let recipe of myRecipesArray){
                let recipeTitle = recipe.name;
                let ingredients = recipe.ingredients;
                let recipeIngredients = [];
                ingredients.map(({ingredient}) => {
                    recipeIngredients.push(`${ingredient.toLowerCase()}`);
                });
                let recipeDescription = recipe.description;
                if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters))) {
                    result.push(recipe);
                }        
            }

            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";

            return this.allRecipes;

        }
        
    }


}