import {  Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{

    recipesChanged=new Subject<Recipe[]>();

    private recipes: Recipe[]=[];

    constructor(private store: Store<fromApp.AppState>){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredient:Ingredient[]){
        // this.slService.addIngredients(ingredient);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient));
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
