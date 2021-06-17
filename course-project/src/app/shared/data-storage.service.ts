import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
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
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    // take allows us to specify that we want
    // to use a value from the subject once
    // (x) times and then we want to automatically
    // unsubscibe
    // return this.authService.user.pipe(
    // take(1),
    // // Take the value we want, unsubscribe to it and
    // // then override with the http observable
    // // Wait until the user observable completes
    // exhaustMap((user) => {
    // // exhaustMap will then return our http observable
    // // as soon as the user observable completes, replacing
    // // it
    // return this.http.get<Recipe[]>(this.url, {
    // params: new HttpParams().set('auth', user.token),
    // });
    // }),
    // // We can then chain the other http pipes
    // map((recipes) => {
    // return recipes.map((recipe) => {
    // return {
    // ...recipe,
    // ingredients: recipe.ingredients ? recipe.ingredients : [],
    // };
    // });
    // }),
    // tap((recipes) => {
    // this.recipeService.setRecipes(recipes);
    // })
    // );
    //
    // Since we are now using interceptor, we don't
    // need all that logic

    return this.http
      .get<Recipe[]>(this.url)

      .pipe(
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
    // console.log(recipes);
    // this.recipeService.setRecipes(recipes);
    // });
  }
}
