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
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray
        this.className = "ingredient-element";

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
            //filterLi.style.display = "none"; //temporary (for tests)
            this.listContainer.appendChild(filterLi);
        }

    }
    


}


class AppareilsList {


    constructor(props) {

        this.button = props.button; //exemple : ingredientFiltersButton
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray
        this.className = "appareil-element";

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
            //filterLi.style.display = "none"; //temporary (for tests)
            this.listContainer.appendChild(filterLi);
        }

    }
    


}


class UstensilesList {


    constructor(props) {

        this.button = props.button; //exemple : ingredientFiltersButton
        this.listContainer = props.listContainer; //exemple : ingredientFiltersList
        this.filters = props.filters; //array retourné par une méthode de la classe filtersArray
        this.className = "ustensil-element";

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
            //filterLi.style.display = "none"; //temporary (for tests)
            this.listContainer.appendChild(filterLi);
        }

    }
    


}