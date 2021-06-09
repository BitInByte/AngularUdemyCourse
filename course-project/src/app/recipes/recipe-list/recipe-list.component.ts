import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
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
}
