import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipesChanged=new Subject<Recipe[]>();

    private recipes: Recipe[]=[];

    // private recipes: Recipe[] = [
    //     new Recipe('Burger',
    //     'This is simply a test',
    //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //     [
    //         new Ingredient('Aaloo', 1),
    //         new Ingredient('Fries', 20),
    //         new Ingredient('Bun', 2)
    //     ]),

    //     new Recipe('Pizza', 
    //     'This is simply a test', 
    //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //     [
    //         new Ingredient('Bread',1),
    //         new Ingredient('Onion',1),
    //         new Ingredient('Cheese',2),
    //         new Ingredient('Mushroom',5)
    //     ])
    //   ];

    constructor(private slService:ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredient:Ingredient[]){
        this.slService.addIngredients(ingredient);
    }


    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] =newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }


    deleteRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(rec: Recipe[]){
        this.recipes= rec;
        this.recipesChanged.next(this.recipes.slice());
    }

}
