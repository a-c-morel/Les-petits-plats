class HomePage {


    constructor(importedRecipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilsFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilsFiltersList) {

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

        this.recipesArray = [];
        this.filteredRecipesArray = [];
        this.ingredientsArray = [];
        this.appareilsArray = [];
        this.ustensilesArray = [];
        this.searchedLetters = [];
        
        this.searchbar.addEventListener('keyup', (e) => {
            this.searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
            let cardsDisplayed = this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError);
            this.displayCards(cardsDisplayed);
            let filtersDisplayed = this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError);
            this.displayFilters(filtersDisplayed);
        });

    }


    get allRecipes() {

        this.recipesArray = this.importedRecipes;
        return this.recipesArray;

    }


    clear(containerToClear) {

        while (containerToClear.firstChild) {
            containerToClear.removeChild(containerToClear.firstChild);
        }

    }


    displayCards(myRecipesArray) {

        this.clear(this.mainElement);

        for (let recipe of myRecipesArray){
            let recipeTitle = recipe.name;
            let recipeDuration = recipe.time;
            let recipeIngredients = recipe.ingredients;
            let recipeDescription = recipe.description;
        
            let card = new RecipeCard(recipeTitle, recipeDuration, recipeIngredients, recipeDescription, this.mainElement);
            this.mainElement.appendChild(card.display());
        }

    }


    displayFilters(myRecipesArray) {

        //J'instancie les arrays de filtres :
        const filtersArray = new FiltersArray(myRecipesArray);
        this.ingredientsArray = filtersArray.getIngredients();
        this.appareilsArray = filtersArray.getAppareils();
        this.ustensilsArray = filtersArray.getUstensils();

        //affichage des filtres dans leur container :
        let ingredients = new FiltersFactory("ingredient", {button: this.ingredientsFiltersBtn, listContainer: this.ingredientsFiltersList, filters: this.ingredientsArray, tagsContainer: this.tagsContainer, ingredientsTags: this.ingredientsTags});
        ingredients.displayList();
        let appareils = new FiltersFactory("appareil", {button: this.appareilsFiltersBtn, listContainer: this.appareilsFiltersList, filters: this.appareilsArray, tagsContainer: this.tagsContainer, appareilsTags: this.appareilsTags});
        appareils.displayList();
        let ustensiles = new FiltersFactory("ustensile", {button: this.ustensilsFiltersBtn, listContainer: this.ustensilsFiltersList, filters: this.ustensilsArray, tagsContainer: this.tagsContainer, ustensilesTags: this.ustensilesTags});
        ustensiles.displayList();
        
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

            //continuer filtre

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