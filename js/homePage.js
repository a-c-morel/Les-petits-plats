class HomePage {


    constructor(importedRecipes, mainElement, searchbar, searchbarError, plural, tagsContainer, ingredientsFiltersBtn, appareilsFiltersBtn, ustensilesFiltersBtn, ingredientsFiltersList, appareilsFiltersList, ustensilesFiltersList, ingredientsInput, appareilsInput, ustensilesInput) {

        this.importedRecipes = importedRecipes;
        this.mainElement = mainElement;
        this.searchbar = searchbar;
        this.searchbarError = searchbarError;
        this.plural = plural;
        this.tagsContainer = tagsContainer;
        this.tagsSelected = tagsContainer.children;
        this.ingredientsFiltersBtn = ingredientsFiltersBtn;
        this.appareilsFiltersBtn = appareilsFiltersBtn;
        this.ustensilesFiltersBtn = ustensilesFiltersBtn;
        this.ingredientsFiltersList = ingredientsFiltersList;
        this.appareilsFiltersList = appareilsFiltersList;
        this.ustensilesFiltersList = ustensilesFiltersList;
        this.ingredientsInput = ingredientsInput;
        this.appareilsInput = appareilsInput;
        this.ustensilesInput = ustensilesInput;
        
        this.recipesArray = [];
        this.filteredRecipesArray = [];
        this.ingredientsArray = [];
        this.appareilsArray = [];
        this.ustensilesArray = [];
        this.selectedIngredients = [];
        this.selectedAppareils = [];
        this.selectedUstensiles = [];
        this.searchedLetters = "";
        this.ingredientSearched = "";
        this.appareilSearched = "";
        this.ustensileSearched = "";
        
        this.searchbar.addEventListener('keyup', (e) => {
            this.searchedLetters = this.formatting(e.target.value.toLowerCase()); /** je convertis l'entrée utilisateur en minuscules, et je stocke cette donnée **/
            let myRecipesArray = this.filtrer(this.recipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles); /** ça return soit l'array filtré, soit l'array de 50 recettes **/
            this.displayCards(myRecipesArray);
            this.displayFilters(myRecipesArray);
            if(myRecipesArray.length === 0) {
                this.showErrorMessage(this.searchbarError);
            }else{
                this.hideErrorMessage(this.searchbarError);
            }
        });

        this.ingredientsInput.addEventListener('keyup', (e) => {
            this.ingredientSearched = this.formatting(e.target.value.toLowerCase());
            this.ingredientsLi = this.ingredientsFiltersList.children;
            for (let ingredient of this.ingredientsLi) {
                if (!(this.formatting(ingredient.innerText).includes(this.ingredientSearched))) {
                    ingredient.style.display = "none";
                } else {
                    ingredient.style.display = "flex";
                }
            }
        });


        this.appareilsInput.addEventListener('keyup', (e) => {
            this.appareilSearched = this.formatting(e.target.value.toLowerCase());
            this.appareilsLi = this.appareilsFiltersList.children;
            for (let appareil of this.appareilsLi) {
                if (!(this.formatting(appareil.innerText).includes(this.appareilSearched))) {
                    appareil.style.display = "none";
                } else {
                    appareil.style.display = "flex";
                }
            }
        });

        
        this.ustensilesInput.addEventListener('keyup', (e) => {
            this.ustensileSearched = this.formatting(e.target.value.toLowerCase());
            this.ustensilesLi = this.ustensilesFiltersList.children;
            for (let ustensile of this.ustensilesLi) {
                if (!(this.formatting(ustensile.innerText).includes(this.ustensileSearched))) {
                    ustensile.style.display = "none";
                } else {
                    ustensile.style.display = "flex";
                }
            }
        });


    }


    filtrer(myRecipesArray, searchedLetters, selectedIngredients, selectedAppareils, selectedUstensiles) {
        /*VERSION 1*/ //aller sur la branche "v2" afin de voir la version 2
        let filteredBySearchbar = []; /** va contenir les recettes qui ont passé le filtre 1 **/
        
        if(searchedLetters.length > 2) {
            
            for (let i=0; i<myRecipesArray.length; i++){
                let recipe = myRecipesArray[i];
                let recipeTitle = this.formatting(recipe.name);
                let ingredients = recipe.ingredients;
                let recipeIngredients = [];
                ingredients.map(({ingredient}) => {
                    recipeIngredients.push(`${this.formatting(ingredient.toLowerCase())}`);
                });
                let recipeDescription = this.formatting(recipe.description);
                if((recipeTitle.toLowerCase().includes(searchedLetters))||(recipeIngredients.toString().toLowerCase().includes(searchedLetters)) || (recipeDescription.toLowerCase().includes(searchedLetters))) {
                    filteredBySearchbar.push(recipe);
                }       
            }

            let filteredByIngredients = []; /** va contenir les recettes qui ont passé le filtre 2 **/

            for (let recipe of filteredBySearchbar) {
                let recipeIngredients = recipe.ingredients;
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${this.formatting(ingredient.toLowerCase())}`);
                });

                if(selectedIngredients.every(tag => recipeIngredientsArray.includes(this.formatting(tag)))){
                    filteredByIngredients.push(recipe);
                }
            }
            
            let filteredByAppareils = []; /** va contenir les recettes qui ont passé le filtre 3 **/

            for (let recipe of filteredByIngredients){
                let recipeAppareil = recipe.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${this.formatting(recipeAppareil.toLowerCase())}`);
                if(selectedAppareils.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredByAppareils.push(recipe);
                }
            }

            let filteredByUstensiles = []; /** va contenir les recettes qui ont passé le filtre 4 **/

            for (let recipe of filteredByAppareils) {
                let recipeUstensiles = recipe.ustensils; //un array contenant des strings
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${this.formatting(recipeUstensile.toLowerCase())}`);
                }
                if(selectedUstensiles.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredByUstensiles.push(recipe);
                }
            }

            return filteredByUstensiles;

        } else if (selectedIngredients.length > 0 || selectedAppareils.length > 0 || selectedUstensiles.length > 0 ) {

            let filteredByIngredients = [];

            for (let recipe of myRecipesArray) {
                let recipeIngredients = recipe.ingredients;
                let recipeIngredientsArray = [];
                recipeIngredients.map(({ingredient}) => {
                    recipeIngredientsArray.push(`${this.formatting(ingredient.toLowerCase())}`);
                });

                if(selectedIngredients.every(tag => recipeIngredientsArray.includes(this.formatting(tag)))){
                    filteredByIngredients.push(recipe);
                }
            }
            
            let filteredByAppareils = [];

            for (let recipe of filteredByIngredients){
                let recipeAppareil = recipe.appliance;
                let recipeAppareilsArray = [];
                recipeAppareilsArray.push(`${this.formatting(recipeAppareil.toLowerCase())}`);
                if(selectedAppareils.every(tag => recipeAppareilsArray.includes(tag))){
                    filteredByAppareils.push(recipe);
                }
            }

            let filteredByUstensiles = [];

            for (let recipe of filteredByAppareils) {
                let recipeUstensiles = recipe.ustensils;
                let recipeUstensilesArray = [];
                for (let recipeUstensile of recipeUstensiles){
                    recipeUstensilesArray.push(`${this.formatting(recipeUstensile.toLowerCase())}`);
                }
                if(selectedUstensiles.every(tag => recipeUstensilesArray.includes(tag))){
                    filteredByUstensiles.push(recipe);
                }
            }
            
            return filteredByUstensiles;

        } else {

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
        let ingredients = new FiltersFactory("ingredient", {button: this.ingredientsFiltersBtn, listContainer: this.ingredientsFiltersList, filters: this.ingredientsArray, tagsContainer: this.tagsContainer});
        ingredients.displayList();

        let ingredientsElements = ingredients.listContainer.children;

        for (let ingredient of ingredientsElements) {
            ingredient.addEventListener('click', (e) => {
                if(!(this.selectedIngredients.includes(ingredient.outerText))) {
                    /** Le tag vient s'ajouter dans l'array des ingrédients sélectionnés **/
                    this.selectedIngredients.push(this.formatting(ingredient.outerText));
                    /** Affichage des tags sélectionnés dans tagsContainer **/
                    const tagLi = document.createElement("li");
                    tagLi.classList.add("ingredient-tag");
                    tagLi.classList.add("d-flex");
                    tagLi.classList.add("justify-content-between");
                    tagLi.classList.add("gap-3");
                    const tagText = document.createElement("span");
                    tagText.innerHTML = e.target.innerHTML;
                    const closeIcon = document.createElement("i");
                    closeIcon.classList.add("bi");
                    closeIcon.classList.add("bi-x-circle");
                    
                    this.tagsContainer.appendChild(tagLi);
                    tagLi.appendChild(tagText);
                    tagLi.appendChild(closeIcon);

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                    this.recipesArray = myNewRecipesArray;
                }
                for (let tagSelected of this.tagsSelected) {
                    let closeButton = tagSelected.children.item(1);
                    closeButton.addEventListener('click', () => {
                        tagSelected.classList.remove("ingredient-tag"); //test
                        tagSelected.classList.remove("d-flex"); //test
                        tagSelected.classList.remove("justify-content-between"); //test
                        tagSelected.classList.remove("gap-3"); //test
                        tagSelected.style.display = "none"; //test
                        let tagIndex = this.selectedIngredients.indexOf(this.formatting(this.formatting(tagSelected.innerText)));
                        this.selectedIngredients.splice(tagIndex, 1);
                        let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                        this.displayCards(myNewRecipesArray);
                        this.displayFilters(myNewRecipesArray);
                        this.recipesArray = myNewRecipesArray;
                    });
                };
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
                    tagLi.classList.add("d-flex");
                    tagLi.classList.add("justify-content-between");
                    tagLi.classList.add("gap-3");
                    const tagText = document.createElement("span");
                    tagText.innerHTML = e.target.innerHTML;
                    const closeIcon = document.createElement("i");
                    closeIcon.classList.add("bi");
                    closeIcon.classList.add("bi-x-circle");
                    
                    this.tagsContainer.appendChild(tagLi);
                    tagLi.appendChild(tagText);
                    tagLi.appendChild(closeIcon);

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                    this.recipesArray = myNewRecipesArray;
                }
                for (let tagSelected of this.tagsSelected) {
                    let closeButton = tagSelected.children.item(1);
                    closeButton.addEventListener('click', () => {
                        tagSelected.classList.remove("appareil-tag"); //test
                        tagSelected.classList.remove("d-flex"); //test
                        tagSelected.classList.remove("justify-content-between"); //test
                        tagSelected.classList.remove("gap-3"); //test
                        tagSelected.style.display = "none"; //test
                        let tagIndex = this.selectedIngredients.indexOf(this.formatting(tagSelected.innerText));
                        this.selectedAppareils.splice(tagIndex, 1);
                        let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                        this.displayCards(myNewRecipesArray);
                        this.displayFilters(myNewRecipesArray);
                        this.recipesArray = myNewRecipesArray;
                    });
                };
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
                    tagLi.classList.add("d-flex");
                    tagLi.classList.add("justify-content-between");
                    tagLi.classList.add("gap-3");
                    const tagText = document.createElement("span");
                    tagText.innerHTML = e.target.innerHTML;
                    const closeIcon = document.createElement("i");
                    closeIcon.classList.add("bi");
                    closeIcon.classList.add("bi-x-circle");
                    
                    this.tagsContainer.appendChild(tagLi);
                    tagLi.appendChild(tagText);
                    tagLi.appendChild(closeIcon);

                    let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                    this.displayCards(myNewRecipesArray);
                    this.displayFilters(myNewRecipesArray);
                    this.recipesArray = myNewRecipesArray;
                }
                for (let tagSelected of this.tagsSelected) {
                    let closeButton = tagSelected.children.item(1);
                    closeButton.addEventListener('click', () => {
                        tagSelected.classList.remove("ustensile-tag"); //test
                        tagSelected.classList.remove("d-flex"); //test
                        tagSelected.classList.remove("justify-content-between"); //test
                        tagSelected.classList.remove("gap-3"); //test
                        tagSelected.style.display = "none"; //test
                        let tagIndex = this.selectedUstensiles.indexOf(tagSelected.innerText);
                        this.selectedUstensiles.splice(tagIndex, 1);
                        let myNewRecipesArray = this.filtrer(myRecipesArray, this.searchedLetters, this.selectedIngredients, this.selectedAppareils, this.selectedUstensiles);
                        this.displayCards(myNewRecipesArray);
                        this.displayFilters(myNewRecipesArray);
                        this.recipesArray = myNewRecipesArray;
                    });
                };
            });
        }
    }


    showErrorMessage(searchbarError) {

        searchbarError.classList.add("show-error-msg");
        searchbarError.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."

    }


    hideErrorMessage(searchbarError) {

        searchbarError.classList.remove("show-error-msg");
        searchbarError.innerHTML = "";
        
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

    formatting(userString) {
        return userString.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    /*singularize(word) {
        let pluralToRemove = word.indexOf(this.plural); //="s "
        if(pluralToRemove>-1 && word.length>3){
            console.log(word, pluralToRemove);
            //return word.splice(pluralToRemove, 1);
        }
    }*/


}