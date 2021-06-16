import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;
  // recipes: Recipe[] = [
  // new Recipe(
  // 'A Test Recipe',
  // 'This is simply a test',
  // 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  // ),
  // new Recipe(
  // 'Another Test Recipe',
  // 'This is simply a test',
  // 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  // ),
  // ];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Always listening to changes on our service
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    // Get a copy of our recipes from the service
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  // this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    // Here, we always use an array to specify the path
    // We also need to specify the second argument, the
    // route in order to be able to tell Angular what is
    // the route we're currently on
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
