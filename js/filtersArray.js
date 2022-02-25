class FiltersArray{
    constructor(recipes){
        this.recipes = recipes;
        this.ingredients = [];
        this.appareils = [];
        this.ustensiles = [];
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
            this.appareils.push(`${appareil.toLowerCase()}`);
        }
        const appareilsNoRepeat = new Set(this.appareils);
        this.appareils = Array.from(appareilsNoRepeat);
        return this.appareils;
    }
    getUstensiles(){
        for (let i=0; i<this.recipes.length; i++){
            let ustensiles = this.recipes[i].ustensils;
            this.ustensiles.push(ustensiles);
        }
        const allUstensilesJoined = this.ustensiles.flat();
        const lowerCaseUstensiles = allUstensilesJoined.map(x => x.toLowerCase());
        const ustensilesNoRepeat = new Set(lowerCaseUstensiles);
        this.ustensiles = Array.from(ustensilesNoRepeat);
        return this.ustensiles;
    }
}