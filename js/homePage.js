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
        this.selectedIngredients = [];
        this.selectedAppareils = [];
        this.selectedUstensiles = [];
        this.searchedLetters = "";
        
        this.searchbar.addEventListener('keyup', (e) => {
            this.searchedLetters = e.target.value.toLowerCase(); /** je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée **/
            let myRecipesArray = this.filtrer(this.recipesArray, this.searchedLetters, this.searchbarError, this.selectedIngredients); /** ça return soit l'array filtré, soit l'array de 50 recettes **/
            this.displayCards(myRecipesArray); /** au lieu de display myRecipesArray, il faudra juste display l'array qui sera return après l'ensemble des filtrages **/
            this.displayFilters(myRecipesArray);

            //let selectedIngredientsTags = document.querySelectorAll(".ingredient-tag");
            /*let ingredientsFilters = document.querySelectorAll(".ingredient-element");
            for (let ingredientFilter of ingredientsFilters) {
                ingredientFilter.addEventListener('click', () => {
                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.searchbarError, this.selectedIngredients);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                });
            }*/
        });

        
    }


    filtrer(myRecipesArray, searchedLetters, searchbarError, selectedIngredients) {

        let filteredBySearchbar = [];

        if(searchedLetters.length>2) { //ne pas s'occuper de ce code pour le moment !

            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";
            
            filteredBySearchbar.length == 0; /** on vide l'array **/
            
            for (let recipe of myRecipesArray){
                let recipeTitle = recipe.name;
                let ingredients = recipe.ingredients;
                let recipeIngredients = [];
                ingredients.map(({ingredient}) => {
                    recipeIngredients.push(`${ingredient.toLowerCase()}`);
                });
                let recipeDescription = recipe.description;
                if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters))) {
                    filteredBySearchbar.push(recipe);
                }        
            }

            
            if(filteredBySearchbar.length == 0){
                searchbarError.classList.add("show-error-msg");
                searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
            }

            /*let filteredByIngredients = [];

            for (let recipe of filteredBySearchbar) {
                let recipeIngredients = recipe.ingredients;
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                });

                if(selectedIngredients.every(tag => recipeIngredientsArray.includes(tag))){
                    filteredByIngredients.push(recipe);
                }
            }
            
            this.filteredRecipesArray = filteredByIngredients; /** ensuite ce sera result3 puis 4... **/
            return filteredBySearchbar;


        } else if (selectedIngredients.length > 0 ) { //|| ....idem appareils, ustensils

            //filteredBySearchbar.length = 0; /** on vide l'array **/

            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";

            let filteredByIngredients = []; /** va contenir les recettes qui ont passé le filtre **/

            /** Il faut que je prenne this.selectedIngredients (en partant du principe qu'il y a quelque chose dedans...) **/
            for (let recipe of myRecipesArray) {
                let recipeIngredients = recipe.ingredients;
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${ingredient.toLowerCase()}`);
                });

                if(selectedIngredients.every(tag => recipeIngredientsArray.includes(tag))){
                    filteredByIngredients.push(recipe);
                }
            }
            
            return filteredByIngredients; /** ensuite ce sera filteredByAppareils puis filteredByUstensiles... **/

        } else {

            searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";
            return this.allRecipes;

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

        /** J'instancie les arrays de filtres : **/
        const filtersArray = new FiltersArray(myRecipesArray);
        this.ingredientsArray = filtersArray.getIngredients();
        this.appareilsArray = filtersArray.getAppareils();
        this.ustensilsArray = filtersArray.getUstensils();

        /** affichage des ingrédients dans leur container : **/
        let ingredients = new FiltersFactory("ingredient", {button: this.ingredientsFiltersBtn, listContainer: this.ingredientsFiltersList, filters: this.ingredientsArray, tagsContainer: this.tagsContainer}); //, ingredientsTags: this.ingredientsTags ???
        ingredients.displayList();

        let ingredientsElements = ingredients.listContainer.children;

        for (let ingredient of ingredientsElements) {
            ingredient.addEventListener('click', (e) => {

                if(!(this.selectedIngredients.includes(ingredient.outerText))) {
                    /** Le tag vient s'ajouter dans l'array des ingrédients sélectionnés **/
                    this.selectedIngredients.push(ingredient.outerText);
                    /** Affichage des tags sélectionnés dans tagsContainer **/
                    const tagLi = document.createElement("li");
                    tagLi.classList.add("ingredient-tag");
                    tagLi.innerHTML = e.target.innerHTML;
                    this.tagsContainer.appendChild(tagLi);

                    console.log(this.filtrer(myRecipesArray, this.searchedLetters, this.searchbarError, this.selectedIngredients));
                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.searchbarError, this.selectedIngredients);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray); // ????? pb redondance

                }



                //return this.selectedIngredients;

                /*this.selectedIngredients = ingredients.ingredientsTagsArray;
                console.log(this.selectedIngredients);
                myRecipesArray = this.filtrer(this.selectedIngredients, this.searchedLetters, this.searchbarError, this.selectedIngredients);*/
            });
        }
        /*let appareils = new FiltersFactory("appareil", {button: this.appareilsFiltersBtn, listContainer: this.appareilsFiltersList, filters: this.appareilsArray, tagsContainer: this.tagsContainer, appareilsTags: this.appareilsTags});
        appareils.displayList();
        let ustensiles = new FiltersFactory("ustensile", {button: this.ustensilsFiltersBtn, listContainer: this.ustensilsFiltersList, filters: this.ustensilsArray, tagsContainer: this.tagsContainer, ustensilesTags: this.ustensilesTags});
        ustensiles.displayList();*/

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


}