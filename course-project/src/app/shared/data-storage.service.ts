import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

// We could also implement this in the recipe service
// We need to add Injectable as soon as another
// service will be injected into this service
// providedIn will automatically inject it
// instead of specifying it into the providers
// array in the module
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly url =
    'https://ng-course-recipe-book-2eaa3-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  // storeRecipes(recipes: Recipe[]) {
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    // put overwrite all the data that is stored
    // under that endpoint
    // .json is firebase specific
    this.http
      .put(
        // 'https://ng-course-recipe-book-2eaa3-default-rtdb.firebaseio.com/recipes.json',
        this.url,
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // .subscribe((recipes) => {
    // // console.log(recipes);
    // this.recipeService.setRecipes(recipes);
    // });
  }
}
