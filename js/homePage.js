class HomePage {


    constructor(importedRecipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientFiltersBtn, appareilFiltersBtn, ustensilsFiltersBtn, ingedientsFiltersList, appareilFiltersList, ustensilsFiltersList) {

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
        this.ingredientFiltersBtn = ingredientFiltersBtn;
        this.appareilFiltersBtn = appareilFiltersBtn;
        this.ustensilsFiltersBtn = ustensilsFiltersBtn;
        this.ingedientsFiltersList = ingedientsFiltersList;
        this.appareilFiltersList = appareilFiltersList;
        this.ustensilsFiltersList = ustensilsFiltersList;

        this.searchbar.addEventListener('keyup', (e) => {
            this.searchedLetters = e.target.value.toLowerCase(); //je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée
            this.display(this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError));
        });

    }


    get allRecipes() {

        this.recipesArray = this.importedRecipes;
        return this.recipesArray;

    }


    display(myRecipesArray) {

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