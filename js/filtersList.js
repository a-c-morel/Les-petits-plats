class FiltersFactory {


    constructor(type, props) {

        if(type === "ingredient") {
            return new IngredientsList(props);
        }
        if(type === "appareil") {
            return new AppareilsList(props);
        }
        if(type === "ustensile") {
            return new UstensilesList(props);
        }

    }


}



class IngredientsList {


    constructor(props) {

        this.button = props.button; //exemple : ingredientFiltersButton
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList (liste des ingrédients que l'utilisateur peut sélectionner)
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray (à partir des recettes, avec ou sans filtrage préalable)
        this.className = "ingredient-element";
        this.ingredientsTagsArray = []; //array des tags ingrédients sélectionnés par l'utilisateur
        this.tagsContainer = props.tagsContainer;

    }


    clear(containerToClear) {

        while (containerToClear.firstChild) {
            containerToClear.removeChild(containerToClear.firstChild);
        }

    }


    displayList() {

        this.clear(this.listContainer);
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', (e) => {
                this.displaySelectedTags(this.ingredientsTagsArray, filterLi, e);
            });
        }

    }


    displaySelectedTags(ingredientsTagsArray, selectedFilter, event) {

        if(!(ingredientsTagsArray.includes(selectedFilter.outerText))) {
            ingredientsTagsArray.push(selectedFilter.outerText);
            const tagLi = document.createElement("li");
            tagLi.classList.add("ingredient-tag");
            tagLi.innerHTML = event.target.innerHTML;
            this.tagsContainer.appendChild(tagLi);
        }

    }
    
    get tagsArray() {

        return this.ingredientsTagsArray;

    }


}



class AppareilsList {


    constructor(props) {

        this.button = props.button; //exemple : appareilFiltersButton
        this.listContainer = props.listContainer; //exemple : appareilsFiltersList (liste des appareils que l'utilisateur peut sélectionner)
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray (à partir des recettes, avec ou sans filtrage préalable)
        this.className = "appareil-element";
        this.appareilsTagsArray = []; //array des tags appareils sélectionnés par l'utilisateur
        this.tagsContainer = props.tagsContainer;

    }


    clear(containerToClear) {

        while (containerToClear.firstChild) {
            containerToClear.removeChild(containerToClear.firstChild);
        }

    }
    
    
    displayList() {

        this.clear(this.listContainer);
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', (e) => {
                this.displaySelectedTags(this.appareilsTagsArray, filterLi, e);
            });
        }

    }


    displaySelectedTags(appareilsTagsArray, selectedFilter, event) {

        if(!(appareilsTagsArray.includes(selectedFilter.outerText))) {
            appareilsTagsArray.push(selectedFilter.outerText);
            const tagLi = document.createElement("li");
            tagLi.classList.add("appareil-tag");
            tagLi.innerHTML = event.target.innerHTML;
            this.tagsContainer.appendChild(tagLi);
        }

    }


    get tagsArray() {

        return this.appareilsTagsArray;

    }
    

}



class UstensilesList {


    constructor(props) {

        this.button = props.button; //exemple : ustensileFiltersButton
        this.listContainer = props.listContainer; //exemple : ustensilesFiltersList (liste des ustensiles que l'utilisateur peut sélectionner)
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray (à partir des recettes, avec ou sans filtrage préalable)
        this.className = "ingredient-element";
        this.ustensilesTagsArray = []; //array des tags ustensiles sélectionnés par l'utilisateur
        this.tagsContainer = props.tagsContainer;

    }

    clear(containerToClear) {

        while (containerToClear.firstChild) {
            containerToClear.removeChild(containerToClear.firstChild);
        }

    }
    
    
    displayList() {

        this.clear(this.listContainer);
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', (e) => {
                this.displaySelectedTags(this.ustensilesTagsArray, filterLi, e);
            });
        }

    }


    displaySelectedTags(ustensilesTagsArray, selectedFilter, event) {

        if(!(ustensilesTagsArray.includes(selectedFilter.outerText))) {
            ustensilesTagsArray.push(selectedFilter.outerText);
            const tagLi = document.createElement("li");
            tagLi.classList.add("ustensil-tag");
            tagLi.innerHTML = event.target.innerHTML;
            this.tagsContainer.appendChild(tagLi);
        }

    }


    get tagsArray() {

        return this.ustensilesTagsArray;

    }
    

}