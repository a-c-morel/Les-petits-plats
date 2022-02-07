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
        //this.ingredientsTags = props.ingredientsTags;

    }


//créer méthode qui regarde s'il y a du contenu et qui le clear


    display() {

        while (this.listContainer.firstChild) {
            this.listContainer.removeChild(this.listContainer.firstChild);
        }
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', (e) => {
                if(!(this.ingredientsTagsArray.includes(filterLi.outerText))) {
                    this.ingredientsTagsArray.push(filterLi.outerText);
                    (console.log(this.ingredientsTagsArray));
                    //this.displayTags();
                    const tagLi = document.createElement("li");
                    tagLi.classList.add("ingredient-tag");
                    tagLi.innerHTML = e.target.innerHTML;
                    this.tagsContainer.appendChild(tagLi);
                }
            });
        }

    }

    
    get tagsArray() {

        return this.ingredientsTagsArray;

    }


}



class AppareilsList {


    constructor(props) {

        this.button = props.button; //exemple : ingredientFiltersButton
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray
        this.className = "appareil-element";
        this.appareilsTagsArray = [];

    }


//créer méthode qui regarde s'il y a du contenu et qui le clear
    display() {

        while (this.listContainer.firstChild) {
            this.listContainer.removeChild(this.listContainer.firstChild);
        }
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', () => {
                if(!(this.appareilsTagsArray.includes(filterLi.outerText))) {
                    this.appareilsTagsArray.push(filterLi.outerText);
                    (console.log(this.appareilsTagsArray));
                }
            });
        }

    }
    

}



class UstensilesList {


    constructor(props) {

        this.button = props.button; //exemple : ingredientFiltersButton
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray
        this.className = "ustensil-element";
        this.ustensilesTagsArray = [];

    }


//créer méthode qui regarde s'il y a du contenu et qui le clear
    display() {

        while (this.listContainer.firstChild) {
            this.listContainer.removeChild(this.listContainer.firstChild);
        }
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.classList.add("filter-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi).addEventListener('click', () => {
                if(!(this.ustensilesTagsArray.includes(filterLi.outerText))) {
                    this.ustensilesTagsArray.push(filterLi.outerText);
                    (console.log(this.ustensilesTagsArray));
                }
            });
        }

    }
    

}