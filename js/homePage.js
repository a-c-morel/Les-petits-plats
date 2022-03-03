class HomePage {


    constructor(importedRecipes, mainElement, searchbar, searchbarError, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilesFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilesFiltersList) {

        this.importedRecipes = importedRecipes;
        this.mainElement = mainElement;
        this.searchbar = searchbar;
        this.searchbarError = searchbarError;
        this.tagsContainer = tagsContainer;
        this.ingredientsFiltersBtn = ingredientsFiltersBtn;
        this.appareilsFiltersBtn = appareilsFiltersBtn;
        this.ustensilesFiltersBtn = ustensilesFiltersBtn;
        this.ingredientsFiltersList = ingredientsFiltersList;
        this.appareilsFiltersList = appareilsFiltersList;
        this.ustensilesFiltersList = ustensilesFiltersList;
        
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
            //console.log(this.recipesArray);
            let myRecipesArray = this.filtrer(this.recipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles); /** ça return soit l'array filtré, soit l'array de 50 recettes **/
            this.displayCards(myRecipesArray);
            this.displayFilters(myRecipesArray);
        });

        
    }


    filtrer(myRecipesArray, searchedLetters, selectedIngredients, selectedAppareils, selectedUstensiles) {

        let filteredBySearchbar = []; /** va contenir les recettes qui ont passé le filtre 1 **/

        if(searchedLetters.length > 2) {

            /*searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";*/
            
            //filteredBySearchbar.length == 0; /** on vide l'array **/
            
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

            let filteredByIngredients = []; /** va contenir les recettes qui ont passé le filtre 2 **/

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
            
            let filteredByAppareils = []; /** va contenir les recettes qui ont passé le filtre 3 **/

            for (let recipe of filteredByIngredients){
                let recipeAppareil = recipe.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${recipeAppareil.toLowerCase()}`);
                if(selectedAppareils.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredByAppareils.push(recipe);
                }
            }

            let filteredByUstensiles = []; /** va contenir les recettes qui ont passé le filtre 4 **/

            for (let recipe of filteredByAppareils) {
                let recipeUstensiles = recipe.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${recipeUstensile.toLowerCase()}`);
                }
                if(selectedUstensiles.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredByUstensiles.push(recipe);
                }
            }

            /*if(filteredByUstensiles.length === 0){
                searchbarError.classList.add("show-error-msg");
                searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
            }*/ //faire ce message à l'appel de la fonction filter

            return filteredByUstensiles;

        } else if (selectedIngredients.length > 0 || selectedAppareils.length > 0 || selectedUstensiles.length > 0 ) { //|| ....idem appareils, ustensiles

            //filteredBySearchbar.length = 0; /** on vide l'array **/

            /*searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";*/

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
            
            let filteredByAppareils = []; /** va contenir les recettes qui ont passé le filtre 3 **/

            for (let recipe of filteredByIngredients){
                let recipeAppareil = recipe.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${recipeAppareil.toLowerCase()}`);
                if(selectedAppareils.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredByAppareils.push(recipe);
                }
            }

            let filteredByUstensiles = []; /** va contenir les recettes qui ont passé le filtre 4 **/

            for (let recipe of filteredByAppareils) {
                let recipeUstensiles = recipe.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${recipeUstensile.toLowerCase()}`);
                }
                if(selectedUstensiles.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredByUstensiles.push(recipe);
                }
            }

            /*let filteredBySearchbar = [];

            if(searchedLetters.length > 2) {
                
                for (let recipe of filteredByUstensiles){
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
                return filteredBySearchBar;
            }else {*/
                return filteredByUstensiles; //return filteredBySearchBar;

        } else {

            /*searchbarError.classList.remove("show-error-msg");
            searchbarError.innerHTML = "";*/
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
        this.ustensilesArray = filtersArray.getUstensiles();

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

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    console.log(myNewRecipesArray);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray); // ????? pb récursivité
                }
            });
        }

        let appareils = new FiltersFactory("appareil", {button: this.appareilsFiltersBtn, listContainer: this.appareilsFiltersList, filters: this.appareilsArray, tagsContainer: this.tagsContainer});
        appareils.displayList();
        
        let appareilsElements = appareils.listContainer.children;

        for (let appareil of appareilsElements) {
            appareil.addEventListener('click', (e) => {
                if(!(this.selectedAppareils.includes(appareil.outerText))) {
                    /** Le tag vient s'ajouter dans l'array des ingrédients sélectionnés **/
                    this.selectedAppareils.push(appareil.outerText);
                    /** Affichage des tags sélectionnés dans tagsContainer **/
                    const tagLi = document.createElement("li");
                    tagLi.classList.add("appareil-tag");
                    tagLi.innerHTML = e.target.innerHTML;
                    this.tagsContainer.appendChild(tagLi);

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                }
            });
        }

        let ustensiles = new FiltersFactory("ustensile", {button: this.ustensilsFiltersBtn, listContainer: this.ustensilesFiltersList, filters: this.ustensilesArray, tagsContainer: this.tagsContainer});
        ustensiles.displayList();
        
        let ustensilesElements = ustensiles.listContainer.children;

        for (let ustensile of ustensilesElements) {
            ustensile.addEventListener('click', (e) => {
                if(!(this.selectedUstensiles.includes(ustensile.outerText))) {
                    /** Le tag vient s'ajouter dans l'array des ingrédients sélectionnés **/
                    this.selectedUstensiles.push(ustensile.outerText);
                    /** Affichage des tags sélectionnés dans tagsContainer **/
                    const tagLi = document.createElement("li");
                    tagLi.classList.add("ustensile-tag");
                    tagLi.innerHTML = e.target.innerHTML;
                    this.tagsContainer.appendChild(tagLi);

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                }
            });
        }
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