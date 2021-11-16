class FiltersList {
    constructor(button, listContainer, filters) {
        this.button = button; //exemple : ingredientFiltersButton
        this.listContainer = listContainer; //exemple : ingredientFiltersList
        this.filters = filters;
    }

    display() {
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.innerHTML = `${filter}`;
            filterLi.style.display = "none";
            this.listContainer.appendChild(filterLi);
        }
        
    }
}