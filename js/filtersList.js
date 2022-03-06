class FiltersFactory {


    constructor(type, props) {

        if(type === "ingredient") {
            return new Ingredients(props);
        }
        if(type === "appareil") {
            return new Appareils(props);
        }
        if(type === "ustensile") {
            return new Ustensiles(props);
        }

    }


}



class Filters {


    constructor(props) {

        this.button = props.button; /**  exemple : ingredientFiltersButton **/
        this.listContainer = props.listContainer; /** exemple : ingredientFiltersList (liste des ingrédients que l'utilisateur peut sélectionner) **/
        this.filters = props.filters; /** array retourné par une méthode de la classe filtersArray (à partir des recettes, avec ou sans filtrage préalable) **/
        this.tagsContainer = props.tagsContainer;

    }


    clear(containerToClear) {

        while (containerToClear.firstChild) {
            containerToClear.removeChild(containerToClear.firstChild);
        }

    }


}



class Ingredients extends Filters {


    constructor(props) {

        super(props);
        this.selectedIngredients = []; /** array des tags ingrédients sélectionnés par l'utilisateur **/

    }


    displayList() {

        this.clear(this.listContainer);
        let alphabeticalSorted = this.filters.sort();
        for (let filter of alphabeticalSorted) {
            const filterLi = document.createElement("li");
            filterLi.classList.add("filter-element");
            filterLi.classList.add("ingredient-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi);
        }

    }


}



class Appareils extends Filters {


    constructor(props) {

        super(props);
        this.appareilsTagsArray = []; /** array des tags appareils sélectionnés par l'utilisateur **/

    }
    
    
    displayList() {

        this.clear(this.listContainer);
        let alphabeticalSorted = this.filters.sort();
        for (let filter of alphabeticalSorted) {
            const filterLi = document.createElement("li");
            filterLi.classList.add("filter-element");
            filterLi.classList.add("appareil-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi);
        }

    }
    

}



class Ustensiles extends Filters {


    constructor(props) {

        super(props);
        this.ustensilesTagsArray = []; /** array des tags ustensiles sélectionnés par l'utilisateur **/

    }
    
    
    displayList() {

        this.clear(this.listContainer);
        let alphabeticalSorted = this.filters.sort();
        for (let filter of alphabeticalSorted) {
            const filterLi = document.createElement("li");
            filterLi.classList.add("filter-element");
            filterLi.classList.add("ustensile-element");
            filterLi.classList.add("text-white");
            filterLi.classList.add("col-4");
            filterLi.innerHTML = `${filter}`;
            this.listContainer.appendChild(filterLi);
        }

    }
    

}