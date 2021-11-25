class FiltersList {
    constructor(button, listContainer, filters, className) {
        this.button = button; //exemple : ingredientFiltersButton
        this.listContainer = listContainer; //exemple : ingredientFiltersList
        this.filters = filters;
        this.className = className;
    }

    display() {
        for (let filter of this.filters) {
            const filterLi = document.createElement("li");
            filterLi.classList.add(this.className);
            filterLi.innerHTML = `${filter}`;
            //filterLi.style.display = "none"; //temporary (for tests)
            this.listContainer.appendChild(filterLi);
        }
    }
}