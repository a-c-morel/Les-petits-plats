class FiltersArray{
    constructor(recipes){
        this.recipes = recipes;
        this.ingredients = [];
        this.appareils = [];
        this.ustensils = [];
    }
    getIngredients(){
        for (let i=0; i<this.recipes.length; i++){
            let ingredients = this.recipes[i].ingredients;
            ingredients.map(({ingredient}) => {
                this.ingredients.push(`${ingredient.toLowerCase()}`);
            });
        }
        const ingredientsNoRepeat = new Set(this.ingredients);
        this.ingredients = Array.from(ingredientsNoRepeat);
        return this.ingredients;
    }
    getAppareils(){
        for (let i=0; i<this.recipes.length; i++){
            let appareil = this.recipes[i].appliance;
            this.appareils.push(appareil);
        }
        const appareilsNoRepeat = new Set(this.appareils);
        this.appareils = Array.from(appareilsNoRepeat);
        return this.appareils;
    }
    getUstensils(){
        for (let i=0; i<this.recipes.length; i++){
            let ustensils = this.recipes[i].ustensils;
            this.ustensils.push(ustensils);
        }
        const allUstensilsJoined = this.ustensils.flat();
        const lowerCaseUstensils = allUstensilsJoined.map(x => x.toLowerCase());
        const ustensilsNoRepeat = new Set(lowerCaseUstensils);
        this.ustensils = Array.from(ustensilsNoRepeat);
        return this.ustensils;
    }
}